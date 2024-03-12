/** @type {import('next').NextConfig} */

const redirects = require('./redirects.js');

const nextConfig = {
  async redirects() {
    return [...redirects];
  },
};

module.exports = nextConfig;
