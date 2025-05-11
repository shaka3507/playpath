import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const CHICAGO_PARK_DATA_API = 'https://data.cityofchicago.org/resource/ejsh-fztr.json?zip='
const CHICAGO_LOOP_ZIPCODE = '60607'

/*
	https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component
	Custoom hook created to fetch park data from api
	returns loading state, error and park data

*/
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