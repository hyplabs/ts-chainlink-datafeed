import {
  Chain,
  GetContractReturnType,
  HttpTransport,
  PublicClient,
} from "viem";
import { EAC } from "./abis/EAC.js";
import { formatRoundData } from "./utils.js";

export type EVMAddress = `0x${string}`;

export type EACContract = GetContractReturnType<
  typeof EAC,
  PublicClient<HttpTransport, Chain>
>;

export type RoundData = [bigint, bigint, bigint, bigint, bigint];

export type RoundDataFormatted = ReturnType<typeof formatRoundData>;
