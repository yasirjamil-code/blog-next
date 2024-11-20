import { NextResponse } from "next/server";
import { ConnectDB } from "../../../../lib/config/database";

import EmailModel from "../../../../lib/models/EmailModel";

export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
}

export async function POST(request) {
  await ConnectDB();

  try {
    const formData = await request.formData();
    const email = {
      email: formData.get("email"),
    };
    await EmailModel.create(email);
    return NextResponse.json({ success: true, msg: "Email Subcribed" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, mag: "Email Delted" });
}
