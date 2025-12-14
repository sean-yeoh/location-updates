import { test, describe, it } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import { locationService } from '../../src/services/location-service'
import type { Location } from '../../src/models/location-model'

describe('LocationService', () => {
  describe('connect', () => {
    it('should register a listener for a driver', () => {
      const driver_id = faker.string.uuid()

      let callCount = 0
      const listener = () => {
        callCount++
      }

      locationService.connect(driver_id, listener)
      locationService.publish(driver_id, {
        driver_id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      })

      assert.strictEqual(callCount, 1)

      // Cleanup
      locationService.disconnect(driver_id, listener)
    })
  })

  describe('disconnect', () => {
    it('should remove a listener for a driver', () => {
      const driver_id = faker.string.uuid()

      let callCount = 0
      const listener = () => {
        callCount++
      }

      locationService.connect(driver_id, listener)
      locationService.disconnect(driver_id, listener)

      locationService.publish(driver_id, {
        driver_id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      })

      assert.strictEqual(callCount, 0)
    })

    it('should not error when disconnecting a non-existent listener', () => {
      const driver_id = faker.string.uuid()
      const listener = () => {}

      assert.doesNotThrow(() => {
        locationService.disconnect(driver_id, listener)
      })
    })
  })

  describe('publish', () => {
    it('should emit location to registered listeners', () => {
      const driver_id = faker.string.uuid()
      const location = {
        driver_id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      }

      let receivedLocation: Location | null = null
      const listener = (location: Location) => {
        receivedLocation = location
      }

      locationService.connect(driver_id, listener)
      locationService.publish(driver_id, location)

      assert.deepStrictEqual(receivedLocation, location)

      // Cleanup
      locationService.disconnect(driver_id, listener)
    })

    it('should not error when no listeners are registered', () => {
      const driver_id = faker.string.uuid()
      const location = {
        driver_id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      }

      assert.doesNotThrow(() => {
        locationService.publish(driver_id, location)
      })
    })

    it('should send the same event to multiple listeners', () => {
      const driver_id = faker.string.uuid()
      const location = {
        driver_id,
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      }

      const receivedLocations: Location[] = []
      const listener1 = (location: Location) => {
        receivedLocations.push(location)
      }
      const listener2 = (location: Location) => {
        receivedLocations.push(location)
      }
      const listener3 = (location: Location) => {
        receivedLocations.push(location)
      }

      locationService.connect(driver_id, listener1)
      locationService.connect(driver_id, listener2)
      locationService.connect(driver_id, listener3)

      locationService.publish(driver_id, location)

      assert.strictEqual(receivedLocations.length, 3)
      assert.deepStrictEqual(receivedLocations[0], location)
      assert.deepStrictEqual(receivedLocations[1], location)
      assert.deepStrictEqual(receivedLocations[2], location)

      // Cleanup
      locationService.disconnect(driver_id, listener1)
      locationService.disconnect(driver_id, listener2)
      locationService.disconnect(driver_id, listener3)
    })
  })

  test('events should be isolated between different drivers', () => {
    const driver1_id = 'driver_001'
    const driver2_id = 'driver_002'

    const location1 = {
      driver_id: driver1_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    const location2 = {
      driver_id: driver2_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    const driver1Locations: Location[] = []
    const driver2Locations: Location[] = []

    const listener1 = (location: Location) => {
      driver1Locations.push(location)
    }
    const listener2 = (location: Location) => {
      driver2Locations.push(location)
    }

    locationService.connect(driver1_id, listener1)
    locationService.connect(driver2_id, listener2)

    locationService.publish(driver1_id, location1)
    locationService.publish(driver2_id, location2)

    assert.strictEqual(driver1Locations.length, 1)
    assert.strictEqual(driver2Locations.length, 1)
    assert.deepStrictEqual(driver1Locations[0], location1)
    assert.deepStrictEqual(driver2Locations[0], location2)

    // Cleanup
    locationService.disconnect(driver1_id, listener1)
    locationService.disconnect(driver2_id, listener2)
  })

  test('listener should receive multiple published events', () => {
    const driver_id = faker.string.uuid()

    const receivedLocations: Location[] = []
    const listener = (location: Location) => {
      receivedLocations.push(location)
    }

    locationService.connect(driver_id, listener)

    const location1 = {
      driver_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    const location2 = {
      driver_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    const location3 = {
      driver_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    locationService.publish(driver_id, location1)
    locationService.publish(driver_id, location2)
    locationService.publish(driver_id, location3)

    assert.strictEqual(receivedLocations.length, 3)
    assert.deepStrictEqual(receivedLocations[0], location1)
    assert.deepStrictEqual(receivedLocations[1], location2)
    assert.deepStrictEqual(receivedLocations[2], location3)

    // Cleanup
    locationService.disconnect(driver_id, listener)
  })

  test('same listener can be connected and disconnected multiple times', () => {
    const driver_id = faker.string.uuid()

    let callCount = 0
    const listener = () => {
      callCount++
    }

    const location = {
      driver_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    // First connection
    locationService.connect(driver_id, listener)
    locationService.publish(driver_id, location)
    assert.strictEqual(callCount, 1)

    // Disconnect
    locationService.disconnect(driver_id, listener)
    locationService.publish(driver_id, location)
    assert.strictEqual(callCount, 1) // Should not increment

    // Reconnect
    locationService.connect(driver_id, listener)
    locationService.publish(driver_id, location)
    assert.strictEqual(callCount, 2)

    // Cleanup
    locationService.disconnect(driver_id, listener)
  })

  test('partial disconnect should keep other listeners active', () => {
    const driver_id = faker.string.uuid()
    let callCount1 = 0
    let callCount2 = 0

    const listener1 = () => {
      callCount1++
    }
    const listener2 = () => {
      callCount2++
    }

    const location = {
      driver_id,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      timestamp: faker.date.recent().toISOString(),
    }

    locationService.connect(driver_id, listener1)
    locationService.connect(driver_id, listener2)

    locationService.publish(driver_id, location)
    assert.strictEqual(callCount1, 1)
    assert.strictEqual(callCount2, 1)

    // Disconnect only listener1
    locationService.disconnect(driver_id, listener1)

    locationService.publish(driver_id, location)
    assert.strictEqual(callCount1, 1) // Should not increment
    assert.strictEqual(callCount2, 2) // Should increment

    // Cleanup
    locationService.disconnect(driver_id, listener2)
  })
})
