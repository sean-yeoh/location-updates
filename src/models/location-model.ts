import { locations as locationsData } from '../data/locations'

interface Location {
  driver_id: string
  latitude: number
  longitude: number
  timestamp: string
}

class LocationModel {
  locations: Location[]

  constructor(locations: Location[] = []) {
    this.locations = [...locations]
  }

  getLocationsByDriver(driver_id: string) {
    return this.locations.filter((location) => location.driver_id === driver_id)
  }

  getLocationsSinceByDriver(driver_id: string, since: string) {
    const driverLocations = this.getLocationsByDriver(driver_id)
    return driverLocations.filter(
      (location) => new Date(location.timestamp) > new Date(since),
    )
  }

  addLocation(location: Location) {
    // Use unshift instead of push because locations is sorted descendingly in the sample data
    this.locations.unshift(location)
  }
}

const locationModel = new LocationModel(locationsData)

export { LocationModel, locationModel }
export type { Location }
