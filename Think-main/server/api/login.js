import { loginUser } from "../controllers/userController.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await loginUser(req, res);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
