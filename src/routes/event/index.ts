import { FastifyPluginAsync } from 'fastify'
import { EventSchema } from '../../schemas/event-schema'

const event: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    const data = request.body

    const result = EventSchema.safeParse(data)

    if (result.success) {
      return reply.status(200).send()
    }

    return reply.status(400).send({
      error: 'Invalid request body',
      details: result.error.issues,
    })
  })
}

export default event
