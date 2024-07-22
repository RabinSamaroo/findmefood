import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import axios from "axios";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Store your API key in .env.local

export const restoRouter = createTRPCRouter({
  getNearbyRestos: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
        radius: z.number(),
        opennow: z.boolean().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { lat, lng, radius, opennow } = input;

      if (!lat || !lng || !radius) {
        return { error: "Missing required parameters" };
      }

      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${API_KEY}`;

      if (opennow) {
        url += `&opennow=true`;
      }

      try {
        const response = await axios.get(url);
        const restaurants = response.data.results;
        return restaurants;
      } catch (error) {
        return { error: "Error with Google Maps API" };
      }
    }),
});
