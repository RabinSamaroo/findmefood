import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Place } from "~/types/Place";

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

      const nearbySearchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${API_KEY}&opennow=${opennow ? "true" : undefined}`;

      try {
        const response = await axios.get(nearbySearchURL);
        const restaurants = response.data.results;
        const placeDetailsRequests = restaurants.map((e: any) => {
          const placeDetailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${e.place_id}&key=${API_KEY}`;
          return axios.get(placeDetailsURL);
        });
        const placeDetailsResponse = await Promise.all(placeDetailsRequests);
        const placeDetails: Place[] = placeDetailsResponse.map(
          (e) => e.data.result,
        );
        return placeDetails;
      } catch (error) {
        console.log(error);
        return;
      }
    }),
});
