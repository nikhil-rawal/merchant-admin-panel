"use client";

import React from "react";
import { STATUS_MAP } from "@/app/dashboard/payments/constants/constants";

export function usePayments(merchantId) {
	const [allPayments, setAllPayments] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [activeTab, setActiveTab] = React.useState("all");
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const fetchAllPayments = React.useCallback(
		async (signal) => {
			if (!merchantId) return;

			const perPage = Number.parseInt(process.env.NEXT_PUBLIC_RESULTS_PER_PAGE, 10);

			setLoading(true);
			setError(null);
			try {
				let allPaymentsData = [];
				let currentPage = 1;
				let hasMore = true;

				while (hasMore) {
					if (signal?.aborted) {
						return;
					}

					const params = new URLSearchParams({
						merchant_id: merchantId,
						page: String(currentPage),
						per_page: String(perPage),
					});

					const response = await fetch(`/api/payments?${params.toString()}`, {
						signal,
					});

					if (!response.ok) {
						const errorData = await response.json().catch(() => ({}));
						throw new Error(errorData.error || "Failed to fetch payments");
					}

					const data = await response.json().catch((jsonError) => {
						throw new Error(`Invalid response format: ${jsonError.message}`);
					});

					const pageResults = data.results ?? [];
					allPaymentsData = [...allPaymentsData, ...pageResults];

					hasMore = pageResults.length === perPage && allPaymentsData.length < (data.total ?? 0);
					currentPage++;
				}

				if (!signal?.aborted) {
					setAllPayments(allPaymentsData);
				}
			} catch (error_) {
				if (error_.name === "AbortError") {
					return;
				}
				if (!signal?.aborted) {
					setError(error_.message);
					setAllPayments([]);
				}
			} finally {
				if (!signal?.aborted) {
					setLoading(false);
				}
			}
		},
		[merchantId]
	);

	React.useEffect(() => {
		const abortController = new AbortController();
		fetchAllPayments(abortController.signal);
		return () => {
			abortController.abort();
		};
	}, [fetchAllPayments]);

	const { payments, total } = React.useMemo(() => {
		let filtered = allPayments;

		if (activeTab !== "all") {
			const statuses = STATUS_MAP[activeTab] ?? [];
			filtered = allPayments.filter((payment) => statuses.includes(payment.payment_status));
		}

		const startIndex = page * rowsPerPage;
		const endIndex = startIndex + rowsPerPage;
		const paginated = filtered.slice(startIndex, endIndex);

		return {
			payments: paginated,
			total: filtered.length,
		};
	}, [allPayments, activeTab, page, rowsPerPage]);

	const handleTabChange = React.useCallback((event, newValue) => {
		setActiveTab(newValue);
		setPage(0);
	}, []);

	const handleChangePage = React.useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = React.useCallback((event) => {
		setRowsPerPage(Number.parseInt(event.target.value, 10));
		setPage(0);
	}, []);

	return {
		payments,
		total,
		allPayments,
		loading,
		error,
		activeTab,
		page,
		rowsPerPage,
		handleTabChange,
		handleChangePage,
		handleChangeRowsPerPage,
		refetch: () => fetchAllPayments(new AbortController().signal),
	};
}
