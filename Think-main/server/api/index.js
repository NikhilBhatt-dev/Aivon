

export default function handler(req, res) {
  res.status(200).json({
    message: "Welcome to your Vercel API! All endpoints are working.",
    endpoints: [
      { path: "/api/login", method: "POST" },
      { path: "/api/register", method: "POST" },
      { path: "/api/data", method: "GET" },
      { path: "/api/published-images", method: "GET" },
    ],
  });
}
