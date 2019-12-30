var MigrationContract = artifacts.require("UserCrud");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

  contract('Truffle Event Tests', async (accounts) => {
    let contract;
    let owner = accounts[0];
    let account2 = accounts[1];
    let userEmailHex = web3.utils.asciiToHex("kevinkeaveney@hotmail.com");


    beforeEach(async() => {
      contract = await MigrationContract.new({ from:owner});

    });

    it('Emmits LogNewUser event when insertUser is called ', async() => {
      let tx = await contract.insertUser(owner, userEmailHex, 42);
      truffleAssert.eventEmitted(tx,'LogNewUser',(event) => {
        return(event.userAddress == owner && event.userAge == 42);
      });
    });


    it('Emmits LogUpdateUser event when updateUserEmail is called', async() => {

    });



});
