import {getHash, isValidUrl} from "./route";

describe("getHash", () => {
	it("should return a hash", () => {
		const url =
			"https://github.com/leland-dev/interview/blob/main/url-shortener/README.md";
		const hash = getHash(url);
		expect(hash).toBe("3qfJd");
	});

	it("should return a different hash for different URLs", () => {
		const url1 =
			"https://github.com/leland-dev/interview/blob/main/url-shortener/README.md";
		const url2 =
			"https://github.com/leland-dev/interview/blob/main/url-shortener";
		const hash1 = getHash(url1);
		const hash2 = getHash(url2);
		expect(hash1).not.toBe(hash2);
	});

	it("should return the same hash for the same URL", () => {
		const url =
			"https://github.com/leland-dev/interview/blob/main/url-shortener/README.md";
		const hash1 = getHash(url);
		const hash2 = getHash(url);
		expect(hash1).toBe(hash2);
	});

	it("should generate a 5 digit hash", () => {
		const url =
			"https://github.com/leland-dev/interview/blob/main/url-shortener/README.md";
		const hash = getHash(url);
		expect(hash.length).toBe(5);
	});
});

describe("isValidUrl", () => {
	it("should return true for a valid URL", () => {
		const url =
			"https://github.com/leland-dev/interview/blob/main/url-shortener/README.md";
		const isValid = isValidUrl(url);
		expect(isValid).toBe(true);
	});

	it("should return false for an invalid URL", () => {
		const url = "ub.com/leland-dev/interview/blob/";
		const isValid = isValidUrl(url);
		expect(isValid).toBe(false);
	});
});
