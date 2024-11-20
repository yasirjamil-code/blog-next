import bcrypt from "bcryptjs";
import { ConnectDB } from "../../../../../lib/config/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const db = await ConnectDB();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    await db.collection("users").insertOne({ email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  }
}
