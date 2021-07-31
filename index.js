// Required External Modules
const express = require("express");
const multer = require("multer");
const proccessImg = require("./imageProcessing");
const helpers = require("./utils/helpers");
const uploadImage = require("./cloud/uploadImage");

const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, "uploads/");
    },
    filename: function (_, file, cb) {
        cb(null, Date.now() + "." + file.mimetype.replace("image/", "")); //Appending it's format.
    },
});

// Limit file size to 15MB.
const upload = multer({
    storage,
    limits: { fileSize: 15000000 },
    fileFilter(_, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|tiff|bmp)$/)) {
            cb(
                new Error(
                    "Please upload an image with the supported types (png, jpg, jpeg, tiff or bmp)."
                )
            );
        }
        cb(undefined, true);
    },
});

// App Variables
const app = express();
const port = process.env.PORT || "8000";

//  App Configuration

// Routes Definitions
app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {
        if (!req.file) {
            res.status(206).send({ error: "Image not found." });
        }
        try {
            // Proccess the image.
            const [img1Path, img2Path] = await proccessImg(req.file.path);

            // Delete the original img as we don't need it now.
            helpers.deleteFile(req.file.path);

            // Upload the image.
            const img1URL = await uploadImage(img1Path);
            const img2URL = await uploadImage(img2Path);

            // Delete the proccessed images, as they are successfuly uploaded.
            helpers.deleteFile(img1Path);
            helpers.deleteFile(img2Path);

            // Send the URLs.
            res.status(200).send([img1URL, img2URL]);
        } catch (err) {
            res.status(500).send({ error: "Something went wrong. Try again!" });
        }
    },
    (error, _, res) => {
        res.status(400).send({ error: error.message });
    }
);

// Server Activation
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});
