const fs = require("fs").promises;
require("dotenv").config();
const storage = require("./index");
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);
const { format } = require("util");

const uploadImage = async (filePath) => {
    const existError = await fs.access(filePath).catch((err) => err);
    if (existError) {
        return;
    }
    const fileName = filePath.replace("processed/", "");
    const buffer = await fs.readFile(filePath);

    // Create a new blob in the bucket and upload the file data.
    const blob = await bucket.file(fileName);
    const blobStream = await blob.createWriteStream({
        resumable: false,
        metadata: {
            contentType: "image/png",
        },
    });
    await blobStream.end(buffer);

    return format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
};
module.exports = uploadImage;
