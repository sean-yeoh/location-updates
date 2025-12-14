import fp from 'fastify-plugin'
import fastifySSE from '@fastify/sse'

export default fp(async (fastify) => {
  await fastify.register(fastifySSE)
})
