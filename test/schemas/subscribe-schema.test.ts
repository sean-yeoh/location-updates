import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import { SubscribeSchema } from '../../src/schemas/subscribe-schema'

const validData = {
  driver_id: faker.string.uuid(),
  since: faker.date.recent().toISOString(),
}

describe('SubscribeSchema', () => {
  it('should pass when payload is valid', () => {
    const result = SubscribeSchema.safeParse(validData)
    assert.ok(result.success)
  })

  it('should fail when driver_id is undefined', () => {
    const invalidData = {
      since: validData.since,
    }

    const result = SubscribeSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('driver_id')),
      )
    }
  })

  it('should fail when driver_id is invalid', () => {
    const invalidData = {
      driver_id: faker.number.bigInt(),
      since: validData.since,
    }

    const result = SubscribeSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('driver_id')),
      )
    }
  })

  it('should fail when since is undefined', () => {
    const invalidData = {
      driver_id: validData.driver_id,
    }

    const result = SubscribeSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('since')),
      )
    }
  })

  it('should fail when since is invalid', () => {
    const invalidData = {
      driver_id: validData.driver_id,
      since: 'invalid since',
    }

    const result = SubscribeSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('since')),
      )
    }
  })
})
