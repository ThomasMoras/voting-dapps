// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Voting contract
/// @author @Thomas
/// @notice This contract is a simple voting system
/// @dev This contract is for educational purposes only
/// @custom:experimental This is an experimental contract.
contract Voting is Ownable {
    /// @notice Winning proposal ID 
    uint public winningProposalID;

    /// @notice Maximum number of proposals
    uint public constant MAX_PROPOSALS = 100;

    /// @notice Maximum number of proposals per voter
    uint public constant MAX_PROPOSALS_PER_VOTER = 3;

    /// @notice Voter structure
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
        uint proposalCount;
    }

    /// @notice Proposal structure
    struct Proposal {
        string description;
        uint voteCount;
        address author;
    }

    /// @notice Workflow status enum
    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    /// @notice Workflow status
    WorkflowStatus public workflowStatus;

    /// @notice Proposals array
    Proposal[] proposalsArray;

    /// @notice Voters mapping
    mapping(address => Voter) voters;

    /// @notice Event for voter registration
    event VoterRegistered(address voterAddress);

    /// @notice Event for workflow status change
    event WorkflowStatusChange(
        WorkflowStatus previousStatus,
        WorkflowStatus newStatus
    );

    /// @notice Event for proposal registration
    event ProposalRegistered(uint proposalId);

    /// @notice Event for vote
    event Voted(address voter, uint proposalId);

    /// @notice Event for maximum proposals reached for a user
    event MaxProposalsReachedForUser(address voter);

    /// @notice Constructor
    constructor() Ownable(msg.sender) {}

    /// @notice Modifier to check if the sender is a voter
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }

    // ::::::::::::: GETTERS ::::::::::::: //

    /// @notice Getter for a voter
    /// @param _addr The address of the voter
    /// @return The voter
    function getVoter(address _addr) external view onlyVoters returns (Voter memory) {
        return voters[_addr];
    }

    /// @notice Getter for a proposal
    /// @param _id The ID of the proposal
    /// @return The proposal
    function getOneProposal(uint _id) external view onlyVoters returns (Proposal memory) {
        return proposalsArray[_id];
    }

    // ::::::::::::: REGISTRATION ::::::::::::: //

    /// @notice Add a voter
    /// @param _addr The address of the voter
    function addVoter(address _addr) external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Voters registration is not open yet"
        );
        require(voters[_addr].isRegistered != true, "Already registered");
        require(_addr != address(0), "Cannot register zero address");

        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }

    // ::::::::::::: PROPOSAL ::::::::::::: //

    /// @notice Add a proposal
    /// @param _desc The description of the proposal
    function addProposal(string calldata _desc) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Proposals are not allowed yet"
        );
        require(
            keccak256(abi.encode(_desc)) != keccak256(abi.encode("")),
            "Vous ne pouvez pas ne rien proposer"
        );
        require(bytes(_desc).length <= 1000, "Description too long"); // Nouvelle limitation
        require(
            proposalsArray.length < MAX_PROPOSALS,
            "Maximum number of proposals reached"
        );
        require(
            voters[msg.sender].proposalCount < MAX_PROPOSALS_PER_VOTER,
            "You have reached your maximum number of proposals"
        );

        Proposal memory proposal;
        proposal.description = _desc;
        proposal.author = msg.sender;
        proposalsArray.push(proposal);

        voters[msg.sender].proposalCount++;

        // Event si l'utilisateur à atteint son quota de proposition
        if (voters[msg.sender].proposalCount == MAX_PROPOSALS_PER_VOTER) {
            emit MaxProposalsReachedForUser(msg.sender);
        }

        emit ProposalRegistered(proposalsArray.length - 1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /// @notice Set a vote
    /// @param _id The ID of the proposal
    function setVote(uint _id) external onlyVoters {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        require(voters[msg.sender].hasVoted != true, "You have already voted");
        require(_id < proposalsArray.length, "Proposal not found"); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /// @notice Start the proposals registering
    function startProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.RegisteringVoters,
            "Registering proposals cant be started now"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;

        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);

        emit WorkflowStatusChange(
            WorkflowStatus.RegisteringVoters,
            WorkflowStatus.ProposalsRegistrationStarted
        );
    }

    /// @notice End the proposals registering
    function endProposalsRegistering() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationStarted,
            "Registering proposals havent started yet"
        );
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationStarted,
            WorkflowStatus.ProposalsRegistrationEnded
        );
    }

    /// @notice Start the voting session
    function startVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.ProposalsRegistrationEnded,
            "Registering proposals phase is not finished"
        );
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(
            WorkflowStatus.ProposalsRegistrationEnded,
            WorkflowStatus.VotingSessionStarted
        );
    }

    /// @notice End the voting session
    function endVotingSession() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionStarted,
            "Voting session havent started yet"
        );
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionStarted,
            WorkflowStatus.VotingSessionEnded
        );
    }

    /// @notice Tally the votes, count the votes and set the winning proposal ID
    /// @dev This function is only callable by the owner, only one time, after the workflow status change to VotesTallied
    function tallyVotes() external onlyOwner {
        require(
            workflowStatus == WorkflowStatus.VotingSessionEnded,
            "Current status is not voting session ended"
        );
        uint _winningProposalId;
        for (uint256 p = 0; p < proposalsArray.length; p++) {
            if (
                proposalsArray[p].voteCount >
                proposalsArray[_winningProposalId].voteCount
            ) {
                _winningProposalId = p;
            }
        }
        winningProposalID = _winningProposalId;

        workflowStatus = WorkflowStatus.VotesTallied;
        emit WorkflowStatusChange(
            WorkflowStatus.VotingSessionEnded,
            WorkflowStatus.VotesTallied
        );
    }
}
