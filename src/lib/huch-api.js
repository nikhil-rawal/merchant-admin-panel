const SANDBOX_BASE_URL = process.env.NEXT_PUBLIC_SANDBOX_BASE_URL;
const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID;
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
			const errorText = await response.text().catch(() => response.statusText);
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

export async function fetchPayments(options = {}) {
	const { page = 1, per_page = 10, payment_status = null, merchant_id = null } = options;

	try {
		const token = await getAccessToken();

		const merchantId = merchant_id || MERCHANT_ID;
		const params = new URLSearchParams({
			merchant_id: merchantId,
			page,
			per_page,
		});

		if (payment_status) {
			params.append("payment_status", payment_status);
		}

		const response = await fetch(`${SANDBOX_BASE_URL}/api/payments?${params.toString()}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		});

		if (!response.ok) {
			const errorText = await response.text().catch(() => response.statusText);
			throw new Error(`Failed to fetch payments: ${response.status} ${errorText}`);
		}

		const data = await response.json();

		return {
			results: data.results ?? [],
			total: data.total ?? 0,
			page: data.page ?? page,
			per_page: data.per_page ?? per_page,
		};
	} catch (error) {
		console.error("Failed to fetch payments:", error);
		throw error;
	}
}

export async function getPaymentsByStatus(status, page = 1, per_page = 10) {
	const statusMap = {
		successful: ["PAID", "PAID_RECEIVED", "FORCE_PAID"],
		cancelled: ["CANCELLED", "EXPIRED"],
		pending: ["NEW", "PENDING", "BANK_CONNECTION_FAILED", "AWAITING_CONFIRMATION", "PROCESSING"],
		failed: ["FAILED", "AUTH_FAILED", "EXECUTE_FAILED"],
	};

	const statuses = statusMap[status.toLowerCase()];
	if (!statuses) {
		throw new Error(`Invalid status: ${status}`);
	}

	const { results } = await fetchPayments({ page, per_page });
	const filtered = results.filter((payment) => statuses.includes(payment.payment_status));

	return {
		results: filtered,
		total: filtered.length,
		page,
		per_page,
	};
}
