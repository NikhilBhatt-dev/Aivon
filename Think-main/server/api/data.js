import { getUser } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await protect(req, res, async () => {
      await getUser(req, res);
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
