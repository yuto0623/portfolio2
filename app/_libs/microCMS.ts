import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.SERVICE_DOMAIN;
const apiKey = process.env.API_KEY;

if (!serviceDomain) {
	throw new Error("SERVICE_DOMAIN is not defined");
}
if (!apiKey) {
	throw new Error("API_KEY is not defined");
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
