import React from 'react'
import Link from 'react-router'


export default class Header extends React.Component{
    render(){
        return (
            <div>
               <h1>问卷管理</h1>
                <Link to="/">
                    <h2>我的问卷</h2>
                </Link>
            </div>
        )
    }
}