# EHDS-MRG Anchor-Only PoC

Public reproducibility repository for the paper **Decoupling Governance from Consensus: An Anchor-Only Architecture for EHDS Based on eIDAS 2.0**.

This repository contains the complete smart contract `OrganicGovernanceRegistry.sol`, ABI, deployment scripts, workload generator, raw benchmark data, and Hyperledger Besu configuration required to reproduce the anchor-only PoC evaluation.

## Repository layout

```text
anchor-only-poc/
├── contracts/                 # Solidity source code
│   └── OrganicGovernanceRegistry.sol
├── abi/                       # Contract ABI used by deployment/workload scripts
│   └── OrganicGovernanceRegistry.abi.json
├── scripts/                   # Deployment and verification helpers
│   ├── deploy.js
│   ├── estimate-gas.js
│   └── verify-anchor.js
├── workload/                  # Synthetic workload generator
│   ├── generate-workload.js
│   └── sample-payloads.json
├── data/
│   └── raw/                   # Raw benchmark results reported in the paper
│       ├── gas-benchmark.csv
│       ├── did-resolution-latency.csv
│       ├── crypto-verification-latency.csv
│       └── storage-footprint.csv
├── besu/
│   ├── config/                # Besu node configuration
│   │   ├── config.toml
│   │   └── genesis.json
│   └── network/
│       └── static-nodes.json
├── docs/
│   ├── reproducibility.md
│   └── benchmark-schema.md
├── hardhat.config.js
├── package.json
├── .env.example
├── .gitignore
└── LICENSE
```

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with the RPC endpoint and private key for the Besu account authorized to deploy contracts.

### 3. Compile contract

```bash
npx hardhat compile
```

### 4. Deploy contract

```bash
npx hardhat run scripts/deploy.js --network besu
```

### 5. Estimate gas for one anchoring transaction

```bash
npx hardhat run scripts/estimate-gas.js --network besu
```

### 6. Generate synthetic workload

```bash
node workload/generate-workload.js --rate 2000 --duration 3600 --out data/raw/generated-workload.csv
```

## Reproducibility scope

The PoC evaluates the anchor-only ledger layer. No Protected Health Information (PHI) or Personally Identifiable Information (PII) is generated or stored. Workload records contain synthetic hashes, deterministic identifiers, and timing measurements only.

## Expected metrics

The benchmark files provide the raw measurements used to support the paper claims:

- constant anchoring transaction cost around `64,960` gas;
- fixed on-chain record footprint of `160` bytes;
- off-chain Ed25519 verification around `2.5 ms`;
- on-chain Ed25519 verification baseline around `2,500 ms`;
- DID resolution latency below `100 ms` at `2,000 requests/hour` in the PoC setting.

## Citation

If this repository is used, cite the associated paper and reference this repository:

```bibtex
@misc{ehds_mrg_anchor_only_poc,
  title  = {EHDS-MRG Anchor-Only PoC Reproducibility Repository},
  author = {Evaristo Correa, Elder Bruno and Ferreira, Joao C. A. and Abelem, Antonio J. G.},
  year   = {2025},
  url    = {https://github.com/ehds-mrg/anchor-only-poc}
}
```
