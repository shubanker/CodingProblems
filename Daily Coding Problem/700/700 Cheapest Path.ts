/**
You are given a huge list of airline ticket prices between different cities around the world on a given day. 
These are all direct flights. Each element in the list has the format (source_city, destination, price).

Consider a user who is willing to take up to k connections from their origin city A to their destination B. 
Find the cheapest fare possible for this journey and print the itinerary for that journey.
*/
export function getChepestPrice(
  list: any[][],
  source: string,
  destination: string,
  connectionsLimit: number
) {
  const connectionMap: Record<string, any[][]> = list.reduce(
    (accum, flight) => {
      if (!accum[flight[0]]) {
        accum[flight[0]] = [];
      }
      accum[flight[0]].push(flight);
      return accum;
    },
    {}
  );
  return findChepestFLight(
    connectionMap,
    source,
    destination,
    connectionsLimit,
    [],
    0
  );
}
function findChepestFLight(
  connectionMap: Record<string, any[][]>,
  source: string,
  destination: string,
  limit: number,
  visitedCities: string[],
  currentPrice: number
) {
  if (limit <= 0) {
    return null;
  }
  const prices: number[] = [];
  connectionMap[source]?.forEach((flight) => {
    const flightDestination = flight[1];
    const inclusivePrice = +flight[2] + currentPrice;
    if (visitedCities.includes(flightDestination)) {
      return;
    }
    if (flightDestination === destination) {
      prices.push(inclusivePrice);
    } else {
      const innerPrice = findChepestFLight(
        connectionMap,
        flightDestination,
        destination,
        limit - 1,
        [...visitedCities, flightDestination],
        inclusivePrice
      );

      if (innerPrice) {
        prices.push(innerPrice);
      }
    }
  });
  if (prices.length) {
    return Math.min(...prices);
  }
  return null;
}
