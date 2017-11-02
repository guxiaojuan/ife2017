import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route} from 'react-router'
import Home from './container/home/home.jsx'

class Text extends React.Component {
    render() {
        return (
            <Router>
                <Route path='/' component={Home}>
                    <Route path='home' component={Home}/>
                </Route>
            </Router>
        )
    }
}
ReactDOM.render(<Text/>, document.getElementById('root'))