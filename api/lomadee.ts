import type { VercelRequest, VercelResponse } from "vercel";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: "Missing query param ?q=" });
  }

  const token = process.env.LOMADEE_APP_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "LOMADEE_APP_TOKEN not set" });
  }

  const url =
  `https://api.lomadee.com/v3/${token}/product/search` +
  `?keyword=${encodeURIComponent(query)}` +
  `&sourceId=35886738` +
  `&size=10`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to reach Lomadee", details: err });
  }
}
