import { client } from "@/app/_libs/microCMS";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
	// const data = await client.getList({ endpoint: "works" });
	const data = await client.getAllContents({ endpoint: "works" });
	return new NextResponse(JSON.stringify({ contents: data }), { status: 200 });
}
