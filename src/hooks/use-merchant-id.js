"use client";

import { useSearchParams } from "next/navigation";

export function useMerchantId() {
	const searchParams = useSearchParams();
	const merchantId = searchParams.get("merchant_id");
	return merchantId;
}
