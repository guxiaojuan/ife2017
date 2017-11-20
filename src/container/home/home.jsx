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
        this.setState(preState =>{
            isToggleOn:!preState.isToggleOn
        })
    }
    componentDidMount(){
        console.log(this.isToggleOn)
    }

    render(){
        return(
            <button onClick={this.handleClick}>
                {this.isToggleOn? 'ON':'OFF'}
            </button>
        )
    }
}
