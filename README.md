## Playgrounder

An app for finding, favoriting and planning your playground adventures in Chicago. Built with React + Vite and deployed via Heroku.

[Live URL](https://playgrounder-a77bf4c8a830.herokuapp.com/)

### APIs used
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


### Major Components
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

### How to run locally
- Run the following `npm install && npm run dev` in your console.

### Features
- Search for a playground by visiting the home route and adding a [Chicago zipcode](https://www.chicago.gov/content/dam/city/sites/covid/reports/2020-04-24/ChicagoCommunityAreaandZipcodeMap.pdf)
- Click on a playground returned in the list, or favorite it
- Favorited playgrounds can be added to your weekly itinerary on the /planner page
- Playgrounds added to your itinerary are ready to be shared via email (mailto link).
- Favorited playgrounds are saved to your local storage

### Images
- Main playground illustration from iStock by Getty Images by [Aluna1](https://www.istockphoto.com/vector/playground-graphic-black-white-landscape-sketch-illustration-vector-gm1974900032-558664417)
- Playground pictures for the 60619 zipcode from [chicago playgrounds website](https://chicagoplaygrounds.com/s/guide/page/welcome) and uploaded to my personal AWS S3 bucket.


### Sources:
- How to create an email link: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links#email_links
- Alternating color of elements: https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child