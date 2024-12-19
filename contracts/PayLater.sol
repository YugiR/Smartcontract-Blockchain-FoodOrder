// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayLater {
    address public owner;
    uint256 public creditLimit = 1000; // Credit Limit for PayLater
    mapping(address => uint256) public balances;

    event PurchaseMade(address indexed user, uint256 amount);
    event PaymentMade(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    // Fungsi untuk membeli dengan PayLater
    function makePurchase(uint256 amount) public {
        require(amount <= creditLimit, "Amount exceeds credit limit");
        balances[msg.sender] += amount;
        emit PurchaseMade(msg.sender, amount);
    }

    // Fungsi untuk melakukan pembayaran
    function makePayment(uint256 amount) public payable {
        require(balances[msg.sender] >= amount, "Payment exceeds balance");
        require(msg.value == amount, "Sent value doesn't match payment");

        balances[msg.sender] -= amount;
        payable(owner).transfer(msg.value);
        emit PaymentMade(msg.sender, amount);
    }

    // Fungsi untuk memeriksa saldo yang terhutang
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
