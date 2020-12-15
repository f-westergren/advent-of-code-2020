let departureTime = 1000053
let buses = '19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,523,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,x,x,x,x,23,x,x,x,x,x,29,x,547,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,17';

let busList = buses.split(',').filter(bus => bus !== 'x').map(bus => +bus)

const checkDeparture = () => {
  let waitTime = undefined;
  let busNumber;
  busList.forEach(bus => {
      let minutes = (bus * (Math.floor(departureTime / bus)) + bus) - departureTime
      if (minutes < waitTime || waitTime === undefined) {
        waitTime = minutes;
        busNumber = bus
      }
    })

  console.log('Answer Part 1:', waitTime * busNumber)
}

checkDeparture()