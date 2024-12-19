const hre = require("hardhat");

async function main() {
  const PayLaterFood = await hre.ethers.getContractFactory("PayLaterFood");
  const payLaterFood = await PayLaterFood.deploy();

  await payLaterFood.deployed();

  console.log("PayLaterFood deployed to:", payLaterFood.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
