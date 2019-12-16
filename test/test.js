var MigrationContract = artifacts.require("UserCrud");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');


  contract('System Tests', async(accounts) => {

    let contract;
    let owner = accounts[0];

    beforeEach(async() => {
      contract = await MigrationContract.new({from:owner});

    });

  /*  afterEach(async() => {
      await contract.kill({from:owner});
    });
*/
    it('Allows a user to be added', async() => {
      let userEmailHex = web3.utils.asciiToHex("kevinkeaveney@hotmail.com");
      let userEmailAsc = web3.utils.hexToAscii(userEmailHex);
      let userEmailAsc32 = web3.utils.padLeft(userEmailHex, 48);
      await contract.insertUser(owner, userEmailHex, 42);
      let user = await contract.getUser(owner);
      let userEmail = user.userEmail;
      userEmailAsc32 = web3.utils.padRight(userEmail, 16);
      console.log(userEmailHex);
      console.log(userEmail);
      console.log(userEmailAsc32);
      assert.equal(user.userAge.toNumber(), 42, "Incorrect user age");
      //assert.equal(user.userEmail,userEmailHex, "Incorrect user email");


    })

  });
