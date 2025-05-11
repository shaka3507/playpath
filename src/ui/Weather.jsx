import { useState, useEffect } from 'react'
import { getLocalStorageItem } from '../localStorageUtil'
// import { fakeWeatherData } from '../data/fakeWeatherData.js'


// based off https://open-meteo.com/en/docs?current=precipitation#weather_variable_documentation
const HUMAN_FRIENDLY_WEATHER_CODE = {
  0: 'clear skies',
  1: 'mainly clear skies',
  2: 'partly cloudly',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'light drizzle',
  53: 'moderate drizzle',
  55: 'dense drizzle',
  56: 'light freezing drizzle',
  57: 'dense freezing drizzle',
  61: 'slight rain',
  63: 'moderate rain',
  65: 'heavy rain',
  66: 'freezing light rain',
  67: 'freezing heavy rain',
  71: 'slight snow fall',
  73: 'moderate snow fall',
  75: 'heavy snow fall',
  77: 'snow grains',
  80: 'slight rain showers',
  81: 'moderate rain showers',
  82: 'violent rain showers',
  85: 'slight snow showers',
  86: 'heavy snow showers', 
  96: 'thunderstorm with slight hail'
}

export default function Weather() {
  const [temp, setTemp] = useState('..loading..')
  const [name, setName] = useState('')
  const [weatherCode, setWeatherCode] = useState('')
  const [loaded, setLoaded] = useState(false)
  
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

  useEffect(() => {
    const playground = getLocalStorageItem('playground')
    setName(playground.label)
    const latLongLocation = playground.the_geom.coordinates[0][0][0]
    const lat = latLongLocation[1]
    const long = latLongLocation[0]
    getWeather(lat, long).then((resp) => {
      if(resp) {
        setTemp(resp.current.temperature_2m)
        setWeatherCode(resp.current.weather_code)
        setLoaded(true)
      }
    })
  }, [])

  const getWeatherCode = () => {
    return HUMAN_FRIENDLY_WEATHER_CODE[weatherCode] || 'no data'
  }

  const getWidgetBackground = () => {
    if (weatherCode < 3) {
      return 'clear'
    } else if (weatherCode >= 3 && weatherCode <= 68) {
      return 'rain'
    } else {
      return 'snow'
    }
  }

  const weatherContent = (
    <div className={`${getWidgetBackground()} weather-widget`}>
      <p>{getWeatherCode()}</p>
      <p className="temp">{temp}°F</p>
      <p><i className="fa fa-map-marker" /> {name}</p>
    </div>
  )

  return (
    <div>
      {!loaded ? 'loading...' : weatherContent}
    </div>
  )
}
