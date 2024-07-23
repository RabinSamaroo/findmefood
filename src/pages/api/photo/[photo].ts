import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Store your API key in .env.local

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { photo, maxwidth, maxheight } = req.query;

  if (!photo) {
    return res.status(400).json({ error: "Photo reference is required" });
  }

  let url = `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${photo}&maxwidth=${maxwidth ?? 1000}&key=${API_KEY}`;

  if (maxheight) {
    url += `&maxheight=${maxheight}`;
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data, "binary");

    res.setHeader("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
