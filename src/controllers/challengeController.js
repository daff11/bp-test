const redis = require("../config/redis");
const emailQueue = require("../queue/emailQueue");

exports.getChapterById = async (req, res) => {
    try {
        const {chapter_id} = req.params;
        const cacheKey = `chapter:${chapter_id}`;

        // Validasi Cache, jika ada maka
        const cached = await redis.get(cacheKey);
        if (cached) {
            const chapter = JSON.parse(cached);

            // Async email dengan Queue (misal title dari chapter)
            await emailQueue.add("sendEmail", {
                title: chapter.title
            });

            return res.json(chapter);
        }

        // Jika tidak ada data cache, maka ambil data dari db
        const chapter = {
            id: chapter_id,
            title: "Chapter Title",
            content: "Chapter Content",
        };

        // Kemudian simpan datanya ke cache dengan Time To Live 60 dtk
        await redis.set(
            cacheKey, JSON.stringify(chapter), "EX", 60
        );

        // Lalu push juga ke Queueu
        await emailQueue.add("sendEmail", {
            title: chapter.title,
        });

        return res.json(chapter);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};