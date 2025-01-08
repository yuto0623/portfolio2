import { client } from "@/app/_libs/microCMS";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
	const data = await client.getList({ endpoint: "works" });
	return new NextResponse(JSON.stringify(data), { status: 200 });
}
