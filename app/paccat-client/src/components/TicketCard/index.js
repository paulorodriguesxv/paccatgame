import React from 'react'
import Ticket from "../Ticket"
import Player00 from "../../assets/images/00-ticket-template.svg"
import Player06 from "../../assets/images/06-ticket-template.svg"
import Player0708 from "../../assets/images/07-08-ticket-template.svg"
import Player0910 from "../../assets/images/09-10-ticket-template.svg"
import Player1112 from "../../assets/images/11-12-ticket-template.svg"
import Player13 from "../../assets/images/13-ticket-template.svg"
import Player14 from "../../assets/images/14-ticket-template.svg"
import Player15 from "../../assets/images/15-ticket-template.svg"

import './style.css';

const TicketCard = (props) => {

    const {playerNumbers} = props

    const calculatePlayer = (numbers) => {
        const _betCost = 0.05
        const factor = numbers.length**9 / 10000000;
    
        return factor * _betCost;    
    }

    const calculatePlayerCost = (numbersQty) => {
        return calculatePlayer([...Array(numbersQty)])
    }    
    
    const playersData = [
        { digits: 0, title: "Choose at least six numbers", description: "Choose from 6 to 15 numbers", cost: 0, image: Player00},
        { digits: 6, title: "The Ordinary One", description: "For those who selected only 6 numbers", cost: calculatePlayerCost(6), image: Player06},
        { digits: 7, title: "The Phanton in Red C ", description: "For those who selected 7 or 8 numbers", cost: calculatePlayerCost(7), image: Player0708 },
        { digits: 8, title: "The Phanton in Red C ", description: "For those who selected 7 or 8 numbers", cost: calculatePlayerCost(8), image: Player0708 },
        { digits: 9, title: "The Phanton in Red T", description: "For those who selected 9 or 10 numbers",  cost: calculatePlayerCost(9), image: Player0910},           
        { digits: 10, title: "The Phanton in Red T", description: "For those who selected 9 or 10 numbers",  cost: calculatePlayerCost(10), image: Player0910},
        { digits: 11, title: "The Phanton in Red Master ", description: "For those who selected 11 or 12 numbers",  cost: calculatePlayerCost(11), image: Player1112},
        { digits: 12, title: "The Phanton in Red Master ", description: "For those who selected 11 or 12 numbers",  cost: calculatePlayerCost(12), image: Player1112 },
        { digits: 13, title: "The one who knows VIP", description: "For those who selected 13 numbers", cost: calculatePlayerCost(13), image: Player13},
        { digits: 14, title: "The Game Master", description: "For those who selected 14 numbers", cost: calculatePlayerCost(14), image: Player14},
        { digits: 15, title: "The Patreon", description: "For those who selected 15 numbers", cost: calculatePlayerCost(15), image: Player15 },
    ]

    const getPlayer = (players, selectedNumbers) => {
        const player = players.filter(player => player.digits === selectedNumbers)

        
        if (player.length === 1){            
            return (
               player[0]
            )
        }
    }

    const renderPlayerCard = () => {
        const player = getPlayer(playersData, playerNumbers.length)

        if (player){
            return (
                <div className="m-2"><Ticket image={player.image} title={player.title} description={player.description} cost={player.cost}></Ticket></div>            
            )    
        } else {
            return (<div></div>)
        }
    }

    return (
        <div className="m-2"> 
              {renderPlayerCard(playerNumbers)}
        </div>       
    )
}

export default TicketCard
