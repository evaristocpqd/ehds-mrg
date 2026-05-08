// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title OrganicGovernanceRegistry
/// @notice Anchor-only registry for deterministic off-chain governance decisions.
/// @dev The contract stores fixed-size cryptographic commitments only. It does not
///      execute ABAC, DID, VC, OIDC4VP, or GDPR policy logic on-chain.
contract OrganicGovernanceRegistry {
    enum DecisionStatus {
        Undefined,
        Approved,
        Denied,
        Revoked
    }

    struct GovernanceRecord {
        bytes32 record_id;
        bytes32 subject_reference;
        bytes32 policy_reference;
        bytes32 commitment_hash;
        uint8 schema_version;
        DecisionStatus status;
        uint256 timestamp;
    }

    address public owner;
    mapping(address => bool) public authorizedAgents;
    mapping(bytes32 => GovernanceRecord) private records;
    mapping(bytes32 => bool) public recordExists;

    event AgentAuthorized(address indexed agent, bool authorized);
    event GovernanceAnchored(
        bytes32 indexed record_id,
        bytes32 indexed subject_reference,
        bytes32 indexed policy_reference,
        bytes32 commitment_hash,
        uint8 schema_version,
        DecisionStatus status,
        uint256 timestamp,
        address anchored_by
    );

    error NotOwner();
    error NotAuthorizedAgent();
    error DuplicateRecord(bytes32 record_id);
    error InvalidRecordId();
    error InvalidCommitment();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    modifier onlyAuthorizedAgent() {
        if (!authorizedAgents[msg.sender]) revert NotAuthorizedAgent();
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedAgents[msg.sender] = true;
        emit AgentAuthorized(msg.sender, true);
    }

    function setAuthorizedAgent(address agent, bool authorized) external onlyOwner {
        authorizedAgents[agent] = authorized;
        emit AgentAuthorized(agent, authorized);
    }

    function anchorGovernanceDecision(
        bytes32 record_id,
        bytes32 subject_reference,
        bytes32 policy_reference,
        bytes32 commitment_hash,
        uint8 schema_version,
        DecisionStatus status
    ) external onlyAuthorizedAgent {
        if (record_id == bytes32(0)) revert InvalidRecordId();
        if (commitment_hash == bytes32(0)) revert InvalidCommitment();
        if (recordExists[record_id]) revert DuplicateRecord(record_id);

        GovernanceRecord memory record = GovernanceRecord({
            record_id: record_id,
            subject_reference: subject_reference,
            policy_reference: policy_reference,
            commitment_hash: commitment_hash,
            schema_version: schema_version,
            status: status,
            timestamp: block.timestamp
        });

        records[record_id] = record;
        recordExists[record_id] = true;

        emit GovernanceAnchored(
            record_id,
            subject_reference,
            policy_reference,
            commitment_hash,
            schema_version,
            status,
            block.timestamp,
            msg.sender
        );
    }

    function getRecord(bytes32 record_id) external view returns (GovernanceRecord memory) {
        return records[record_id];
    }
}
