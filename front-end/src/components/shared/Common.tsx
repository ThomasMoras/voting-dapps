import { votingContract } from "@/contracts/voting.contract";
import ProposalList from "./ProposalList";
import VoterList from "./VoterList";
import { publicClient } from "@/lib/client";
import { parseAbiItem } from "viem";
import { useState } from "react";

const Common = () => {
  const [voterEvents, setVoterEvents] = useState<[]>([]);
  const [proposalEvents, setProposalEvents] = useState<[]>([]);

  const [eventLogs, setEventLogs] = useState<Event[] | undefined>(undefined);

  const getEvents = async () => {
    const voterEvents = await publicClient.getLogs({
      address: votingContract.address,
      event: parseAbiItem("event voterAddress(address indexed voterAddress)"),
      fromBlock: 0,
      toBlock: "latest",
    });

    setVoterEvents(voterEvents);
    const proposalEvents = await publicClient.getLogs({
      address: votingContract.address,
      event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
      fromBlock: 0,
      toBlock: "latest",
    });
    setProposalEvents(voterEvents);

    // const combinedEvents = voterEvents
    //   .map((event: { args: { adresse: string }; blockNumber: string }) => ({
    //     type: "Deposit",
    //     address: event.args.voterAddress,
    //     amount: event.args.amount,
    //     blockNumber: Number(event.blockNumber),
    //   }))
    //   .concat(
    //     withdrawEvents.map(
    //       (event: {
    //         args: { account: string; amount: string };
    //         blockNumber: string;
    //       }) => ({
    //         type: "Withdraw",
    //         address: event.args.account,
    //         amount: event.args.amount,
    //         blockNumber: Number(event.blockNumber),
    //       })
    //     )
    //   );

    // combinedEvents.sort((a: Event, b: Event) => {
    //   return b.blockNumber - a.blockNumber;
    // });
  };

  //   console.log(voterEvents);
  //   console.log(proposalEvents);

  return (
    <div className="mt-5">
      <h1 className="text-2xl">Public section</h1>
      <VoterList />
      <ProposalList />
    </div>
  );
};

export default Common;
