import React from 'react'

const LotteryBullet = (props) => {

    const { number, onClick } = props

    return (
        <li><a className={number.selected ? " selected" : ""} href="#;" onClick={() => onClick(number)}>{number.id}</a></li>
    )
}

export default LotteryBullet