import React, { useEffect, useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import AdminPanel from "./AdminPanel";
import VoterPanel from "./VoterPanel";
import WorkflowState from "./WorkflowState";
import ProposalList from "./ProposalList";
import VoterList from "./VoterList";
import Common from "./Common";
import { votingContract } from "@/contracts/voting.contract";
import { parseAbiItem } from "viem";
import { publicClients } from "@/lib/client";

const VoteDashboard = () => {
  const [voters, setVoters] = useState<[]>([]);
  const [proposals, setProposals] = useState<[]>([]);

  const { address } = useAccount();
  const isVoter = true;

  const {
    data: workflowStatus,
    error,
    isPending,
    refetch,
  } = useReadContract({
    abi: votingContract.abi,
    address: votingContract.address,
    functionName: "workflowStatus",
  });

  const getEvents = async () => {
    const voterEvents = await publicClients.getLogs({
      address: votingContract.address,
      event: parseAbiItem(
        "event VoterRegistered(address indexed voterAddress)"
      ),
      fromBlock: 0n,
      toBlock: "latest",
    });
    setVoters(voterEvents);

    const proposalEvents = await publicClients.getLogs({
      address: votingContract.address,
      event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
      fromBlock: 0n,
      toBlock: "latest",
    });

    setProposals(proposalEvents);
  };
  console.log("proposals : ", proposals);

  useEffect(() => {
    refetch();
    getEvents();
  }, []);

  return (
    <div>
      <h1 className="text-center">Connected with : {address}</h1>
      <WorkflowState workflow={workflowStatus} />
      <hr className="mt-4 border-t border-gray-300 w-full" />

      {votingContract.ownerAddress === address ? (
        <>
          <AdminPanel refetch={refetch} workflow={workflowStatus} />
          <hr className="mt-4 border-t border-gray-300 w-full" />
        </>
      ) : null}
      {isVoter ? (
        <>
          <VoterPanel refetch={refetch} proposals={proposals} />{" "}
          <hr className="mt-4 border-t border-gray-300 w-full" />
        </>
      ) : null}
      <Common voters={voters} proposals={proposals} />
    </div>
  );
};

export default VoteDashboard;
