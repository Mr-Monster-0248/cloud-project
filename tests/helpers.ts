import { AddressInfo } from "net";
import { fastify } from "./setup";

export function buildURLObjectForTest(path: string, port?: number) {
  return {
    pathname: path,
    port: port || (fastify.server.address() as AddressInfo)?.port,
  }
}