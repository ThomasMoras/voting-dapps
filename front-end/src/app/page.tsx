"use client";

import NotConnected from "@/components/shared/NotConnected";
import VoteDashboard from "@/components/shared/VoteDashboard";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();

  return <>{isConnected ? <VoteDashboard /> : <NotConnected />}</>;
}
