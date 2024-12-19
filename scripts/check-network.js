const { ethers } = require("hardhat");

async function main() {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const network = await provider.getNetwork();

  // Tambahkan nama jaringan secara manual
  const networkName = network.name === 'homestead' ? 'Mainnet' : 'Localhost';

  console.log("Connected to network:", networkName);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

