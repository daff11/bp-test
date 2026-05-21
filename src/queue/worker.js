const {Worker} = require("bullmq");
const redis = require("../config/redis");
const { resolve } = require("node:dns");

const worker = new Worker(
    "emailQueue",
    async (job) => {
        console.log("Mengirimkan email...");
        console.log(`User membaca Bab ${job.data.title}`);
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