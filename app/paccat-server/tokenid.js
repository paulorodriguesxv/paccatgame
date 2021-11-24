const util = require("util")
const fs = require("fs")
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const sharp = require('sharp')
const xmldom = require('xmldom')

const { isNumeric } = require('./utils.js')
const configs = require('./configs.js')

const pad = (num, size) => {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const getFileName = (numbers) => {

    const baseDir = "./badge/";
    const anumbers = numbers.split("-");

    switch (anumbers.length){
        case 6: return `${baseDir}/06-ticket-template.svg`
        case 7: return `${baseDir}/07-08-ticket-template.svg`
        case 8: return `${baseDir}/07-08-ticket-template.svg`
        case 9: return `${baseDir}/09-10-ticket-template.svg`
        case 10: return `${baseDir}/09-10-ticket-template.svg`
        case 11: return `${baseDir}/11-12-ticket-template.svg`
        case 12: return `${baseDir}/11-12-ticket-template.svg`
        case 13: return `${baseDir}/13-ticket-template.svg`
        case 14: return `${baseDir}/14-ticket-template.svg`
        case 15: return `${baseDir}/15-ticket-template.svg`
    }
    
    throw Error("Invalid survivor number length")
}


const getTokenIdData = async ({req, res, cache, contract}) => {

    const tokenId = req.params.tokenId

    if (!isNumeric(tokenId)) {
        res.sendStatus(404)
        return
    }        

    res.setHeader('Content-Type', 'application/json');

    let value = cache.get(tokenId);
    if (value !== undefined){
        res.json(value)
        return
    }
    
    
    try {
        let numbers = await contract.methods.numbers(tokenId).call()
        numbers = numbers.filter(number => number != "0")
        lottery_numbers = numbers.map(number => pad(number, 2)).join("-")
        
        lottery_numbers_base64 = Buffer.from(lottery_numbers).toString('base64');

        survivor_number = pad(tokenId, 10)

        let result = {
            name: `Player ${survivor_number}`,
            description: "PacCat TOKEN are ERC721 Non-Fungible-Tokens stored inside the Ethereum Blockchain.\n\n" +
                         "Will you be the survivor? \n\n" + 
                         "The game ends on Jun/22. ",
            image: `${configs.baseUri}/token/${tokenId}/svg/${lottery_numbers_base64}`,
            attributes: [
                {
                    "trait_type": "Survivor ID",
                    "value": survivor_number
                },                
                {
                    "trait_type": "Survivor numbers",
                    "value": lottery_numbers
                },
            ]
        }
        cache.set(tokenId, result)
        res.json(result)
    }
    catch(error) {
        console.log(error)
        res.sendStatus(404)
    }
}

const getTokenSvg = async ({req, res, cache, contract}) => {

    const tokenId = req.params.tokenId;
    let survivorNumber = req.params.survivorNumber;
    survivorNumber = new Buffer.from(survivorNumber, 'base64').toString('ascii');

    let filename
    try{
        filename = getFileName(survivorNumber)
        
    } catch (error) {
        res.status(500).send(error.message)
        return
    }
    
    const svgdata = await readFile(filename, 'utf-8')

    let svgTicket = new xmldom.DOMParser().parseFromString(svgdata, 'text/xml');
    
    let survivorNumbers = svgTicket.getElementById('numbers');
    if (!survivorNumbers) {
        res.status(500).send("No survivor numbers in svg")
        return
    }
    survivorNumbers.textContent = survivorNumber

    let tokenIdNumbers = svgTicket.getElementById('tokenid');
    if (!tokenIdNumbers) {
        res.status(500).send("No tokenid in svg")
        return
    }
    tokenIdNumbers.textContent = pad(tokenId, 10)

    const file  = Buffer.from(new xmldom.XMLSerializer().serializeToString(svgTicket))

    try {
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(file)
    }
    catch {
        res.sendStatus(404)
    }
}


module.exports = {
    getTokenIdData,
    getTokenSvg
};