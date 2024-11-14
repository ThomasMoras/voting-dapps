import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { votingContract } from "@/contracts/voting.contract";
import { useWriteContract, useReadContract } from "wagmi";

const VoterPanel: React.FC<VoterPanelProps> = ({ refetch, proposals }) => {
  const [proposalDescription, setDescription] = useState("");
  const [listProposal, setListProposal] = useState([]);
  const [proposalId, setProposalId] = useState();

  useEffect(() => {
    setListProposal(proposals.map((p) => p.data));
  }, [proposals]);

  console.log("proplistProposal inside Voter Panel : ", proposals);

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

  const submitVote = async () => {
    if (proposalDescription?.trim()) {
      try {
        const result = writeContract({
          address: votingContract.address,
          abi: votingContract.abi,
          functionName: "setVote",
          args: [proposalId],
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
      <div className="flex flex-col items-center">
        <h2 className="text-xl pt-3">Proposal List</h2>
        <Input
          className="mt-3 w-1/2"
          placeholder="Proposal ID"
          onChange={(e) => setProposalId(e.target.value)}
          value={proposalId}
        />
        <Button className="mt-3 w-1/2" onClick={submitVote}>
          Submit the vote
        </Button>
        {/* <select
          className="form-select mt-1 block w-full"
          onClick={(e) => handleProposalSelect(e)}
        >
          {listProposal.map((item, index) => (
            <option key={index} value={item}>
              {item.substring(item.length - 2)}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  );
};

export default VoterPanel;
