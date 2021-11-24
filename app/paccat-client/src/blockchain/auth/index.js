import React from 'react'
import { useState, useContext } from 'react'
import Web3 from 'web3'
import PacCat from "../../contracts/PacCat.json"
import { getNFTImageURI } from "../../services/backend"

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const AuthContext = React.createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [account, setAccount] = useState()
    const [balance, setBalance]  = useState(0)
    const [myPlayers, setMyPlayers] = useState([])

    const [token, setToken] = useState();

    const loadWeb3 = async () => {

        try{
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                await window.ethereum.enable()
                return true;
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider)
                return true
            } else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
                return false
            }
        } catch (err) {
            window.alert('Error on login into your Wallet', err);
            return false
        }
    }

    const geMyPlayersFromBlockchain = async (token, account) =>{

        let balanceOf = await token.methods.balanceOf(account).call()

        const blockchainPlayers = []
        for (let i = 0; i < balanceOf; i++) {
            const id = await token.methods.tokenOfOwnerByIndex(account, i).call()
            const tokenURI = await token.methods.tokenURI(id).call()

            blockchainPlayers.push(tokenURI)
        }

        const imagePlayers = []
         Promise.all(blockchainPlayers.map(async(uri) => {
            const imageURI = await getNFTImageURI(uri)
            
            imagePlayers.push(imageURI)
            })
        ).then(() => {
            setMyPlayers(imagePlayers)})        
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()

        setAccount(accounts[0]);                

        // Load smart contract
        const networkId = await web3.eth.net.getId()
        const networkData = PacCat.networks[networkId]
       
        if(networkData) {
            const abi = PacCat.abi
            const address = networkData.address

            const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether')
            const _token = new web3.eth.Contract(abi, address)           

            setToken(_token)
            setBalance(balance)
        
            await geMyPlayersFromBlockchain(_token, accounts[0]);

        } else {
          alert('Smart contract not deployed to detected network.')
        }
        
      }  

    async function Login() {
        if (await loadWeb3()){
            await loadBlockchainData();
            setIsAuthenticated(true);
        }
    }

    const GetLuck = async (selectedNumbers, amount, events) => {
        const web3 = window.web3
        const numbers = selectedNumbers.map(number => number.id)

        const { onRegistered, onError , onReceipt, onConfirmation } = events
        
        /*
        token.methods.getLuck(account, numbers)
        .estimateGas(
            {
                from: account,
                value: web3.utils.toWei( amount.toString(), "ether") 
            }, function(x, gasAmount) {
                console.log(gasAmount)
            }
        )
        
        */
        token.methods.getLuck(account, numbers)
            .send({from: account, value: web3.utils.toWei( amount.toString(), "ether")} )
            .on('transactionHash', async (hash) => {            
                console.log("Your NFT's was registered")
                await onRegistered(hash)
            })
            .on('receipt', async (receipt) => {
                
                console.log("Your NFT's was minted successfully")

                await onReceipt(receipt)
                await geMyPlayersFromBlockchain(token, account)
            })
            .on('confirmation', async (confirmationNumber, receipt) => {                
                console.log("Confirmation trigged");

                await onConfirmation(confirmationNumber, receipt)
                await geMyPlayersFromBlockchain(token, account)                            
            })
            .on('error', async (err) => {
                onError(err.message)
            })       
            
    }

    return (
        <AuthContext.Provider
            value={{
                isLoged: isAuthenticated,
                account,
                balance,
                myPlayers,
                geMyPlayersFromBlockchain,
                Login,
                GetLuck
            }}
        >
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
  
    return context;
  }