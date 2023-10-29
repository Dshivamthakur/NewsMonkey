import React, { Component } from 'react'
import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={`${styles.center}`}>
      <div className={`${styles.loader} `}></div>
    </div>

  )
}

export default Spinner