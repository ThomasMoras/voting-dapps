import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const NotConnected = () => {
  return (
    <div className="p-5">
      <Alert className="bg-orange-400">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please, connect your wallet to our DApp.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NotConnected;
