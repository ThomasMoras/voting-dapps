import React from "react";
import { useAccount } from "wagmi";
import AdminPanel from "./AdminPanel";
import VoterPanel from "./VoterPanel";
import WorkflowState from "./WorkflowState";
import Events from "./Events";

const VoteDashboard = () => {
  const { address } = useAccount();

  return (
    <div>
      <WorkflowState />
      <AdminPanel />
      <VoterPanel />
      <Events />
    </div>
  );
};

export default VoteDashboard;
