interface urldb {
	[key: string]: string;
}

export class UrlDatabase {
	private static db: urldb = {};

	public static addUrl(url: string, hash: string): void {
		this.db[hash] = url;
	}

	public static getUrl(hash: string): string {
		return this.db[hash];
	}
}
