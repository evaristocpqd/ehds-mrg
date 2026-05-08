const hre = require("hardhat");
const crypto = require("crypto");

function b32(label) {
  return "0x" + crypto.createHash("sha256").update(label).digest("hex");
}

async function main() {
  const address = process.env.CONTRACT_ADDRESS;
  if (!address) {
    throw new Error("Set CONTRACT_ADDRESS in .env before running gas estimation.");
  }

  const registry = await hre.ethers.getContractAt("OrganicGovernanceRegistry", address);
  const args = [
    b32(`record:${Date.now()}`),
    b32("did:example:health-professional:pt"),
    b32("policy:ehds:primary-care:v1"),
    b32("canonicalized-governance-decision-context"),
    1,
    1
  ];

  const gas = await registry.anchorGovernanceDecision.estimateGas(...args);
  console.log(`Estimated gas: ${gas.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
