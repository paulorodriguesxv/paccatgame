const express = require('express');
const path = require('path');
const cors = require('cors')
const Web3 = require('web3');
const configs = require('./configs.js')
const { getTokenIdData, getTokenSvg } = require("./tokenid.js")
const PacCatToken = require("./contracts/PacCat.json");

const web3 = new Web3(new Web3.providers.HttpProvider(configs.providerUri));
const contract = new web3.eth.Contract(PacCatToken.abi, configs.contractAddress);

const app = express();
app.use(cors())

app.use(express.static(path.join(__dirname, 'public/build')));

const NodeCache = require( "node-cache" );

const cache = new NodeCache({
    stdTTL: 600,
    checkperiod: 0,
    useClones: false,
    
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/build', 'index.html'));
  });

app.get('/token/:tokenId', (req, res) => getTokenIdData({req, res, cache, contract}));
app.get('/token/:tokenId/svg/:survivorNumber', (req, res) => getTokenSvg({req, res, cache, contract}));


app.listen(configs.port, () => {
    console.log(`Application listening on port ${configs.port}!`);
});