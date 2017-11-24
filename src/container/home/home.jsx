import React from 'react'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isToggleOn:true
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            isToggleOn:!this.state.isToggleOn
        })
        console.log("this.state is:" +this.state.isToggleOn)
    }

    render(){
        return(
            <button onClick={this.handleClick}>
                {this.state.isToggleOn? 'ON':'OFF'}
            </button>
        )
    }
}
