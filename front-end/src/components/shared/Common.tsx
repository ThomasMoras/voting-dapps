import { votingContract } from "@/contracts/voting.contract";
import ProposalList from "./ProposalList";
import VoterList from "./VoterList";

interface CommonProps {
  voters: any[];
  proposals: any[];
}

const Common: React.FC<CommonProps> = ({ voters, proposals }) => {
  return (
    <div className="mt-5">
      <h1 className="text-2xl">Public section</h1>
      <VoterList voters={voters} />
      <ProposalList proposals={proposals} />
    </div>
  );
};

export default Common;
