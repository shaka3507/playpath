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