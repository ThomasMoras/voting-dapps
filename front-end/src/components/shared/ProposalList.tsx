import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
interface Proposal {
  logIndex: number;
  id: number;
}

const ProposalList = ({ proposals }: { proposals: Proposal[] }) => {
  console.log("List of proposals: ", proposals);
  return (
    <div className="pt-2">
      <h1 className="text-2xl">List of all proposals</h1>
      <Table>
        <TableCaption>list of proposals id</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Proposal ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal, index) => (
            <TableRow key={index}>
              <TableCell>{proposal.data.toString().slice(-1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProposalList;
