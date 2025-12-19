/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		APP_ENV: process.env.APP_ENV,
		APP_URL: process.env.APP_URL,
		APP_DOMAIN: process.env.APP_DOMAIN,
		SERVER_URL: process.env.SERVER_URL
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'avatars.yandex.net'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'http',
				hostname: 'tecdoc.makingdatameaningful.com'
			}
		] // http://tecdoc.makingdatameaningful.com/media/article-id/5522538/media-type/images/type/media/token/Z0ZRODdzOTRLdlV4eHVEdTBvQTA3UT09
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
}

export default nextConfig
