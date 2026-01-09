export default async function handler(req: any, res: any) {
  const q = (req.query?.q || "").toString().trim();
  if (!q) return res.status(400).json({ error: "Missing query param ?q=" });

  const token = process.env.LOMADEE_APP_TOKEN;
  if (!token) return res.status(500).json({ error: "LOMADEE_APP_TOKEN not set" });

  const url =
    `https://api.lomadee.com/v3/${token}/offer/_search` +
    `?sourceId=35886738&keyword=${encodeURIComponent(q)}&size=10`;

  try {
    const r = await fetch(url, { headers: { "accept": "application/json" } });
    const text = await r.text(); // helps debug non-JSON responses
    res.status(r.status).setHeader("content-type", "application/json");
    return res.send(text);
  } catch (e: any) {
    return res.status(500).json({
      error: "Fetch failed",
      message: e?.message || String(e),
    });
  }
}
