require('dotenv').config({  
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
  })

const env = process.env.NODE_ENV
const infuraToken = process.env.INFURA_TOKEN
const network = process.env.NETWORK || "rinkeby"

let providerUri = network

if (env === "production"){
    providerUri = `https://${network}.infura.io/v3/${infuraToken}`
}

const configs = {    
    env: env,
    port: process.env.PORT || 8080,
    baseUri: process.env.BASE_URI || "http://localhost:8080",
    contractAddress: process.env.CONTRACT_ADDRESS,
    providerUri: providerUri
}

module.exports = configs