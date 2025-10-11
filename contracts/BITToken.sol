// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BITToken is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000_000_000 * 10**18; // 100 Billion tokens
    
    constructor() ERC20("BIT Access", "BIT") Ownable(msg.sender) {
        _mint(msg.sender, MAX_SUPPLY);
    }
    
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
