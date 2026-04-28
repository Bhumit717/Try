import { runDailyJob } from "@/lib/jobs/dailyJob";

runDailyJob().then((stats) => {
  console.log("Daily scrape done", stats);
  process.exit(0);
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
