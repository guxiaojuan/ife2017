import React from 'react'
import ReactDOM from 'react-dom'

class Text extends React.Component {
    render() {
        return (
            <p>This is a react Component</p>
        )
    }
}
ReactDOM.render(<Text/>, document.getElementById('root'))