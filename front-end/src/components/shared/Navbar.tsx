"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import icon from "../../../public/mail.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full p-5">
      <Image priority src={icon} width={30} alt="Logo" />

      <div>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
