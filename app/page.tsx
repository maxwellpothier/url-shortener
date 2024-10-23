"use client";

import {useState} from "react";

export default function Home() {
	const [inputUrl, setInputUrl] = useState(
		"https://react.dev/link/react-devtools"
	);
	const [submittedUrl, setSubmittedUrl] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async () => {
		setIsLoading(true);
		setErrorMessage("");
		setSubmittedUrl("");
		try {
			const response = await fetch("/api/shorten", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({url: inputUrl}),
			});

			const data = await response.json();

			if (!response.ok) {
				setErrorMessage(data.error || "Failed to shorten URL");
				return;
			}

			setSubmittedUrl(data.shortUrl);
		} catch {
			setErrorMessage("Failed to shorten URL");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-2xl font-bold mb-6">URL Shortener</h1>
			<input
				type="text"
				placeholder="Enter long URL here"
				value={inputUrl}
				onChange={e => setInputUrl(e.target.value)}
				className="p-2 border rounded mb-4 w-96"
			/>
			<button
				onClick={handleSubmit}
				className="px-4 py-2 bg-blue-500 text-white rounded">
				Submit
			</button>
			{isLoading ? (
				<p className="mt-4">Loading...</p>
			) : errorMessage ? (
				<p className="mt-4 text-red-500">{errorMessage}</p>
			) : (
				submittedUrl && (
					<p className="mt-4">
						Shortened URL:{" "}
						<a
							href={submittedUrl}
							target="_blank"
							rel="noopener noreferrer">
							{submittedUrl}
						</a>
					</p>
				)
			)}
		</div>
	);
}
