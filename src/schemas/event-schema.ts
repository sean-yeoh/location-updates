import z from 'zod'

export const EventSchema = z.object({
  event: z.object({
    name: z.string(),
    time: z.iso.datetime(),
  }),
  data: z.object({
    driver_id: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.iso.datetime(),
  }),
})

export type Event = z.infer<typeof EventSchema>
