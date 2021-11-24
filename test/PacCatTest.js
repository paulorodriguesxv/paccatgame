const PacCatToken = artifacts.require('./contratcs/PacCat.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('PacCat Token', (accounts) => {
  let token
  
  describe('deployment', async () => {
    it('deploys successfully', async () => {
      token = await PacCatToken.deployed()
      const address = token.address

      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
        const name = await token.name()
        assert.equal(name, 'PacCat')
    })
  
    it('has a symbol', async () => {
      const symbol = await token.symbol()
      assert.equal(symbol, 'PacCat')
    })          
  })      

  describe('token distribution', async () => {
    let result

    it('mints tokens', async () => {

      await token.getLuck(accounts[0], [1,2,3,4,5,6], {value: web3.utils.toWei("0.005", "ether")});

      // It should increase the total supply
      result = await token.totalSupply()
      assert.equal(result.toString(), '1', 'total supply is correct')    
    })          

    it('number validations (Min)', async () => {

      try{
        await token.getLuck(accounts[0], [1,2,3,4,5], {value: web3.utils.toWei("0.005", "ether")});
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "It is allowed 6 numbers min", "The error message should contain 'It is allowed 6 numbers min'");
      }    
    })   

    it('number validations (Max)', async () => {

      try{
        await token.getLuck(accounts[0], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,61], {value: web3.utils.toWei("0.005", "ether")});
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "It is allowed 15 numbers max", "The error message should contain 'It is allowed 15 numbers max'");
      }    
    })   

    /*
    it('number validations (Exactly 15)', async () => {
        await token.getLuck(accounts[0], [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], {value: web3.utils.toWei("20", "ether")});

        tokenId = await token.totalSupply() - 1;
        numbers = await token.numbers(tokenId);

        assert.equal(numbers.length, 15);
        assert.equal(numbers[0], 1);
        assert.equal(numbers[14], 15);
    })         
    */

    it('fail on pay less than necessary', async () => {

      try {
        await token.getLuck(accounts[0], [1,2,3,4,5,6], {value: web3.utils.toWei("0.0049", "ether")});
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "Not enough ETH sent", "The error message should contain 'Not enough ETH sent'");
      }

    }) 
    
    it('fail on pay less than necessary for seven numbers', async () => {

      try {
        await token.getLuck(accounts[0], [1,2,3,4,5,6,7], {value: web3.utils.toWei("0.005", "ether")});
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "Not enough ETH sent; 20000000000000000.", "The error message should contain 'Not enough ETH sent; 20000000000000000'");
      }      
    })     
  })

  describe('finance integrity', async () => {
    it('contract balance', async () => {

      await token.getLuck(accounts[0], [1,2,3,4,5,6], {value: web3.utils.toWei("0.2", "ether")});

      actualBalance = await web3.eth.getBalance(token.address);
      expectedBalance = 184500000000000000; 
      
      assert.equal(actualBalance, expectedBalance, "Balance incorrect!");

    })   

    it('royality balance', async () => {

      royalityAccount = accounts[2];

      royalityBalance = parseInt(await web3.eth.getBalance(royalityAccount));
              
      expectedBalance = royalityBalance + parseInt(web3.utils.toWei("0.2", "ether") / 10); 

      await token.getLuck(accounts[0], [1,2,3,4,5,6], {value: web3.utils.toWei("0.2", "ether")});

      actualBalance = parseInt(await web3.eth.getBalance(royalityAccount));

      assert.equal(actualBalance, expectedBalance, "Balance incorrect!");

    })         


    it('withdraw balance', async () => {
      
      receiverAccount = accounts[3];

      contractBalance = parseInt(await web3.eth.getBalance(token.address));
      receiverBalance = parseInt(await web3.eth.getBalance(receiverAccount));
      
      expectedBalance = parseInt((receiverBalance + ((contractBalance / 100) * 95)) / 10000000); 

      await token.withDrawAll(receiverAccount);       

      actualBalance = parseInt(parseInt(await web3.eth.getBalance(receiverAccount)) / 10000000);

      assert.equal(actualBalance, expectedBalance, "Balance incorrect!");
    })      
  })
  
  describe('Bet routines', async () => {
    it('numbers to bitmap', async () => {

      await token.getLuck(accounts[0], [5,1,40,4,3,6], {value: web3.utils.toWei("0.005", "ether")});
      
      tokenId = await token.totalSupply() - 1;
      numbers = await token.numbers(tokenId);
      
      assert.equal(numbers[0], 1);
      assert.equal(numbers[1], 3);
      assert.equal(numbers[2], 4);
      assert.equal(numbers[3], 5);
      assert.equal(numbers[4], 6);
      assert.equal(numbers[5], 40);
      
    })

    it('ensure unique numbers', async () => {

      try{
        await token.getLuck(accounts[0], [6,1,40,4,3,6], {value: web3.utils.toWei("0.005", "ether")});
      
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "Duplicated numbers", "The error message should contain 'Duplicated numbers'");
      }     
    }) 
    
    it('ensure numbers range', async () => {

      try{
        await token.getLuck(accounts[0], [6,1,40,90,3,6], {value: web3.utils.toWei("0.005", "ether")});
      
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "Number has to be equal or less than 60", "The error message should contain 'Number has to be equal or less than 60'");
      }   
      
      try{
        await token.getLuck(accounts[0], [6,1,40,0,3,6], {value: web3.utils.toWei("0.005", "ether")});
      
        assert.fail("The transaction should have thrown an error");
      }
      catch (err) {
          assert.include(err.message, "Number has to be equal or greater than 1", "The error message should contain 'Number has to be equal or greater than 1'");
      }         
    })     
  })
})
