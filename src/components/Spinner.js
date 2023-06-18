import React, { Component } from 'react'
import styles from './Spinner.module.css'; 

export default class Spinner extends Component {
  render() {
    return (
        <div className={`${styles.center}`}>
            <div className={`${styles.loader} `}></div>
        </div>
        
    )
  }
}
