import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { votingContract } from "@/contracts/voting.contract";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

interface VoterPanelProps {
  refetch: () => void;
}

const VoterPanel: React.FC<VoterPanelProps> = ({ refetch }) => {
  const isProposalState = true;

  const [proposalDescription, setDescription] = useState("");

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const addProposal = async () => {
    if (proposalDescription?.trim()) {
      try {
        const result = writeContract({
          address: votingContract.address,
          abi: votingContract.abi,
          functionName: "addProposal",
          args: [proposalDescription],
        });
        console.log("Transaction result:", result);
      } catch (error) {
        console.log("Error during contract call:", error);
        if (error instanceof Error) {
          if (
            error.message.includes(
              "VM Exception while processing transaction: revert"
            )
          ) {
            const customErrorMessage = error.message.split("revert ")[1];
            console.log("Custom error message:", customErrorMessage);
            toast({
              title: "Error",
              description: customErrorMessage,
              className: "bg-red-400",
            });
          } else {
            console.log("Unexpected error:", error);
            toast({
              title: "Error",
              description: "Unexpected error",
              className: "bg-red-400",
            });
          }
        } else {
          console.log("Unexpected error:", error);
          toast({
            title: "Error",
            description: "Unexpected error",
            className: "bg-red-400",
          });
        }
      }
    } else {
      toast({
        title: "Error",
        description: "Can not submit empty proposal",
        className: "bg-red-400",
      });
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-2xl">Voter section</h1>
      <h2 className="text-xl pt-4">Submit a proposal</h2>
      <div className="flex flex-col items-center">
        <Input
          className="mt-3 w-1/2"
          placeholder="Proposal description"
          onChange={(e) => setDescription(e.target.value)}
          value={proposalDescription}
        />
        <Button className="mt-3 w-1/2" onClick={addProposal}>
          Submit the proposal
        </Button>
      </div>
      <h2 className="text-xl pt-3">Vote</h2>
    </div>
  );
};

export default VoterPanel;
