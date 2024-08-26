// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DEX {
    AggregatorV3Interface internal priceFeed;
    ERC20 public token;

    event Transaction(
        address indexed sender,
        uint256 ethAmount,
        uint256 tokenAmount,
        uint256 exchangeRate,
        uint256 transactionDate
    );

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
        return uint256(answer);
    }

    function buy() external payable {
        uint256 price = getLatestPrice();
        require(price > 0, "Invalid price");

        uint256 amountToBuy = msg.value * (price / 1e8);
        require(amountToBuy > 0, "You need to send some ether");
        require(amountToBuy <= token.balanceOf(address(this)), "Not enough tokens in the reserve");

        token.transfer(msg.sender, amountToBuy);

        emit Transaction(
            msg.sender,
            msg.value,
            amountToBuy,
            price,
            block.timestamp
        );
    }

    function sell(uint256 amount) external {
        uint256 price = getLatestPrice();
        require(price > 0, "Invalid price");

        uint256 etherAmount = (amount * 1e8) / price;
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(amount > 0, "You need to sell at least some tokens");
        require(allowance >= amount, "Check the token allowance");

        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(etherAmount);

        emit Transaction(
            msg.sender,
            etherAmount,
            amount,
            price,
            block.timestamp
        );
    }
}
