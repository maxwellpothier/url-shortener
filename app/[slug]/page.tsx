"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import * as React from "react";

const RedirectPage = () => {
	const params = useParams();
	const slug = params.slug as string;
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOriginalUrl = async () => {
			try {
				const response = await fetch(`/api/${slug}`);
				if (response.ok) {
					console.log("made it here");
					const data = await response.json();
					console.log("The data I got", data);
					if (data.originalUrl) {
						window.location.href = data.originalUrl;
					} else {
						setError("Original URL not found");
					}
				} else {
					setError("Failed to fetch original URL");
				}
			} catch (error) {
				console.error("Error fetching original URL:", error);
				setError("An error occurred while fetching the original URL");
			}
		};

		fetchOriginalUrl();
	}, [slug]);

	return <div>{error ? <p>Error: {error}</p> : <p>Redirecting...</p>}</div>;
};

export default RedirectPage;
