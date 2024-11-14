import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { votingContract } from "@/contracts/voting.contract";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/components/ui/use-toast";

const AdminPanel = ({
  refetch,
  workflow,
}: {
  refetch: () => void;
  workflow: any;
}) => {
  // const { adminAdress } = useAccount();

  const [voterAddress, setVoterAddress] = useState("");
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const addVoter = async () => {
    if (voterAddress?.trim()) {
      try {
        const result = writeContract({
          address: votingContract.address,
          abi: votingContract.abi,
          functionName: "addVoter",
          args: [voterAddress as `0x${string}`],
        });
      } catch (error) {
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
        description: "Please set a valid voter address.",
        className: "bg-red-400",
      });
    }
  };

  const goToNextStep = async (workflowNumber: number) => {
    switch (workflowNumber) {
      case 1:
        try {
          const result = writeContract({
            address: votingContract.address,
            abi: votingContract.abi,
            functionName: "startProposalsRegistering",
          });
        } catch (error) {}
        break;
      case 2:
        try {
          const result = writeContract({
            address: votingContract.address,
            abi: votingContract.abi,
            functionName: "endProposalsRegistering",
          });
        } catch (error) {}
        break;
      case 3:
        try {
          const result = writeContract({
            address: votingContract.address,
            abi: votingContract.abi,
            functionName: "startVotingSession",
          });
        } catch (error) {}
        break;
      case 4:
        try {
          const result = writeContract({
            address: votingContract.address,
            abi: votingContract.abi,
            functionName: "endVotingSession",
          });
        } catch (error) {}
        break;
      default:
        console.log("Invalid workflow number");
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setVoterAddress("");
      //getEvents();
    }
  }, [isConfirmed]);

  return (
    <div className="mt-5">
      <h1 className="text-2xl">Admin section</h1>

      <h2 className="text-xl pt-2 text-center">Workflows managment</h2>
      <div className="flex flex-row space-x-5 pt-5 justify-center">
        <Button
          className="bg-green-600 hover:bg-green-400"
          onClick={() => goToNextStep(1)}
          disabled={workflow != 0}
        >
          Start Proposals Registering
        </Button>
        <Button
          className="bg-blue-600  hover:bg-blue-400"
          onClick={() => goToNextStep(2)}
          disabled={workflow != 1}
        >
          End Proposals Registering
        </Button>
        <Button
          className="bg-orange-600  hover:bg-orange-400"
          onClick={() => goToNextStep(3)}
          disabled={workflow != 2}
        >
          Start Voting Session
        </Button>
        <Button
          className="bg-slate-600  hover:bg-slate-400"
          onClick={() => goToNextStep(4)}
          disabled={workflow != 3}
        >
          End Voting Session
        </Button>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="bg-emerald-600 hover:bg-emerald-400 w-40 text-lg"
          onClick={() => console.log("tally vote")}
          disabled={workflow != 4}
        >
          Tally vote
        </Button>
      </div>

      <h2>Voter managment</h2>
      <div className="flex flex-row pt-3">
        <Input
          className="mr-2"
          placeholder="Voter address"
          onChange={(e) => setVoterAddress(e.target.value)}
          value={voterAddress}
        />
        <Button
          onClick={addVoter}
          className="hover:bg-gray-600 bg-gray-700 text-white"
        >
          Add voter
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
