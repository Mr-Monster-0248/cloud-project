export function buildURLObjectForTest(path: string, port?: number) {
  return {
    pathname: path,
    port: port || 7000,
  }
}