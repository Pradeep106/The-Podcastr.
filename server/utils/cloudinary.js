const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dnmgmych2",
    api_key: "357334547356289",
    api_secret: "WHoar2t_Ikx5jKoGqzGTHDJMWQw",
});

module.exports = cloudinary;