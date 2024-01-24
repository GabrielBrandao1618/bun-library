import { app } from "./src/infra/http/app";

async function main() {
  app.listen(8080);
  console.log("🔥 App running at port 8080");
}

main();
