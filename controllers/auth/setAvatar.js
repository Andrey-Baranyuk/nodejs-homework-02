const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { basedir } = global;
const { User } = require(`${basedir}/models/user`)

const avatarsDir = path.join(basedir, 'public', 'avatars')

const setAvatar = async (req, res, next) => {
try {
    const { _id } = req.user;
    const { path: tempPath, originalname } = req.file;
    const [extension] = originalname.split('.').reverse();
    const newName = `${_id}.${extension}`;

    const uploadPath = path.join(avatarsDir, newName);
    await fs.rename(tempPath, uploadPath);
    const avatarURL = path.join('avatars', newName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL })
    const image = await Jimp.read(`${uploadPath}`);
    image.resize(250, 250);
    image.write(`${uploadPath}`)
    res.json({
        avatarURL,
    })
} catch (error) {
    await fs.unlink(req.file.path);
    throw error;
}
};

module.exports = setAvatar;