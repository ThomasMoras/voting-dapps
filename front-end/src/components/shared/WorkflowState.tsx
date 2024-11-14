import { useEffect, useState } from "react";

const WorkflowState = ({ workflow }: { workflow: any }) => {
  const [workflowName, setWorkflowName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    let name = "";
    let bgColor = "";
    switch (workflow) {
      case 0:
        name = "Registering Voters";
        bgColor = "bg-blue-500";
        break;
      case 1:
        name = "Proposals Registration Started";
        bgColor = "bg-green-500";
        break;
      case 2:
        name = "Proposals Registration Ended";
        bgColor = "bg-yellow-500";
        break;
      case 3:
        name = "Voting Session Started";
        bgColor = "bg-orange-500";
        break;
      case 4:
        name = "Voting Session Ended";
        bgColor = "bg-red-500";
        break;
      case 5:
        name = "Votes Tallied";
        bgColor = "bg-purple-500";
        break;
    }
    setWorkflowName(name);
    setBackgroundColor(bgColor);
  }, [workflow]);

  return (
    <div
      className={`text-white ${backgroundColor} p-2 rounded-lg max-w-sm mx-auto my-auto mt-3`}
    >
      <h1 className="text-xl font-bold text-center">
        WorkflowState
        <div className="text-lg">{workflowName}</div>
      </h1>
    </div>
  );
};

export default WorkflowState;
