/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
	dest: "public",
});

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "kivpajjxbvbqmbhjrojq.supabase.co",
				port: "",
				pathname: "/storage/v1/object/sign/user-image/**",
			},
		],
	},
};

const nextConfigPWA = withPWA(nextConfig);

module.exports = nextConfigPWA;
