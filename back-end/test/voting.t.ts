import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { Voting } from "../typechain-types";

describe("Voting contract", function () {
  const DEFAULT_PROPOSAL: string = "Proposal 1";
  const DEFAULT_PROPOSAL_ID: number = 1;
  let owner: SignerWithAddress,
    voter1: SignerWithAddress,
    voter2: SignerWithAddress,
    voter3: SignerWithAddress;
  let voting: Voting;

  enum WorkflowStatus {
    RegisteringVoters,
    ProposalsRegistrationStarted,
    ProposalsRegistrationEnded,
    VotingSessionStarted,
    VotingSessionEnded,
    VotesTallied,
  }

  before(async function () {
    [owner, voter1, voter2, voter3] = await ethers.getSigners();
  });

  beforeEach(async function () {
    const VotingFactory = await ethers.getContractFactory("Voting");
    voting = (await VotingFactory.deploy()) as Voting;
  });

  async function _setVotingInGivenStatus(ws: WorkflowStatus): Promise<void> {
    if (ws >= WorkflowStatus.ProposalsRegistrationStarted) {
      await _setVotingToStartProposal();
    }
    if (ws >= WorkflowStatus.ProposalsRegistrationEnded) {
      await _setVotingFromStartProposalToEndProposal();
    }
    if (ws >= WorkflowStatus.VotingSessionStarted) {
      await _setVotingFromStartVotingToEndVoting();
    }
  }

  // Helper functions
  async function _setVotingToStartProposal(): Promise<void> {
    await voting.addVoter(voter1.address);
    await voting.startProposalsRegistering();
  }

  async function _setVotingFromStartProposalToEndProposal(): Promise<void> {
    await voting.connect(voter1).addProposal(DEFAULT_PROPOSAL);
    await voting.endProposalsRegistering();
  }

  async function _setVotingFromStartVotingToEndVoting(): Promise<void> {
    await voting.connect(voter1).setVote(DEFAULT_PROPOSAL_ID);
    await voting.endVotingSession();
  }

  // Test sections remain largely the same, just add types where needed
  describe("getOneProposal(uint proposalId)", function () {
    beforeEach(async function () {
      await _setVotingInGivenStatus(WorkflowStatus.ProposalsRegistrationEnded);
    });

    it("Should get an existing proposal", async function () {
      const proposal = await voting
        .connect(voter1)
        .getOneProposal(DEFAULT_PROPOSAL_ID);
      expect(proposal.description).to.equal(DEFAULT_PROPOSAL);
    });

    // ... rest of the tests
  });

  // ... rest of the test sections remain the same structure
  // Just ensure proper typing when dealing with variables and function parameters
});
