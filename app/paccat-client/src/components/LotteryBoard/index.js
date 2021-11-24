import React from 'react'

import LotteryBullet from './bullet';
import './style.css';


const LotteryBoard = (props) => {

    const {onClick, boardNumbers} = props;


    const handleToggle = (number) => {
        onClick(number)
    }
       
    return (
        <div className="coluna-aposte m-5">
            <ul className="escolhe-numero">
                {boardNumbers.map((item) => <LotteryBullet key={item.id} number={item} onClick={handleToggle}/>)}
            </ul>           
            <div className="container-numeros-selecionados">
                <ul className="numeros-selecionados">
                    {  boardNumbers.filter(number => number.selected).map(number => <li key={number.id}>{number.id}</li>)    }     
                </ul>                
            </div>            
        </div>
    )
}

export default LotteryBoard