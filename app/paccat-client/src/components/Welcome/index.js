import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Creators as LotteryActions } from "../../store/ducks/lottery"
import { useAuth } from '../../blockchain/auth'
import LoadingForm from "../LoadingForm"

const Welcome = (props) => {

    const { Login } = useAuth();    
    const { setLoading } = props;

    async function handleLogin() {

        setLoading(true);
        await Login();
    }

    return (
    <div className="Welcome">        
        <LoadingForm visible={props.lottery.loading}/>

        <span style={{fontSize: "12px"}}>You must have a BNB (Binance coin) wallet. We recommend that you use the Metamask wallet. <a href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain" target="_blank" rel="noreferrer"> Instructions here.</a></span>
        {!props.lottery.loading ?
            <div className="container" style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <a href="#" onClick={handleLogin}>
                <div className="card-front">
                    <p className="card-front-text">You were invited to play</p>
                </div>
                </a>
            </div> : <></>}                      
        
    </div>
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
  )(Welcome);
  