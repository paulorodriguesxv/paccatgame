# PACCAT PROJECT

## PacCat Game Project

This project is simple tutorial demonstrating how to use Smart Contracts and React/Nodejs to create a game based on Squid Game Series.

### Basically, the rules are:

1 - User should select from six to fifteen numbers

2 - Click on play and pay for it. The amount is variable, depending on numbers that has been choseen

3 - 10% of value paid will be sent to specific wallet for a maintance tax (chosen by the contract owner before migration process) and the others 90& will be stored at the smart contract

4 - At the end of the game, the user (owner of the smart contract) should call withDrawAll contract method to send all contract value to the winner wallet.
  

### Main techonologies used here:
 - Solidity program language to Smart Contracts
 - OpenZeppelin for standardizing the smart contracts
 - ReactJs for frontend: react-redux, duck patterns (reduxsauce), react-router (routers), seamless-immutable, web3, Use of Context/Provider
 - Express for backend

### Instructions:

1 - Contract
* Adjust the contract address that will receive 10% tax
* Configure truffle-config.js with corrects networks
* Install Ganache
* Install OpenZeppelin contracts
* Install truffle
* Make sure to update ebi (build/contracts) into app project every time you run the truffle migration

2 - PacCat client APP
* Run npm build to create reactjs static files and copy generated files to paccat-server public directory or for your cdn
  
3 - PacCat server APP
* Make sure of configure the folliwng environments variables:
  - NODE_ENV=development | production
  - PORT=8080
  - BASE_URI=http://localhost:8080
  - CONTRACT_ADDRESS=0xc0ff0716097C3bcb2dB2bd93bBB41d8DF73614a7
  - INFURA_TOKEN=
  - #NETWORK=rinkeby
  - NETWORK=HTTP://localhost:7545



## Contributing
 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D3


## Credits
 
Lead Developer - Paulo Rodrigues (@paulorodriguesxv)

## License
 
The MIT License (MIT)

Copyright (c) 2021 Paulo Rodrigues

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.