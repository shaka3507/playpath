# Playgrounder

An app for finding, favoriting and planning your playground adventures in Chicago. Built with React + Vite and deployed via Heroku.


## Live URL

[Live URL](https://playgrounder-a77bf4c8a830.herokuapp.com/)


## Files Created/Crafted

CSS
- index.css
- App.css
- ui/Playground.css
- ui/Planner.css

JSX
- ui/About.jsx
- ui/Features.jsx
- ui/Nav.jsx
- ui/Planner.jsx
- ui/PlannerDay.jsx
- ui/Playground.jsx
- ui/PlaygroundList.jsx
- ui/Weather.jsx
- App.jsx

JS
- ui/usePlayground.js
- localStorageUtil.js

Saved data from API for local debugging (not used in final project)
- data/fakePlaygroundData.js
- data/fakeWeatherData.js


Assets
(added for display)


## Demo
(done in class)

## PDF with code


## Explanation of requirements

#### An array
- Examples of array usage is throughout the application, for example updating state or local storage to ensure were serving playgrounds in a list, or saving favorites in local storage use arrays. For example, rendering playground data from api which is returned as an array:
- PlaygroundList.jsx#L67
	```
        {playgroundData?.map((playground, index) => (
          <Playground
            key={`${playground.objectid_1}`}
            result={playground}
            onClick={() => savePlayground(playground)}
          />
        ))}
	```
#### React JSX syntax is used through the application
#### Form Elements
- I have a search input, to handle searching and retrieving playground data from the API. On App.jsx#L19 - this is in a component:

```
export function Search({
  handleSubmit,
  handleInputChange,
  search,
  placeholder = "Search by Chicago City Zipcode",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="search-bar"
        onChange={handleInputChange}
        placeholder={placeholder}
        value={search}
      />
    </form>
  )
}
``` 

#### React Component
- I created several React components, for example Planner.jsx, PlannerDay.jsx, Playground.jsx, PlaygroundList.jsx, Weather.jsx, About.jsx, Features.jsx, and Nav.jsx. Many of these are reusable. For example the Nav component is used on each view, and takes a prop for the view name to add additional styling to the nav item:

```
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ active }) {
    const [openMenu, setOpenMenu] = useState(false)
    const isActive = (viewName) => active === viewName ? 'active' : ''
    const open = (
        <span>
            <p className={isActive('home')}><Link to="/">Home</Link></p>
            <p className={isActive('play')}><Link to="/play">Play</Link></p>
            <p className={isActive('planner')}><Link to="/planner">Weekly Planner</Link></p>
            <p className={isActive('about')}><Link to="/about">About</Link></p>
            <p>&#94;</p>
        </span>
    )
    const closed = <span>Menu</span>
    return (
        <nav className="nav" onClick={(e) => {
            e.stopPropagation()
            setOpenMenu(!openMenu)}
        }>
            {openMenu ? open: closed}
        </nav>
    )
}

```

#### React module
- I created different JS modules, and a custom hook to better share functionality within the application. For example usePlayground is a hook that gets playground data, and also gives the component access to loading and error states.
- I also created localStorageUtil.js which is used throughout the application to ensure I retrieve, delete and update keys from local storage in a consistent way.

#### React Hook
- I created a react hook and also used useState and useEffect through my application. 
```
export default function usePlayground(){
	const [loading, setLoading] = useState(true)
	const [playgroundData, setPlaygroundData] = useState(null)
	const [error, setError] = useState(null)
	const [zip, setZip] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        (
			async function getData() {
		      // if no zipcode provided, default to center of Chicago (The Loop)
	  		  const filterZipcode = searchParams.get('q') || CHICAGO_LOOP_ZIPCODE
	  		  setZip(filterZipcode)
			  const url = CHICAGO_PARK_DATA_API + filterZipcode
			  try {
			    const response = await fetch(url, { app_token: "", limit: 200 })
			    if (!response.ok) {
			      setError(response.status)
			    }
			    const json = await response.json()
			    setPlaygroundData(json)
			  } catch (error) {
			    console.error(error.message)
			    setError(response.status)
			  } finally {
			  	setLoading(false)
			  }
			}
        )()
    }, [searchParams])

	return { playgroundData, loading, error, zip }
}

```

For example this hook uses useEffect and useState aswell as a hook from react-router-dom (useSearchParams). It takes searchParams as a dependency, before refetching data. So a user can update the zip code, and itll attempt to refetch data.

#### APIs used
- [Playground Data API from city](https://data.cityofchicago.org/Parks-Recreation/CPD_Parks/ejsh-fztr/about_data)
	- Data based on https://www.chicagoparkdistrict.com/parks-facilities
	- Data set includes 617 parks with 81 different attributes for each park.
- [Open-mateo Free Weather API](https://open-meteo.com/)
    - Example response:
    ```
	 {
	  ...
	  "current": {
	    "time": "2022-01-01T15:00",
	    "temperature_2m": 2.4,
	    "wind_speed_10m": 11.9,
	  },
	  "hourly": {
	    "time": ["2022-07-01T00:00","2022-07-01T01:00", ...],
	    "wind_speed_10m": [3.16,3.02,3.3,3.14,3.2,2.95, ...],
	    "temperature_2m": [13.7,13.3,12.8,12.3,11.8, ...],
	    "relative_humidity_2m": [82,83,86,85,88,88,84,76, ...],
	  }
	}
    ```


#### Routes
- I created the home route, /play, /play/:id, /planner and about. Where we can see many playgrounds, see a specific playground at a certain route, and also have a planner route for creating a week itinerary.

#### Major Components
- **App.jsx (view)**: for handling routes, and the main search functionality
- **PlaygroundList.jsx (view)**: Gets playground list results, using usePlayground custom hook
- **usePlayground**: custom hook created to fetch data from API and allows components to easily access loading status, error and playground data
- **Playground.jsx (view)**: View and card ui for single playground
- **Features.jsx** - renders pills for each playground card
- **Weather.jsx**: widget component used to interact with Open MATEO api and display weather data for the lat/long location for the specific playground
- **Planner.jsx (view)** - Used to control planner view, with child component that renders a single day in the week
- **Nav.jsx**: Nav component
- **fakePlaygroundData and fakeWeatherData** - examples of data retrieved from API - used for local development
- **localStorageUtil.js** - modules used to retrieve, delete and save data in local storage


### More info

#### How to run locally
- Run the following `npm install && npm run dev` in your console.

#### Features
- Search for a playground by visiting the home route and adding a [Chicago zipcode](https://www.chicago.gov/content/dam/city/sites/covid/reports/2020-04-24/ChicagoCommunityAreaandZipcodeMap.pdf)
- Click on a playground returned in the list, or favorite it
- Favorited playgrounds can be added to your weekly itinerary on the /planner page
- Playgrounds added to your itinerary are ready to be shared via email (mailto link).
- Favorited playgrounds are saved to your local storage

#### Images
- Main playground illustration from iStock by Getty Images by [Aluna1](https://www.istockphoto.com/vector/playground-graphic-black-white-landscape-sketch-illustration-vector-gm1974900032-558664417)
- Playground pictures for the 60619 zipcode from [chicago playgrounds website](https://chicagoplaygrounds.com/s/guide/page/welcome) and uploaded to my personal AWS S3 bucket.


#### Sources:
- How to create an email link: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links#email_links
- Alternating color of elements: https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child

## Questions

### Satisfying piece
Creating my own custom hook and working with the APIs, specifically looking at the data returned and figuring out how to represent it in a human readable format was the most satisfying. For example Open Mateo, the weather API has lots of data that represents the weather at any given moment - I opted to stick with temperature and precipitation. If I had more time, I'd build out this widget for information related to play - maybe air quality or allergy related info would be relative to families deciding whether they are going to a playgorund.

### If I had two more weeks, I would
I would add more ways to review a playground before going, and a way to add notes. In order to do this, I would build out an integration with a databse (available in Heroku) or other ways to personalize information saved for each park, for a user. This would also require some type of authentication, which probably would utilize a third party API to accomplish that. If I didnt build out authentication, building out the sharing functionality to ensure I can share more information about an itinerary to another person would be helpful.

### Most useful thing we learned in class
Seeing the steady stepping stones to get from html/css to JavaScript to React was really helpful for me. I've never learned React in this type of form, that explained how we get from HTML/CSS to create React applications with routers, so that background and more foundational knowledge was helpful. 

