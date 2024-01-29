import swagger from "@elysiajs/swagger";
import { testApp } from "../src/test/http/test-app";

async function main() {
  testApp.use(swagger()).listen(8080);
  console.log("📑 Swagger documentation started");
}

await main();
