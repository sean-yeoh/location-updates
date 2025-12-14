import { FastifyPluginAsync } from 'fastify'
import { EventSchema } from '../../schemas/event-schema'
import { locationService } from '../../services/location-service'
import { locationModel } from '../../models/location-model'

const event: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    const data = request.body

    const result = EventSchema.safeParse(data)

    if (!result.success) {
      return reply.status(400).send({
        error: 'Invalid request body',
        details: result.error.issues,
      })
    }

    const { data: locationData } = result.data

    locationModel.addLocation(locationData)
    locationService.publish(locationData.driver_id, locationData)

    return reply.status(200).send({ success: true })
  })
}

export default event
