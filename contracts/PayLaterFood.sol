// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayLaterFood {
    struct Order {
        uint256 id;
        address buyer;
        uint256 amount;
        bool isPaid;
    }

    address public owner;
    uint256 public orderCounter;
    mapping(uint256 => Order) public orders;

    event OrderCreated(uint256 id, address buyer, uint256 amount);
    event OrderPaid(uint256 id, address buyer, uint256 amount);

    constructor() {
        owner = msg.sender;
        orderCounter = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function createOrder(uint256 amount) public returns (uint256) {
        orderCounter++;
        orders[orderCounter] = Order(orderCounter, msg.sender, amount, false);
        emit OrderCreated(orderCounter, msg.sender, amount);
        return orderCounter;
    }

    function payOrder(uint256 id) public payable {
        Order storage order = orders[id];
        require(order.buyer == msg.sender, "Only buyer can pay for this order");
        require(!order.isPaid, "Order already paid");
        require(msg.value == order.amount, "Incorrect payment amount");

        order.isPaid = true;
        payable(owner).transfer(msg.value);

        emit OrderPaid(id, msg.sender, msg.value);
    }

    function getOrder(uint256 id) public view returns (Order memory) {
        return orders[id];
    }
}
