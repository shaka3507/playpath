import { useState, useEffect } from 'react'
import { getLocalStorageItem } from '../localStorageUtil';

async function getWeather(lat, long) {
  const OPEN_MATEO_CHICAGO_WEATHER_API =
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m,precipitation,cloud_cover,weather_code,relative_humidity_2m&current=temperature_2m,cloud_cover,is_day,precipitation,weather_code,apparent_temperature,wind_gusts_10m&timezone=America%2FChicago&wind_speed_unit=mph&temperature_unit=fahrenheit`
  try {
    const response = await fetch(OPEN_MATEO_CHICAGO_WEATHER_API)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    return json
  } catch (error) {
    console.error(error.message)
  }
}

export default function Weather() {
  const [temp, setTemp] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    const playground = getLocalStorageItem('playground')
    setName(playground.label)
    const latLongLocation = playground.the_geom.coordinates[0][0][0]
    const lat = latLongLocation[1]
    const long = latLongLocation[0]
    getWeather(lat, long).then((resp) => {
      if(resp) {
        setTemp(resp.current.temperature_2m)
      }
    })
  }, [])
  return (
    <div className="weather-widget">
      <h3><em>current temperature at {name} Park</em></h3>
      <p>{temp}°F</p>
    </div>
  )
}
