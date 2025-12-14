import z from 'zod'

export const SubscribeSchema = z.object({
  driver_id: z.string(),
  since: z.iso.datetime(),
})

export type Subscribe = z.infer<typeof SubscribeSchema>
