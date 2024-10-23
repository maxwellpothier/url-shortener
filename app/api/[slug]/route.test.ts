import {NextRequest} from "next/server";
import {GET} from "./route";
import {UrlDatabase} from "@/lib/urlDatabase";

jest.mock("@/lib/urlDatabase", () => ({
	UrlDatabase: {
		getUrl: jest.fn(),
	},
}));

describe("GET", () => {
	it("should return the original URL when slug exists", async () => {
		const mockSlug = "abc123";
		const mockUrl = "https://example.com";
		(UrlDatabase.getUrl as jest.Mock).mockReturnValue(mockUrl);

		const request = {} as NextRequest;
		const params = {slug: mockSlug};

		const response = await GET(request, {params});
		const data = await response.json();

		expect(data).toEqual({originalUrl: mockUrl});
	});

	it("should return 404 when slug does not exist", async () => {
		(UrlDatabase.getUrl as jest.Mock).mockReturnValue(undefined);

		const request = {} as NextRequest;
		const params = {slug: "nonexistent"};

		const response = await GET(request, {params});
		const data = await response.json();

		expect(response.status).toBe(404);
		expect(data).toEqual({error: "URL not found"});
	});
});
