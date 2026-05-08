#!/usr/bin/env node
const fs = require("fs");
const crypto = require("crypto");

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

const rate = Number(arg("rate", "2000"));
const duration = Number(arg("duration", "3600"));
const out = arg("out", "data/raw/generated-workload.csv");
const count = Math.max(1, Math.round((rate / 3600) * duration));

const rows = ["seq,record_id,subject_reference,policy_reference,commitment_hash,schema_version,status"];
for (let i = 0; i < count; i++) {
  const context = JSON.stringify({
    seq: i,
    purpose: "primary-care",
    jurisdiction_from: "PT",
    jurisdiction_to: "ES",
    schema_version: 1
  });
  rows.push([
    i,
    `0x${sha256(`record:${i}`)}`,
    `0x${sha256("did:example:health-professional:pt")}`,
    `0x${sha256("policy:ehds:primary-care:v1")}`,
    `0x${sha256(context)}`,
    1,
    "Approved"
  ].join(","));
}

fs.mkdirSync(require("path").dirname(out), { recursive: true });
fs.writeFileSync(out, rows.join("\n") + "\n");
console.log(`Generated ${count} synthetic workload records at ${out}`);
