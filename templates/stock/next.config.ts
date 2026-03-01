import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagcdn.com',
			},
			{
				protocol: 'https',
				hostname: 'static.tumblr.com',
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
			},
			{
				protocol: 'https',
				hostname: 'dev-portaltorra.s3.amazonaws.com',
			},
		],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
