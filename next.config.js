/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
});

const nextConfigPWA = withPWA({
	reactStrictMode: true,
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
});
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
};

module.exports = nextConfigPWA;
