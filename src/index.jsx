import React from 'react'
import ReactDOM from 'react-dom'
import Main from './container/main/main.jsx'
import Home from './container/home/home.jsx'

class Text extends React.Component {
    render() {
        return (
            <div>
                <h1>问卷调查</h1>
                <Main></Main>
                <h1>--------------</h1>
                <Home/>
            </div>

        )
    }
}
ReactDOM.render(<Text/>, document.getElementById('root'))