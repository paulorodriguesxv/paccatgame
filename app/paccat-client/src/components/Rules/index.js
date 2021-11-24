import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Rules = (props) => {
    return (
        <Container fluid>
        <Row  className='mt-3'>
          <Col >
            <div className="normal-text">
              <h2  className="text-center" style={{fontFamily: "ThemeFont"}}>General Rules:</h2>
              <br/>
                <p>1 - When you buy a PacCat NFT, it's give you the opportunity to participate in the game</p>
                <p>2 - At the end of the game, 90% of the amount collected on the PACCAT contract will be distributed to the winner</p>
                <p>3 - In case two o more person win the game, the amount collected will be distributed equally among the winners</p>
                <p>4 - The game finishes on 2022/May/31.</p>
                <p>5 - The numbers will be provide by Megasena from Brazil. You can see here: http://loterias.caixa.gov.br/wps/portal/loterias/landing/megasena/ </p>
                <p>6 - The winner will be the one who owned the six numbers announced at the first game of June/2022</p>
                <p>7 - You should select from 6 to 15 numbers out of a total of 60</p>                
                <p>9 - You have to have a BNB (Binance coin) wallet. We recomend to use Metamask</p>
                <p>8 - The cost per number increases ( min 0.005 eth ) with the amount of numbers selected</p>
                <p>10 - You can play as many times as you like</p>
                <p>11 - Each time you play, one token will be minted to your account, with the numbers that you've selected</p>
                <p>Contact: paccat at protonmail.com</p>
            </div>
          </Col>                   
        </Row>              
        </Container>
    )
}

export default Rules