import {NextResponse} from "next/server";
import crypto from "crypto";
import {UrlDatabase} from "@/lib/urlDatabase";

export const getHash = (url: string) => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const hashLength = 5;

	const urlHash = crypto.createHash("sha256").update(url).digest();

	let hash = "";
	for (let i = 0; i < hashLength; i++) {
		const randomIndex = urlHash[i] % characters.length;
		hash += characters[randomIndex];
	}

	return hash;
};

export const isValidUrl = (url: string) => {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
};

export const POST = async (req: Request) => {
	const {url} = await req.json();

	if (!isValidUrl(url)) {
		return NextResponse.json({error: "Invalid URL"}, {status: 400});
	}

	const urlHash = getHash(url);

	UrlDatabase.addUrl(url, urlHash);

	const shortUrl = `http://localhost:3000/${urlHash}`;

	return NextResponse.json({shortUrl: shortUrl});
};
