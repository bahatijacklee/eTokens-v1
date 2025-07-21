// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./CustomToken.sol";

contract CustomDex {
    address public owner;

    mapping(string => ERC20) public tokenInstanceMap;
    string[] public tokens;

    uint256 public ethValue = 100000000000000; // 0.0001 ETH = 1 Token

    struct History {
        uint256 historyId;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address userAddress;
    }

    uint256 public _historyIndex;
    mapping(uint256 => History) private historys;

    // Track who has claimed which tokens
    mapping(address => mapping(string => bool)) public hasClaimedFaucet;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createToken(string memory name) public onlyOwner {
        require(address(tokenInstanceMap[name]) == address(0), "Token already exists");

        CustomToken token = new CustomToken(name, name);
        tokenInstanceMap[name] = token;
        tokens.push(name);
    }

    function getAllTokenNames() public view returns (string[] memory) {
        return tokens;
    }


    function faucet(string memory tokenName) public {
        require(address(tokenInstanceMap[tokenName]) != address(0), "Token does not exist");
        require(!hasClaimedFaucet[msg.sender][tokenName], "Already claimed faucet");

        uint256 dripAmount = 10 * 10 ** 18;
        require(tokenInstanceMap[tokenName].balanceOf(address(this)) >= dripAmount, "Not enough faucet tokens");

        hasClaimedFaucet[msg.sender][tokenName] = true;
        tokenInstanceMap[tokenName].transfer(msg.sender, dripAmount);
    }


    function getBalance(string memory tokenName, address _address) public view returns (uint256) {
        return tokenInstanceMap[tokenName].balanceOf(_address);
    }

    function getTotalSupply(string memory tokenName) public view returns (uint256) {
        return tokenInstanceMap[tokenName].totalSupply();
    }

    function getTokenAddress(string memory tokenName) public view returns (address) {
        return address(tokenInstanceMap[tokenName]);
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _transactionHistory(
        string memory tokenA,
        string memory tokenB,
        uint256 inputValue,
        uint256 outputValue
    ) internal {
        _historyIndex++;
        History storage history = historys[_historyIndex];
        history.historyId = _historyIndex;
        history.userAddress = msg.sender;
        history.tokenA = tokenA;
        history.tokenB = tokenB;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
    }

    function swapEthToToken(string memory tokenName) public payable returns (uint256) {
        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue / ethValue) * 10 ** 18;
        require(tokenInstanceMap[tokenName].transfer(msg.sender, outputValue), "Transfer failed");

        _transactionHistory("ETH", tokenName, inputValue, outputValue);
        return outputValue;
    }

    function swapTokenToEth(string memory tokenName, uint256 _amount) public returns (uint256) {
        uint256 ethToBeTransferred = (_amount / 10 ** 18) * ethValue;
        require(address(this).balance >= ethToBeTransferred, "DEX has low balance");

        require(tokenInstanceMap[tokenName].transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        payable(msg.sender).transfer(ethToBeTransferred);

        _transactionHistory(tokenName, "ETH", _amount, ethToBeTransferred);
        return ethToBeTransferred;
    }

    function swapTokenToToken(string memory srcToken, string memory destToken, uint256 _amount) public {
        require(tokenInstanceMap[srcToken].transferFrom(msg.sender, address(this), _amount), "Transfer failed");
        require(tokenInstanceMap[destToken].transfer(msg.sender, _amount), "Transfer failed");

        _transactionHistory(srcToken, destToken, _amount, _amount);
    }

    function getAllHistory() public view returns (History[] memory) {
        History[] memory items = new History[](_historyIndex);
        for (uint256 i = 0; i < _historyIndex; i++) {
            items[i] = historys[i + 1];
        }
        return items;
    }

    receive() external payable {}
}
