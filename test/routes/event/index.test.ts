import { test } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import Fastify from 'fastify'
import eventRoute from '../../../src/routes/event/index'

test('POST /event returns 200 with valid data', async () => {
  const app = Fastify()
  await app.register(eventRoute, { prefix: '/event' })

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

  const res = await app.inject({
    method: 'POST',
    url: '/event',
    payload: validPayload,
  })

  assert.equal(res.statusCode, 200)
  await app.close()
})

test('POST /event returns 400 with error details for invalid data', async () => {
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
