import { useState } from 'react'

const NORMALIZED_ATTRIBUTE_NAME = {
	"football_s": "football",
	"cultural_c": "culture center",
	"gymnasium": "gym",
	"playground": "playground",
	"spray_feat": "water play",
	"baseball_s": "baseball",
	"water_play": "water play",
	"cricket_fi": "cricket",
	"harbor": "harbor",
	"dog_friend": "dog friendly",
	"water_slid": "water slide",
	"minigolf": "mini golf",
	"garden": "garden",
	"beach": "beach",
	"fitness_c": "fitness center",
	"basketball": "basketball",
	"basketba_1": "basketball",
	"wheelchr_a": "wheel chair access",
	"skate_park": "skate park"
}

export default function Features({ data, isParkPage }) {
	return (
		<div className="features">
			{Object.keys(data).map((parkAttribute, idx) => {
				const attribute = data[parkAttribute]
				console.log("attribute", attribute)
				if(attribute == 1 && NORMALIZED_ATTRIBUTE_NAME.hasOwnProperty(parkAttribute)) {
					return <div className="pill">{NORMALIZED_ATTRIBUTE_NAME[parkAttribute]}</div>
				} else {
					return null
				}
			})
			}
		</div>
	)
}