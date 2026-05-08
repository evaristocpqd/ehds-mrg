# Benchmark data schema

## `gas-benchmark.csv`

| Column | Description |
|---|---|
| `run` | Benchmark run identifier. |
| `network` | Besu network profile. |
| `nodes` | Number of Besu nodes. |
| `consensus` | Consensus protocol. |
| `contract` | Contract under test. |
| `function` | Contract function called. |
| `gas_used` | Gas consumed or estimated. |
| `notes` | Run notes. |

## `did-resolution-latency.csv`

| Column | Description |
|---|---|
| `rate_requests_per_hour` | Synthetic request rate. |
| `p50_ms`, `p95_ms`, `p99_ms`, `max_ms` | Latency distribution values in milliseconds. |
| `notes` | Run notes. |

## `crypto-verification-latency.csv`

| Column | Description |
|---|---|
| `mode` | `on-chain` baseline or `off-chain` agent-layer mode. |
| `operation` | Verification operation. |
| `mean_ms` | Mean latency in milliseconds. |
| `stddev_ms` | Standard deviation in milliseconds. |

## `storage-footprint.csv`

| Column | Description |
|---|---|
| `architecture` | Evaluated architecture or component. |
| `on_chain_payload_bytes` | Baseline payload size when applicable. |
| `record_bytes` | Stored record size when applicable. |
| `reduction_percent` | Reduction relative to baseline. |
