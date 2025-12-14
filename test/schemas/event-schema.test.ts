import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import { EventSchema } from '../../src/schemas/event-schema'

const event = {
  name: 'driver_location',
  time: faker.date.recent().toISOString(),
}

const data = {
  driver_id: faker.string.uuid(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  timestamp: faker.date.recent().toISOString(),
}

const validData = {
  event,
  data,
}

describe('EventSchema', () => {
  it('should pass when payload is valid', () => {
    const result = EventSchema.safeParse(validData)
    assert.ok(result.success)
  })

  it('should fail when event.name is undefined', () => {
    const invalidData = {
      event: {
        time: event.time,
      },
      data,
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('name')),
      )
    }
  })

  it('should fail when event.time is undefined', () => {
    const invalidData = {
      event: {
        name: event.name,
      },
      data,
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('time')),
      )
    }
  })

  it('should fail when event.time is invalid', () => {
    const invalidData = {
      event: {
        name: event.name,
        time: 'invalid time',
      },
      data,
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('time')),
      )
    }
  })

  it('should fail when data.driver_id is undefined', () => {
    const invalidData = {
      event,
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('driver_id')),
      )
    }
  })

  it('should fail when data.driver_id is invalid', () => {
    const invalidData = {
      event,
      data: {
        driver_id: faker.number.bigInt(),
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('driver_id')),
      )
    }
  })

  it('should fail when data.latitude is undefined', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        longitude: data.longitude,
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('latitude')),
      )
    }
  })

  it('should fail when data.latitude is invalid', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        latitude: 'invalid latitude',
        longitude: data.longitude,
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('latitude')),
      )
    }
  })

  it('should fail when data.longitude is undefined', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        latitude: data.latitude,
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('longitude')),
      )
    }
  })

  it('should fail when data.longitude is invalid', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        latitude: data.latitude,
        longitude: 'invalid longitude',
        timestamp: data.timestamp,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('longitude')),
      )
    }
  })

  it('should fail when data.timestamp is undefined', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('timestamp')),
      )
    }
  })

  it('should fail when data.timestamp is invalid', () => {
    const invalidData = {
      event,
      data: {
        driver_id: data.driver_id,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: 'invalid timestamp',
      },
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('timestamp')),
      )
    }
  })

  it('should fail when event is undefined', () => {
    const invalidData = {
      data,
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('event')),
      )
    }
  })

  it('should fail when data is undefined', () => {
    const invalidData = {
      event,
    }

    const result = EventSchema.safeParse(invalidData)
    assert.ok(!result.success)
    if (!result.success) {
      assert.ok(
        result.error.issues.some((issue) => issue.path.includes('data')),
      )
    }
  })
})
