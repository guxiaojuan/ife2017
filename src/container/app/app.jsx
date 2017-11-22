import React from 'react'
import {Link} from 'react-router-dom'

export default class App extends React.Component{
    render(){
        return(
            <div>
                <h1>app</h1>
                <ul>
                    <li><Link to="/Main">Main</Link></li>
                    <li>
                        <ul>
                            <li><Link to="/Form">Form</Link></li>
                            <li><Link to="/Home">Home</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}