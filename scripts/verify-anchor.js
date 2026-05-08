const hre = require("hardhat");

async function main() {
  const address = process.env.CONTRACT_ADDRESS;
  const recordId = process.argv[2];
  if (!address) throw new Error("Set CONTRACT_ADDRESS in .env.");
  if (!recordId) throw new Error("Usage: node scripts/verify-anchor.js <record_id_bytes32>");

  const registry = await hre.ethers.getContractAt("OrganicGovernanceRegistry", address);
  const record = await registry.getRecord(recordId);
  console.log({
    record_id: record.record_id,
    subject_reference: record.subject_reference,
    policy_reference: record.policy_reference,
    commitment_hash: record.commitment_hash,
    schema_version: Number(record.schema_version),
    status: Number(record.status),
    timestamp: record.timestamp.toString()
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
