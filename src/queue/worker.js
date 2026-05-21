const {Worker} = require("bullmq");
const redis = require("../config/redis");
const { resolve } = require("node:dns");

const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log("Mengirimkan email...");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log(`Email terkirim ke: ${job.data.title}`);
    },
    {
        connection: redis,
    }
);

worker.on("completed", () => {
    console.log("Job selesai");
});

worker.on("failed", (job, err) => {
    console.log(err.message);
});