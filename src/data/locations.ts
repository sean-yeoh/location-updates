// hardcoded locations using drivers from ./drivers.ts and the following functions

// const randomBetween = (min, max) => {
//   return Math.random() * (max - min) + min
// }

// const randomTimestampWithinLastMonth = () => {
//   const now = new Date()
//   const oneMonthAgo = new Date()
//   oneMonthAgo.setMonth(now.getMonth() - 1)

//   const randomTime =
//     oneMonthAgo.getTime() +
//     Math.random() * (now.getTime() - oneMonthAgo.getTime())

//   return new Date(randomTime).toISOString()
// }

// const locations = drivers.flatMap((driver) =>
//   Array.from({ length: 10 }, () => ({
//     driver_id: driver.id,
//     latitude: Number(randomBetween(1.2, 1.5).toFixed(6)),
//     longitude: Number(randomBetween(103.6, 104.1).toFixed(6)),
//     timestamp: randomTimestampWithinLastMonth(),
//   })),
// )

export const locations = [
  {
    driver_id: 'driver_001',
    latitude: 1.483925,
    longitude: 103.652523,
    timestamp: '2025-12-13T09:59:23.246Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.229246,
    longitude: 103.633757,
    timestamp: '2025-12-13T03:39:15.272Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.497819,
    longitude: 104.022497,
    timestamp: '2025-12-12T10:23:29.711Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.330242,
    longitude: 103.706886,
    timestamp: '2025-12-10T16:46:28.608Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.373069,
    longitude: 103.664341,
    timestamp: '2025-12-09T17:47:29.170Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.20487,
    longitude: 104.035919,
    timestamp: '2025-12-08T19:23:56.919Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.313645,
    longitude: 103.98521,
    timestamp: '2025-12-08T04:15:32.895Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.304686,
    longitude: 103.754998,
    timestamp: '2025-12-07T07:08:17.698Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.435271,
    longitude: 103.91369,
    timestamp: '2025-12-06T21:42:31.507Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.403424,
    longitude: 103.946062,
    timestamp: '2025-12-06T14:27:45.193Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.428662,
    longitude: 103.766758,
    timestamp: '2025-12-05T17:50:20.302Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.208073,
    longitude: 103.778207,
    timestamp: '2025-12-05T06:26:12.975Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.296658,
    longitude: 104.014677,
    timestamp: '2025-12-04T23:11:46.655Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.358527,
    longitude: 103.652504,
    timestamp: '2025-12-04T00:36:03.706Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.349141,
    longitude: 103.774581,
    timestamp: '2025-12-03T22:25:21.559Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.476976,
    longitude: 104.016168,
    timestamp: '2025-12-03T01:58:50.434Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.26392,
    longitude: 103.620008,
    timestamp: '2025-12-02T18:47:04.823Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.248178,
    longitude: 103.913329,
    timestamp: '2025-12-01T23:54:37.422Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.342043,
    longitude: 103.925211,
    timestamp: '2025-11-30T21:16:37.102Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.305198,
    longitude: 103.785419,
    timestamp: '2025-11-29T22:42:34.373Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.239103,
    longitude: 103.851251,
    timestamp: '2025-11-28T19:06:30.101Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.299808,
    longitude: 103.737574,
    timestamp: '2025-11-28T12:21:03.835Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.358133,
    longitude: 103.634119,
    timestamp: '2025-11-28T09:47:14.103Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.415196,
    longitude: 103.834979,
    timestamp: '2025-11-27T21:27:52.226Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.405628,
    longitude: 104.048148,
    timestamp: '2025-11-26T19:40:10.533Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.20089,
    longitude: 104.021794,
    timestamp: '2025-11-25T14:25:37.711Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.319447,
    longitude: 103.706252,
    timestamp: '2025-11-25T07:14:16.977Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.34676,
    longitude: 104.038752,
    timestamp: '2025-11-24T23:56:43.724Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.463539,
    longitude: 103.729409,
    timestamp: '2025-11-24T20:45:03.551Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.480424,
    longitude: 103.804494,
    timestamp: '2025-11-21T16:49:02.354Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.348436,
    longitude: 103.750005,
    timestamp: '2025-11-21T06:40:16.385Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.239567,
    longitude: 103.88913,
    timestamp: '2025-11-21T03:35:47.829Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.203212,
    longitude: 104.081201,
    timestamp: '2025-11-18T13:20:48.178Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.490675,
    longitude: 103.706663,
    timestamp: '2025-11-18T03:01:20.980Z',
  },
  {
    driver_id: 'driver_004',
    latitude: 1.217965,
    longitude: 104.083791,
    timestamp: '2025-11-16T17:49:54.807Z',
  },
  {
    driver_id: 'driver_001',
    latitude: 1.322841,
    longitude: 104.02421,
    timestamp: '2025-11-16T00:53:41.968Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.48777,
    longitude: 103.613884,
    timestamp: '2025-11-15T14:47:55.426Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.215336,
    longitude: 104.029924,
    timestamp: '2025-11-14T09:24:09.773Z',
  },
  {
    driver_id: 'driver_003',
    latitude: 1.338908,
    longitude: 103.748182,
    timestamp: '2025-11-14T07:07:14.953Z',
  },
  {
    driver_id: 'driver_002',
    latitude: 1.314353,
    longitude: 103.968449,
    timestamp: '2025-11-13T18:40:34.056Z',
  },
]
