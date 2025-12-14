import { FastifyPluginAsync } from 'fastify'
import { SubscribeSchema } from '../../schemas/subscribe-schema'
import { locationService } from '../../services/location-service'
import { locationModel, type Location } from '../../models/location-model'

const subscribe: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get(
    '/',
    // Ensure headers contains "Accept: text/event-stream" if not reply.sse will be undefined
    // https://github.com/fastify/sse/blob/0cb4ee6dfa1a9a46b68e54025e9b1dcce9ca6287/index.js#L411-L414
    {
      sse: true,
      schema: {
        headers: {
          type: 'object',
          properties: {
            accept: { type: 'string', pattern: 'text/event-stream' },
          },
          required: ['accept'],
        },
      },
      preHandler: async (request, reply) => {
        const { driver_id, since } = request.query as {
          driver_id?: string
          since?: string
        }
        const result = SubscribeSchema.safeParse({ driver_id, since })
        if (!result.success) {
          return reply.status(400).send({
            error: 'Invalid request body',
            details: result.error.issues,
          })
        }
      },
    },
    async function (request, reply) {
      const locationHandler = (location: Location) => {
        reply.sse.send({ data: location })
      }

      const { driver_id, since } = request.query as {
        driver_id: string
        since: string
      }

      await reply.sse.send({ data: { connected: true } })

      const locationsSince = locationModel.getLocationsSinceByDriver(
        driver_id,
        since,
      )

      for (const location of locationsSince) {
        await reply.sse.send({ data: location })
      }

      locationService.connect(driver_id, locationHandler)

      reply.sse.onClose(() => {
        locationService.disconnect(driver_id, locationHandler)
      })

      reply.sse.keepAlive()
    },
  )
}

export default subscribe
