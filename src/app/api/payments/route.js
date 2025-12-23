import { NextResponse } from "next/server";

import { fetchPayments } from "@/lib/huch-api";

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

		const options = {
			merchant_id: merchantId,
			page: Number.parseInt(page, 10),
			per_page: Number.parseInt(perPage, 10),
		};

		if (paymentStatus) {
			options.payment_status = paymentStatus;
		}

		const data = await fetchPayments(options);

		return NextResponse.json(data);
	} catch (error) {
		console.error("API route error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to fetch payments" },
			{ status: error.message?.includes("Authentication") ? 401 : 500 }
		);
	}
}
