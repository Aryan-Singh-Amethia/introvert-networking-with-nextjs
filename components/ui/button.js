import React from 'react';
import styles from './button.module.css';
import Link from 'next/link';

const Button = (props) => {
    if(props.link){
    return (  
      <Link legacyBehavior href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
           );
    }
    return (
    <button className={styles.btn} onClick={props.onClick}>
      {props.children}
    </button>);
}

export default Button