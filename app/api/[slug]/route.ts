import {NextRequest, NextResponse} from "next/server";
import {UrlDatabase} from "@/lib/urlDatabase";

export const GET = (
	request: NextRequest,
	{params}: {params: {slug: string}}
) => {
	const slug = params.slug;
	const originalUrl = UrlDatabase.getUrl(slug);

	if (originalUrl) {
		return NextResponse.json({originalUrl});
	} else {
		return NextResponse.json({error: "URL not found"}, {status: 404});
	}
};
