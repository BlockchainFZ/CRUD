var MigrationContract = artifacts.require("UserCrud");
const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');


  contract('System Tests', async(accounts) => {

    let contract;
    let owner = accounts[0];
    let account2 = accounts[1];
    let userEmailHex = web3.utils.asciiToHex("kevinkeaveney@hotmail.com");

    beforeEach(async() => {
      contract = await MigrationContract.new({from:owner});
      let userEmailHex = web3.utils.asciiToHex("kevinkeaveney@hotmail.com");

    });

  /*  afterEach(async() => {
      await contract.kill({from:owner});
    });
*/
    it('Allows a user to be added', async() => {
      let userEmailAsc = web3.utils.hexToAscii(userEmailHex);
      await contract.insertUser(owner, userEmailHex, 42);
      let user = await contract.getUser(owner);
      let userEmail = user.userEmail;
      userEmailAsc32 = web3.utils.padRight(userEmail, 16);

      assert.equal(user.userAge.toNumber(), 42, "Incorrect user age");
      assert.equal(user.userEmail,userEmailAsc32, "Incorrect user email");

      let userAddress = await contract.getUserAtIndex(0);
      assert.equal(userAddress, owner, "Incorrect User Address");

      });

      it('Confirms an address has been added', async() =>{
        await contract.insertUser(owner, userEmailHex, 42);
        let ownerBool = await contract.isUser(owner);
        let account2Bool = await contract.isUser(account2);

        assert.equal(ownerBool, true, "User Address has been added");
        assert.equal(account2Bool, false, "User Address has not been added");

      });


      it('Allows a users email address to be updated', async() => {
        let newUserEmailHex = web3.utils.asciiToHex("kevinkeaveney@gmail.com");
        await contract.insertUser(owner, userEmailHex, 42);
        await contract.updateUserEmail(owner, newUserEmailHex);
        let user = await contract.getUser(owner);
        let userOldEmail = web3.utils.toAscii(userEmailHex);
        let userNewEmail = web3.utils.toAscii(user.userEmail);
        //console.log('Old user email address', userOldEmail);
        //console.log('New user email address', userNewEmail);
        assert.notEqual(userOldEmail, userNewEmail, "Email address has not changed");

      });

      it('Allows a users age to be updated', async() => {
        await contract.insertUser(owner, userEmailHex, 42);
        let user = await contract.getUser(owner);
        let userOldAge = user.userAge;
        await contract.updateUserAge(owner, 43);
        user = await contract.getUser(owner);
        let userNewAge = user.userAge;
        //console.log('Users old age', userOldAge.toNumber());
        //console.log('Users new age', userNewAge.toNumber());
        assert.notEqual(userOldAge,userNewAge,"User age has not changed");
      });

  });
