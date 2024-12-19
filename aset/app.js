let web3;
let account;
let contract;
let totalAmount = 0;

// ABI dan contract address (ganti dengan yang sesuai setelah deploy)
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "PaymentMade",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "PurchaseMade",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "balances",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "creditLimit",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "makePurchase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "makePayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      },
      {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
];
const contractAddress = "0x31b22F16CC4Bb0C25Efbc87C6EDc7ED9F8c6eE2d"; // Ganti dengan alamat kontrak

// Event listener untuk koneksi ke MetaMask
window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            account = (await web3.eth.getAccounts())[0];
            document.getElementById('account').innerText = `Connected: ${account}`;
        } catch (error) {
            console.log("User denied account access");
        }
    } else {
        alert("Please install MetaMask!");
    }

    contract = new web3.eth.Contract(abi, contractAddress);
});

// Fungsi untuk menangani pemilihan makanan
const foodButtons = document.querySelectorAll('.order-button');
foodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.parentElement;
        const price = parseFloat(menuItem.getAttribute('data-price'));

        totalAmount += price;
        document.getElementById('totalPrice').innerText = totalAmount.toFixed(2);
        document.getElementById('makePurchaseButton').disabled = false;
    });
});

// Fungsi untuk melakukan pembelian
document.getElementById('makePurchaseButton').onclick = async () => {
    if (totalAmount > 0) {
        const amountInEther = web3.utils.toWei(totalAmount.toString(), 'ether');
        try {
            await contract.methods.makePurchase(totalAmount).send({ from: account });
            alert('Purchase Successful!');
            totalAmount = 0;
            document.getElementById('totalPrice').innerText = '0';
            document.getElementById('makePurchaseButton').disabled = true;
        } catch (error) {
            console.log(error);
            alert('Transaction failed. Please try again.');
        }
    } else {
        alert('Please select food items to purchase.');
    }
};
