import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/database";
import { Buffer } from "buffer";
import { writeFile } from "fs/promises";
import ServiceCardModel from "../../../../lib/models/ServiceCardModel";
import BlogPostModel from "../../../../lib/models/BlogPostModel";
const fs = require("fs");

export async function GET(request) {
  await ConnectDB();
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const service = await ServiceCardModel.findById(id);
    return NextResponse.json({ service });
  } else {
    const services = await ServiceCardModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ services });
  }
}

export async function POST(request) {
  await ConnectDB();
  const formData = await request.formData();

  const timeStamp = Date.now();
  const serviceImage = formData.get("serviceImage");
  const serviceImageByteData = await serviceImage.arrayBuffer();
  const buffer = Buffer.from(serviceImageByteData);
  const path = `./public/${timeStamp}_${serviceImage.name}`;
  await writeFile(path, buffer);
  const serviceImageUrl = `/${timeStamp}_${serviceImage.name}`;

  const serviceData = {
    title: formData.get("title"),
    serviceCategory: formData.get("serviceCategory"),
    serviceImage: serviceImageUrl,
    developer: formData.get("serviceDeveloper"),
    servicePrice: Number(formData.get("servicePrice")), // Convert to number
    serviceDescription: formData.get("serviceDescription"),
  };

  await ServiceCardModel.create(serviceData);
  return NextResponse.json({ success: true, msg: "Service added" });
}

export async function DELETE(request) {
  await ConnectDB();
  const id = await request.nextUrl.searchParams.get("id");
  const service = await ServiceCardModel.findById(id);

  if (!service) {
    return NextResponse.json({ success: false, msg: "Service not found" });
  }

  try {
    fs.unlinkSync(`/public/${service.serviceImage}`);
  } catch (err) {
    console.error("Error deleting file:", err);
  }

  await ServiceCardModel.findByIdAndDelete(id); // Use id here

  return NextResponse.json({ success: true, msg: "Service Deleted" });
}

