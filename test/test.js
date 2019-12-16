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
      await contract.insertUser(owner, "Kevin",42);
    })

  });
