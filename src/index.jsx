import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'
import Home from './container/home/home.jsx'

class Text extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home}/>
            </Router>
        )
    }
}
ReactDOM.render(<Text/>, document.getElementById('root'))