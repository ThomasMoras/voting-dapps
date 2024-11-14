import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const VoterList = ({ voters }) => {
  // console.log("voters inside VoterList : ", voters);
  return (
    <div className="mt-5">
      <h1 className="text-2xl">Voters registred</h1>
      <Table>
        <TableCaption>All registred voters</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voters.map((voter, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{voter.logIndex}</TableCell>
              <TableCell>{"0x" + voter.data.slice(26)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VoterList;
