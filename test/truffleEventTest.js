var MigrationContract = artifacts.require("UserCrud");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');

  contract('Truffle Event Tests', async (accounts) => {
    let contract;
    let owner = accounts[0];
    let account2 = accounts[1];


    beforeEach(async() => {
      contract = await MigrationContract.new({ from:owner});

    });



});
