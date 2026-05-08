# Reproducibility protocol

## Objective

Reproduce the anchor-only PoC evaluation described in the paper. The reproducibility package covers only the ledger anchoring layer and synthetic off-chain workload generation.

## Environment

- Hyperledger Besu v23.10.x or compatible.
- 8 validator nodes using IBFT 2.0.
- Berlin hard fork enabled from block 0.
- Homogeneous validator resources: 8 vCPUs and 16 GB RAM per node, as described in the paper.
- Node.js 20 LTS or compatible.

## Steps

1. Start the Besu consortium using `besu/config/genesis.json`, `besu/config/config.toml`, and the node-specific key material.
2. Install Node.js dependencies with `npm install`.
3. Compile the Solidity contract with `npm run compile`.
4. Deploy `OrganicGovernanceRegistry.sol` with `npm run deploy:besu`.
5. Set `CONTRACT_ADDRESS` in `.env`.
6. Run `npm run estimate:gas` to reproduce the anchoring gas estimate.
7. Generate synthetic workload with `npm run workload`.
8. Compare generated results with the files under `data/raw/`.

## Privacy note

This repository intentionally excludes real health data, identifiers, credentials, patient records, and operational secrets. All benchmark input data is synthetic or hash-only.
