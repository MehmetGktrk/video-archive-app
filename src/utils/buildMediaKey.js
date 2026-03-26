const { randomUUID } = require("crypto");

exports.buildMediaKey = (userId) => {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0");
    const uniqueId = randomUUID();

    return `media/${String(userId)}/${year}/${month}/${uniqueId}`;
};

