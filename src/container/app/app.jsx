import {Link} from 'react-router-dom'

export default class App extends React.Component{
    render(){
        return(
            <div>
                <h1>app</h1>
                <ul>
                    <li><Link to="/head">head</Link></li>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/form">Form</Link></li>
                </ul>
            </div>
        )
    }
}