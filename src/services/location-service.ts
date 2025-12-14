import { EventEmitter } from 'events'
import type { Location } from '../models/location-model'

class LocationService extends EventEmitter {
  constructor() {
    super()
  }

  connect(driver_id: string, listenerFn: (location: Location) => void) {
    const eventName = `driver:${driver_id}`
    this.on(eventName, listenerFn)
    console.log(`Client connected to driver: ${driver_id}`)
  }

  disconnect(driver_id: string, listenerFn: (location: Location) => void) {
    const eventName = `driver:${driver_id}`
    this.off(eventName, listenerFn)
    console.log(`Client disconnected from driver: ${driver_id}`)
  }

  publish(driver_id: string, location: Location) {
    const eventName = `driver:${driver_id}`
    this.emit(eventName, location)
  }
}

export const locationService = new LocationService()
