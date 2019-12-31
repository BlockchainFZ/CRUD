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
      await contract.insertUser(owner, userEmailHex, 42);
      let tx = await contract.updateUserEmail(owner,userEmailHex);
      truffleAssert.eventEmitted(tx,'LogUpdateUser',(event) => {
        let userEmail = event.userEmail;
        userEmailAsc32 = web3.utils.padRight(userEmail, 16);
        return(event.userEmail == userEmailAsc32);
      });
    });

    it('Emmits LogUpdateUser event when updateUserAge is called', async() => {
      await contract.insertUser(owner, userEmailHex, 42);
      let tx = await contract.updateUserAge(owner,53);

      truffleAssert.eventEmitted(tx,'LogUpdateUser',(event) => {
        return(event.userAge == 53);
      });
    });



});
