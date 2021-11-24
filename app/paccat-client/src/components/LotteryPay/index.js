import React, {useEffect, useState} from 'react'
import TicketCard from "../TicketCard"


import './style.css';


const LotteryPay = (props) => {
    
    const {numbers, action} = props

    const [selectedNumbers, setSelectedNumbers] = useState([])

    useEffect(
        () => setSelectedNumbers(numbers.filter(number => number.selected === true)), [numbers])

    const calculatePlayer = (numbers) => {
        //const _betCost = 0.005 // eth net
        const _betCost = 0.05 // bsc net
        const factor = numbers.length**9 / 10000000;
    
        const total = factor * _betCost;    

        return total
    }
    
    
    return (
        <div style={{marginTop: "10%"}}>
            {selectedNumbers.length > 5 ? <TicketCard playerNumbers={selectedNumbers}></TicketCard> : <></>}
            <div>
                {selectedNumbers.length > 5 ? 
                    <div>
                        <p>Estimated cost: {calculatePlayer(selectedNumbers).toFixed(5)} </p>
                        <button type="button" id="playthegame" className="btn btn-primary data-completar-jogo-mega-sena" onClick={async() => await action(selectedNumbers, calculatePlayer(selectedNumbers))}>I want to Play the game</button>
                    </div> : <div><TicketCard playerNumbers={[]}></TicketCard></div>}
            </div>
        </div>
    )
}

export default LotteryPay
