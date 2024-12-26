import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.NEXT_PUBLIC_SERVICE_DOMAIN;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!serviceDomain) {
	throw new Error("NEXT_PUBLIC_SERVICE_DOMAIN is not defined");
}
if (!apiKey) {
	throw new Error("NEXT_PUBLIC_API_KEY is not defined");
}

export const client = createClient({
	serviceDomain,
	apiKey,
});

export type WorksList = {
	contents: Works[];
	totalCount: number;
	offset: number;
	limit: number;
};

export type Works = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	thumbnail?: thumbnail;
	title: string;
	url?: string;
	skill: string[];
	description: string;
};

export type thumbnail = {
	url: string;
	height: number;
	width: number;
};
