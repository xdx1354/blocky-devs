// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DEX {
    AggregatorV3Interface internal priceFeed;

    ERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);
    event DebugValue(string name, uint256 value);

    constructor(address _tokenAddress, address _priceFeedAddress) {
        token = ERC20(_tokenAddress);
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function getLatestPrice() public view returns (uint256) {
        (
            /*uint80 roundID*/,
            int256 answer,
            /*uint256 startedAt*/,
            /*uint256 updatedAt*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        // Chainlink returns the price with 8 decimal places
        return uint256(answer);
    }

    function buy() external payable {
        uint256 price = getLatestPrice();
        require(price > 0, "Invalid price");

        // Debugging values
        emit DebugValue("msg.value", msg.value);
        emit DebugValue("price", price);

        // Calculate how many tokens you can buy
        uint256 amountToBuy = msg.value * (price / 1e8);

        // Debugging calculated amount
        emit DebugValue("amountToBuy", amountToBuy);

        uint256 dexBalance = token.balanceOf(address(this));
        require(amountToBuy > 0, "You need to send some ether");
        require(amountToBuy <= dexBalance, "Not enough tokens in the reserve");

        token.transfer(msg.sender, amountToBuy);
        emit Bought(amountToBuy);
    }

    function sell(uint256 amount) external {
        uint256 price = getLatestPrice();
        require(price > 0, "Invalid price");

        // Calculate how much ether to return
        uint256 etherAmount = (amount * 1e8) / price; // Assuming price has 8 decimals

        uint256 allowance = token.allowance(msg.sender, address(this));
        require(amount > 0, "You need to sell at least some tokens");
        require(allowance >= amount, "Check the token allowance");

        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(etherAmount);
        emit Sold(amount);
    }
}
