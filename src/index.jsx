import React from 'react'
import ReactDOM from 'react-dom'
import Form from './container/home/form.jsx'
import Home from './container/home/home.jsx'
import App from './container/app/app.jsx'
import Header from './components/header/header.jsx'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App}></Route>
            <Route path="/form" component={Form}/>
            <Route path="/home" component={Home}/>
            <Route path="/header" component={Header}/>
        </Switch>
    </Router>
)


ReactDOM.render(<Root/>,document.getElementById('root'))
