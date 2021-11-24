import { Container, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom"
import { Creators as LotteryActions } from "../../store/ducks/lottery";

import { useAuth } from '../../blockchain/auth'
import TicketCard from "../TicketCard"
import PigBlack from "../../assets/images/pigblack.svg"
import LotteryBoard from "../LotteryBoard"
import LotteryPay from "../LotteryPay"
import PlayersBoard from "../PlayersBoard"
import StatusForm from "../LotteryPay/status"
import "./style.css"

const PlayGame = (props) => {
  const { 
      account,
      balance,
      myPlayers,
      GetLuck,
       } = useAuth();


  const { boardNumbers, payingMessage } = props.lottery
  const { toggleNumber, clearSelectedNumbers, setPaying } = props

  const handleLotteryNumberClick = (number) => {
    toggleNumber(number);
  }

  const handleOnRegistered = async () => {
    setPaying("Game registered successfully. Your transaction is pending on blockchain. Please wait a while")               
    clearSelectedNumbers();
  }

  const handleReceipt = async () => {   
    setPaying("Your NFT's was minted successfully. Waiting for confirmation.")
  }

  const handleConfirmation = async () => {   
    setPaying('')
  }

  const handleError = async (message) => {
      alert(message)
      setPaying("")
      clearSelectedNumbers();
  }
  const handlePay = async (selectedNumbers, amount) => {
    
    const eventHandlers = {
      onRegistered: handleOnRegistered,
      onReceipt: handleReceipt,
      onConfirmation: handleConfirmation,
      onError: handleError
    }

    setPaying("Minting your NFT!")
    try{
      await GetLuck(selectedNumbers, amount, eventHandlers)  
    } catch (err){
      setPaying("")
    }
    
  }

  return (
      <Container fluid>
        <StatusForm show={payingMessage !== ""} setPaying={setPaying} message={payingMessage}></StatusForm>
        <Row  className='mt-3'>
          <img src={PigBlack} width="400" height="200" className="d-inline-block align-top" alt="" />
          <h2 className="text-center" style={{padding:"20px", fontFamily: "ThemeFont"}}>$ {balance.substring(0, 7)} BNB collected until now.</h2>
          <p className="text-center">This value will be distribuited to the winner at the end of the game</p>
        </Row>


        <Row >
          <Col className="mt-3 rarity d-flex align-items-center justify-content-center" style={{textTransform: "uppercase", padding:"50px"}}>
            <div className="text-center">
              <h2>My Players</h2>
              <PlayersBoard players={myPlayers} />
            </div>            
          </Col>
        </Row>        

        <Row className='mt-3'>
          <Col className="rarity" style={{textTransform: "uppercase"}}> 
            <div className="text-center col-lg-12 col-md-8 col-sm-12">
              <h2>Rarity</h2>
              <p className="normal-text">Each PacCat is unique and more numbers you choose, the rarer your avatar will be.</p>              
              <p className="normal-text">Once PacCat has been minted, it'll possible to see it on OpenSea as well.</p>              
            </div>
          </Col>
        </Row>  

        <Row className='mt-3'> 
          <Col className="d-flex align-items-center justify-content-center" style={{textAlign: "center"}} >
            <ul  className="rarity-cards">
              <li className="m-2"><TicketCard playerNumbers={[...Array(6)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(7)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(9)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(11)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(13)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(14)]}></TicketCard></li>
              <li className="m-2"><TicketCard playerNumbers={[...Array(15)]}></TicketCard></li>
            </ul>
          </Col>
        </Row>         

        <Row>          
          <h2 className="text-center" style={{padding:"40px", fontFamily: "ThemeFont"}}>Start playing</h2>
        </Row>
        <Row>
          <Col lg="9"> 
            <LotteryBoard onClick={handleLotteryNumberClick} boardNumbers={boardNumbers}></LotteryBoard>    
          </Col>
          <Col lg="3">
            <LotteryPay numbers={boardNumbers} action={handlePay}></LotteryPay>    
          </Col>          
        </Row>



        <Row  className='mt-3'>
          <Col md="6">
            <div className="normal-text">
              <h2  className="text-center" style={{fontFamily: "ThemeFont"}}>General Rules:</h2>
              <br/>
              
                <p>1 - At the end of the game, 90% of the amount collected on the PACCAT contract will be distributed to the winner. So, the more player, the bigger the prize </p>
                <p>2 - In case two o more person win the game, the amount collected will be distributed equally among the winners</p>
                <p>3 - The game finishes on 2022/May/31</p>
                <p>4 - The winner will be the one who owned at least six numbers announced at the end of the game</p>
                <p><Link to="/rules"> Click here to see all Rules</Link></p>                
              </div>
          </Col>
          <Col md="6">
            <div className="card-back">
              <p className="card-back-text">{account}</p>
            </div>          
          </Col>             
        </Row>      
      </Container>          
  );
}

const mapStateToProps = state => ({
  lottery: state.lottery,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(LotteryActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayGame);
