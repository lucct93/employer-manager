/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	compress: true,
	images: {
		domains: ['www.ucrhealth.org', 'randomuser.me'],
	},
	env: {
		NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
	},
};

module.exports = nextConfig;