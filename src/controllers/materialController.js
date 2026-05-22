const Material = require("../models/materialModel");
const {faker} = require("@faker-js/faker");
const redis = require("../config/redis");
const emailQueue = require("../queue/emailQueue");

// CREATE Material
exports.createMaterial = async (req, res) => {
    try {
        const material = await Material.create(req.body);

        res.status(200).json({
            message: "Material dibuat",
            data: material,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET ALL Material
exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();

        res.json(materials);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// GET BY ID, CACHE, QUEUE
exports.getMaterialById = async (req, res) => {
    try {
        const {id} = req.params;
        const key = `material:${id}`;

        // Cek Cache
        const cached = await redis.get(key);
        if (cached) {
            console.log("Redis Hit");
            const data = JSON.parse(cached);

            await emailQueue.add("sendEmail", {
                title: data.title,
            });

            return res.json(data);
        }
        console.log("Redis Miss");

        // else
        const material = await Material.findByPk(id);
        if(!material) {
            return res.status(404).json({
                message: "Data tidak ada",
            });
        }

        await redis.set(
            key, JSON.stringify(material), "EX", 60
        );

        await emailQueue.add("sendEmail", {
            title: material.title,
        });

        res.json(material);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// UPDATE Material
exports.updateMaterial = async (req, res) => {
    try {
        const {id} = req.params;
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        }

        await material.update(req.body);

        // Hapus Cache lama
        await redis.del(`material:${id}`);

        res.json({
            message: "Material diupdate",
            data: material,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// DELETE Material
exports.deleteMaterial = async (req, res) => {
    try {
        const {id} = req.params;
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({
                message: "Data tidak ditemukan"
            });
        }

        await material.destroy();
        // Haous juga di redis
        await redis.del(`material:${id}`);

        res.json({
            message: "Material dihapus",
        });

    } catch (error) {
    res.status(500).json({
            message: error.message,
        });
    }
}

// SEEDER Material (50 data)
exports.seedMaterials = async (req, res) => {
    try {
        const data = [];

        for (let i=0; i<50; i++) {
            data.push({
                title: faker.lorem.sentence(),
                content: faker.lorem.paragraph(),
            });
        }

        await Material.bulkCreate(data);

        res.json({
            message: "50 data dummy ditambahkan",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}