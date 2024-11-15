import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-docgen";
import "@primitivefi/hardhat-dodoc";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  docgen: {
    path: "./docs",
    clear: true,
    runOnCompile: true,
  },
};

export default config;
