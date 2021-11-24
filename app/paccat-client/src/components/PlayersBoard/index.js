import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './style.css';

const PlayersBoard = (props) => {

    const { players } = props

    return (
        <>
        { players.length > 0 ?
        <div className="players d-flex W-100 text-center">
            <Carousel controls={true} indicators={true}>
            { players.map((item, key) => 
                  <Carousel.Item interval={2500} key={key}>
                      <img  className="d-block w-100" src={item}></img>
                   </Carousel.Item>
                ) }
            </Carousel>
        </div> :
        <h4>No players recorded yet</h4>}
        </>
    )
}

export default PlayersBoard