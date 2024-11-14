import React, { useState } from "react";
import { useAccount, useReadContract, useWatchContractEvent } from "wagmi";
import AdminPanel from "./AdminPanel";
import VoterPanel from "./VoterPanel";
import WorkflowState from "./WorkflowState";
import ProposalList from "./ProposalList";
import VoterList from "./VoterList";
import Common from "./Common";
import { votingContract } from "@/contracts/voting.contract";

const VoteDashboard = () => {
  const { address } = useAccount();
  const isVoter = true;

  const {
    data: value,
    error,
    isPending,
    refetch,
  } = useReadContract({
    abi: votingContract.abi,
    address: votingContract.address,
    functionName: "workflowStatus",
  });

  return (
    <div>
      <WorkflowState />
      <hr className="mt-4 border-t border-gray-300 w-full" />

      {votingContract.ownerAddress === address ? (
        <>
          <AdminPanel refetch={refetch} workflow={value} />
          <hr className="mt-4 border-t border-gray-300 w-full" />
        </>
      ) : null}
      {isVoter ? (
        <>
          <VoterPanel refetch={refetch} />{" "}
          <hr className="mt-4 border-t border-gray-300 w-full" />
        </>
      ) : null}
      <Common />
    </div>
  );
};

export default VoteDashboard;
