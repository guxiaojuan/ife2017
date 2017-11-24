import React from 'react'
import style from './header.css'

export default class Header extends React.Component{
    render(){
        return(
            <div className={style.header}>
                <div className="message">
                    <div className="wenhao">?</div>
                    <span className="content">问卷管理</span>
                </div>
                <div className="my">我的问卷</div>
            </div>
        )
    }
}

