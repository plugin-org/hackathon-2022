// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;


// Contract
contract SimpleStorage {

  //Variables
  string[] sites;
  string[] usernames;
  string[] passwords;

  /*
  We use this to ensure that all transactions are only performed by the authorized user.

  We check the validity using 
  require(
            msg.sender == user_adress,
            "Only the authorizer of the contract can add a password."
        );

    in all functions that alter the variables after the contract has been created.
  */
  address user_adress;

  // When a new contract is created
  constructor() public {
    user_adress = msg.sender;
    sites = new string[](0);
    usernames = new string[](0);
    passwords = new string[](0);
  }
  
  /*
  Code to check if two strings are equivalent.
  We do this by splitting them up and then checking if all of the individual characters match each other.
  */
  function compareStrings(string memory a, string memory b) private returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }
  

  // Used to store a new uername password pair in the contract
  function addPassword(string sitename, string username, string password) public {
      require(
            msg.sender == user_adress,
            "Only the authorizer of the contract can add a password."
        );
      passwords.push(password);
      usernames.push(username);
      sites.push(sitename);
  }

  // Get a saved password for an individual site
  function getFromSite(string site) public view returns (string details) {
    require(
        msg.sender == user_adress,
            "Only the authorizer of the contract can request access to a password."
    );
    for (uint i = 0; i < sites.length; i++) {
         if (compareStrings(site, sites[i])) {
           return string(abi.encodePacked("Site name: ", site, " Username: ", usernames[i], " Password: ", passwords[i]));
         }
    }
  }

  // Get a list of all passwords saved
  function getAllPasswords() public view returns (string details) {
    details = "";
    require(
        msg.sender == user_adress,
            "Only the authorizer of the contract can request access to a password."
    );
    for (uint i = 0; i < sites.length; i++) {
         details = string(abi.encodePacked(details, "Site name: ", sites[i], " Username: ", usernames[i], " Password: ", passwords[i]));
         details = string(abi.encodePacked(details, " ; "));
    }
    return details;
  }
}
