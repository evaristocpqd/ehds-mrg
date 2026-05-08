const hre = require("hardhat");

async function main() {
  const Registry = await hre.ethers.getContractFactory("OrganicGovernanceRegistry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();
  const address = await registry.getAddress();
  console.log(`OrganicGovernanceRegistry deployed at: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
