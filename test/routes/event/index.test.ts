import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import Fastify from 'fastify'
import eventRoute from '../../../src/routes/event/index'
import { locationService } from '../../../src/services/location-service'
import { locationModel } from '../../../src/models/location-model'
import type { Location } from '../../../src/models/location-model'

describe('POST /event', () => {
  const validPayload = {
    event: {
      name: 'driver_location',
      time: faker.date.recent().toISOString(),
    },
    data: {
      driver_id: faker.string.uuid(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    },
  }

  it('should return 200 with valid data', async (t) => {
    const app = Fastify()
    await app.register(eventRoute, { prefix: '/event' })

    const res = await app.inject({
      method: 'POST',
      url: '/event',
      payload: validPayload,
    })

    assert.equal(res.statusCode, 200)
    await app.close()
  })

  it('should call locationModel.addLocation and locationService.publish with valid data', async (t) => {
    const app = Fastify()
    await app.register(eventRoute, { prefix: '/event' })

    const initialLocationCount = locationModel.locations.length

    let publishedLocation: Location | null = null
    const listener = (location: Location) => {
      publishedLocation = location
    }
    locationService.connect(validPayload.data.driver_id, listener)

    const res = await app.inject({
      method: 'POST',
      url: '/event',
      payload: validPayload,
    })

    assert.equal(res.statusCode, 200)
    assert.equal(locationModel.locations.length, initialLocationCount + 1)
    assert.deepStrictEqual(locationModel.locations[0], validPayload.data)
    assert.deepStrictEqual(publishedLocation, validPayload.data)

    // Cleanup
    locationService.disconnect(validPayload.data.driver_id, listener)
    await app.close()
  })

  it('should return 400 with error details for invalid data', async (t) => {
    const app = Fastify()
    await app.register(eventRoute, { prefix: '/event' })

    const invalidPayload = {
      random: 'data',
    }

    const res = await app.inject({
      method: 'POST',
      url: '/event',
      payload: invalidPayload,
    })

    assert.equal(res.statusCode, 400)
    const body = JSON.parse(res.payload)
    assert.equal(body.error, 'Invalid request body')
    assert.ok(Array.isArray(body.details))
    assert.ok(body.details.length > 0)
    await app.close()
  })
})
