// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract USDC is ERC20, ERC20Permit {

    // Konstruktor kontraktu ERC20, ERC20Permit, i Ownable
    constructor(address inititialOwner) ERC20("USDC for DEX", "USDC") ERC20Permit("USDC") {
    }

    // Funkcja mint do mintowania tokenów, dostępna tylko dla właściciela
    function mint(address to) external  {
        _mint(to, 999999999999999999999999999);
    }

}
