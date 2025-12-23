import { NextResponse } from "next/server";

const SANDBOX_BASE_URL = process.env.NEXT_PUBLIC_SANDBOX_BASE_URL;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
	// Return cached token if still valid
	if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
		return accessToken;
	}

	try {
		const response = await fetch(`${SANDBOX_BASE_URL}/api/oauth2/token`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
			}),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Authentication failed: ${response.status} ${errorText}`);
		}

		const data = await response.json();
		accessToken = data.access_token;
		// Set expiry to 55 minutes to refresh before actual expiry
		tokenExpiry = Date.now() + 55 * 60 * 1000;

		return accessToken;
	} catch (error) {
		console.error("Failed to get access token:", error);
		throw error;
	}
}

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const merchantId = searchParams.get("merchant_id");
		const page = searchParams.get("page") || "1";
		const perPage = searchParams.get("per_page") || "10";
		const paymentStatus = searchParams.get("payment_status");

		if (!merchantId) {
			return NextResponse.json({ error: "merchant_id is required" }, { status: 400 });
		}

		const token = await getAccessToken();

		// Build query parameters
		const params = new URLSearchParams({
			merchant_id: merchantId,
			page,
			per_page: perPage,
		});

		if (paymentStatus) {
			params.append("payment_status", paymentStatus);
		}

		const response = await fetch(`${SANDBOX_BASE_URL}/api/payments?${params.toString()}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Failed to fetch payments: ${response.status} ${errorText}`);
		}

		const data = await response.json();

		return NextResponse.json({
			results: data.results ?? [],
			total: data.total ?? 0,
			page: data.page ?? Number.parseInt(page, 10),
			per_page: data.per_page ?? Number.parseInt(perPage, 10),
		});
	} catch (error) {
		console.error("Failed to fetch payments:", error);
		return NextResponse.json({ error: error.message || "Failed to fetch payments" }, { status: 500 });
	}
}
