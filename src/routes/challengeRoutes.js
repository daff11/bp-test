const redis = require("../config/redis");
const emailQueue = require("../queue/emailQueue");

app.get("/books/:id/chapters/:chapter_id", async (req, res) => {
    try {
        const {chapter_id} = req.params;
        const cacheKey = `chapter:${chapter_id}`;

        // Validasi Cache, jika ada maka
        const cached = await redis.get(cacheKey);
        if (cached) {
            const chapter = JSON.parse(cached);

            // Async email via Queue
            await emailQueue.add("sendEmail", {
                title: data.title,
            });

            return res.json(chapter);
        }

        // Jika tidak ada data cache, maka ambil data dari db
        const chapter = await Chapter.findByPk(chapter_id);

        // Kemudian simpan datanya ke cache dengan Time To Live 60 dtk
        await redis.set(
            cacheKey, JSON.stringify(chapter), "EX", 60
        );

        // Async email via Queue
        await emailQueue.add("sendEmail", {
            title: material.title,
        });

        return res.json(chapter);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});