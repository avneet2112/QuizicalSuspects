/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
  {
    env: {
      DB_URL:
        "mongodb+srv://avneet12:1YpPvHhVQ0qLBE1S@cluster0.siewrv6.mongodb.net/mcqDB",
    },
  },
]);
