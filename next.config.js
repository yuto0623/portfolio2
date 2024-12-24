/**
 * @type {import('next').NextConfig}
 */
module.exports = {
	/* ここにオプション設定を書きます */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.microcms-assets.io",
				port: "",
				pathname: "/assets/**",
			},
		],
	},
};
