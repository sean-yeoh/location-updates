import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import Fastify from 'fastify'
import fastifySSE from '@fastify/sse'
import subscribeRoute from '../../../src/routes/subscribe/index'

describe('GET /subscribe', () => {
  const validPayload = {
    driver_id: 'driver_001',
    since: new Date('2025-12-10T00:00:00.000Z').toISOString(),
  }

  it('should stream events with valid data and headers', async () => {
    const app = Fastify()

    await app.register(fastifySSE)
    await app.register(subscribeRoute, { prefix: '/subscribe' })

    await app.listen({ port: 0 })
    const { port } = app.server.address() as { port: number }
    const query = new URLSearchParams(validPayload).toString()

    const url = `http://localhost:${port}/subscribe?${query}`

    const controller = new AbortController()

    const response = await fetch(url, {
      headers: { accept: 'text/event-stream' },
      signal: controller.signal,
    })

    assert.equal(response.status, 200)
    assert.equal(response.headers.get('content-type'), 'text/event-stream')

    const reader = response.body!.getReader()
    const decoder = new TextDecoder()

    const { value } = await reader.read()
    const chunk = decoder.decode(value)
    assert.ok(chunk.includes('data:'))

    // Cleanup
    controller.abort()
    await app.close()
  })

  it('should return 400 when payload is not valid', async () => {
    const app = Fastify()
    await app.register(fastifySSE)
    await app.register(subscribeRoute, { prefix: '/subscribe' })

    const query = new URLSearchParams({
      ...validPayload,
      since: 'invalid-date',
    }).toString()

    const res = await app.inject({
      method: 'GET',
      url: `/subscribe?${query}`,
      headers: {
        accept: 'text/event-stream',
      },
    })

    assert.equal(res.statusCode, 400)
    const body = JSON.parse(res.payload)
    assert.equal(body.error, 'Invalid request body')
    assert.ok(Array.isArray(body.details))
    assert.ok(body.details.length > 0)
    await app.close()
  })

  it('should return 400 when Accept header is not text/event-stream', async () => {
    const app = Fastify()
    await app.register(fastifySSE)
    await app.register(subscribeRoute, { prefix: '/subscribe' })

    const query = new URLSearchParams(validPayload).toString()

    const res = await app.inject({
      method: 'GET',
      url: `/subscribe?${query}`,
      headers: {
        accept: 'application/json',
      },
    })

    assert.equal(res.statusCode, 400)
    await app.close()
  })
})
