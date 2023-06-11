require('dotenv').config({
    path: `.env.development`, // Replace with your desired .env file
});

module.exports = {
    env: {
        "BASE_URL": "http://127.0.0.1:5000/api",
        "DEBUG": true
    }
}
