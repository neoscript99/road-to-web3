// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract ExampleExternalContract {
    bool public completed;
    mapping(address => uint256) whitelistBalances;

    function complete() public payable {
        completed = true;
        whitelistBalances[msg.sender] =
            whitelistBalances[msg.sender] +
            msg.value;
    }

    function giveBack() public returns (uint256) {
        uint256 bal = whitelistBalances[msg.sender];
        require(bal > 0, "No more asset in here now.");
        whitelistBalances[msg.sender] = 0;
        (bool sent, bytes memory data) = msg.sender.call{value: bal}("");
        require(sent, "Failed to send Ether");
        return 0;
    }
}
