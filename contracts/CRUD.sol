pragma solidity >=0.4.0 <0.7.0;

    contract messageTest {

    struct userStruct {
        bytes32 userEmail;
        uint userAge;
        uint index;
    }

    mapping (address => userStruct) private userStructs;
    address[] private userIndex;

    function insertUser(
        address _userAddress,
        bytes32 _userEmail,
        uint _userAge) public returns(bool success) {

        userStructs[_userAddress].userEmail = _userEmail;
        userStructs[_userAddress].userAge = _userAge;
        userStructs[_userAddress].index = userIndex.push(_userAddress) -1;
        return true;
    }

    function getUser
    (address _userAddress) public view
    returns(bytes32 userEmail, uint userAge) {
        userStructs[_userAddress].userEmail;
        userStructs[_userAddress].userAge;
    }


    function updateUser(address _userAddress, bytes32 _userEmail,uint _userAge)
    public returns (bool success) {
        userStructs[_userAddress].userEmail = _userEmail;
        userStructs[_userAddress].userAge = _userAge;

    }






}





    
