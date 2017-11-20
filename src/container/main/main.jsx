import React from 'react'

export default class Main extends React.Component{
    constructor(props){  //constructor方法默认返回实例对象
        super(props)
        this.state={
            date:new Date()

        }
    }
    componentDidMount(){
        this.timerId = setInterval(()=>{
            this.tick()
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    tick(){
        this.setState({
            date:new Date()
        })
    }
    render(){
        return(
            <div>
                <h1>main</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}