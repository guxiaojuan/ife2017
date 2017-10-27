import React from 'react'
import Link from 'react-router'
import style from './header.scss'


export default class Header extends React.Component{
    render(){
        return (
            <div className={style.header}>
               <h1>问卷管理</h1>
                <Link to="/">
                    <h2>我的问卷</h2>
                </Link>
            </div>
        )
    }
}