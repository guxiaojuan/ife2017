import React from 'react'
export default class Reservation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isGoing:true,
            number:2
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    handleInputChange(e){
        if(e.target.type === 'checkbox'){
            this.setState({
                isGoing:!this.state.isGoing
            })
            console.log('-----------------')
        } else{
            this.setState({
                number:e.target.value
            })
        }
        console.log(this.state.isGoing)
    }
    render(){
        return(
            <form>
                <label>
                    Is going:
                    <input
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Number of guests:
                    <input
                        name="numberOfGuests"
                        type="number"
                        value={this.state.number}
                        onChange={this.handleInputChange} />
                </label>
            </form>
        )
    }
}