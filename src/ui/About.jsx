import React from 'react'
import Nav from './Nav.jsx'

export default function About() {
    return (
        <div className="main container">
            <Nav active="about" />
            <h1>About</h1>
            <div>
                <p>This tool is for searching the Chicago playgrounds utilizing public Chicago city data</p>
                <p>This was made for educational purposes only.</p>
            </div>
        </div>
    )
}