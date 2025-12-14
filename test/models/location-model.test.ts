import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { faker } from '@faker-js/faker'
import { locations as locationsData } from '../../src/data/locations'
import { LocationModel } from '../../src/models/location-model'

describe('LocationModel', () => {
  describe('constructor', () => {
    it('should initialize with locations', () => {
      const model = new LocationModel(locationsData.slice(0, 5))
      assert.strictEqual(model.locations.length, 5)
    })

    it('should initialize with no locations', () => {
      const model = new LocationModel()
      assert.strictEqual(model.locations.length, 0)
    })
  })

  describe('getLocationsByDriver', () => {
    it('should return all locations for a specific driver', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: faker.date.recent().toISOString(),
        },
        {
          driver_id: 'driver_002',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: faker.date.recent().toISOString(),
        },
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: faker.date.recent().toISOString(),
        },
      ]

      const model = new LocationModel(locations)
      const result = model.getLocationsByDriver('driver_001')

      assert.strictEqual(result.length, 2)
      assert.strictEqual(result[0].driver_id, 'driver_001')
      assert.strictEqual(result[1].driver_id, 'driver_001')
    })

    it('should return empty array when driver has no locations', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: faker.date.recent().toISOString(),
        },
      ]

      const model = new LocationModel(locations)
      const result = model.getLocationsByDriver('driver_002')

      assert.strictEqual(result.length, 0)
    })
  })

  describe('getLocationsSinceByDriver', () => {
    it('should return locations after the specified timestamp', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-13T08:00:00.000Z',
        },
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-12T08:00:00.000Z',
        },
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-T08:00:00.000Z',
        },
      ]

      const model = new LocationModel(locations)
      const result = model.getLocationsSinceByDriver(
        'driver_001',
        '2025-12-11T08:00:00.000Z',
      )

      assert.strictEqual(result.length, 2)
      assert.strictEqual(result[0].timestamp, '2025-12-13T08:00:00.000Z')
      assert.strictEqual(result[1].timestamp, '2025-12-12T08:00:00.000Z')
    })

    it('should return empty array when there are no locations after timestamp', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-13T08:00:00.000Z',
        },
      ]

      const model = new LocationModel(locations)
      const result = model.getLocationsSinceByDriver(
        'driver_001',
        '2025-12-14T08:00:00.000Z',
      )

      assert.strictEqual(result.length, 0)
    })

    it('should filter by both driver and timestamp', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-13T08:00:00.000Z',
        },
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-12T08:00:00.000Z',
        },
        {
          driver_id: 'driver_002',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-12T08:00:00.000Z',
        },
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: '2025-12-T08:00:00.000Z',
        },
      ]

      const model = new LocationModel(locations)
      const result = model.getLocationsSinceByDriver(
        'driver_001',
        '2025-12-11T08:00:00.000Z',
      )

      assert.strictEqual(result.length, 2)
      assert.strictEqual(result[0].driver_id, 'driver_001')
      assert.strictEqual(result[0].timestamp, '2025-12-13T08:00:00.000Z')
    })
  })

  describe('addLocation', () => {
    it('should add new location to the beginning of the array', () => {
      const locations = [
        {
          driver_id: 'driver_001',
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          timestamp: faker.date.recent().toISOString(),
        },
      ]

      const model = new LocationModel(locations)

      const newLocation = {
        driver_id: 'driver_002',
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        timestamp: faker.date.recent().toISOString(),
      }

      model.addLocation(newLocation)

      assert.strictEqual(model.locations.length, 2)
      assert.strictEqual(model.locations[0].driver_id, 'driver_002')
      assert.strictEqual(model.locations[1].driver_id, 'driver_001')
      assert.strictEqual(model.locations[1], locations[0])
    })
  })
})
