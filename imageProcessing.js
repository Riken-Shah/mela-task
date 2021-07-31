const Jimp = require("jimp");
const logoPath = "./mela-logo.png";

const processImage = async (img, width, height, logo, savePath) => {
    await logo.resize(width, height);
    await img.resize(width, height);
    // add watermark
    await img.composite(logo, 0, 0, [
        {
            mode: Jimp.BLEND_DESTINATION_OVER,
            opacitySource: 0.2,
        },
    ]);
    await img.write(savePath);
    return savePath;
};

module.exports = async (filePath) => {
    const img = await Jimp.read(filePath);
    const logo = await Jimp.read(logoPath);
    await logo.opacity(0.3);
    const savePath1 = `processed/${Date.now()}_200x200.png`;
    const img1Path = await processImage(
        img.clone(),
        200,
        200,
        logo.clone(),
        savePath1
    );
    const savePath2 = `processed/${Date.now()}_100x100.png`;
    const img2Path = await processImage(
        img.clone(),
        100,
        100,
        logo.clone(),
        savePath2
    );
    return [img1Path, img2Path];
};
