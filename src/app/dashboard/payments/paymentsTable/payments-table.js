"use client";

import React from "react";
import { Alert, Box, CircularProgress } from "@mui/material";

import { usePayments } from "@/hooks/use-payments";

import { PaymentsFilterRow } from "../components/payments-filter-row";
import { PaymentsTableContent } from "../components/payments-table-content";
import { PaymentsTabs } from "../components/payments-tabs";

export default function PaymentsTable({ merchantId }) {
	const {
		payments,
		total,
		loading,
		error,
		activeTab,
		page,
		rowsPerPage,
		handleTabChange,
		handleChangePage,
		handleChangeRowsPerPage,
	} = usePayments(merchantId);

	if (!merchantId) {
		return (
			<Box sx={{ width: "100%", p: 3 }}>
				<Alert severity="warning">Merchant ID is required</Alert>
			</Box>
		);
	}

	return (
		<Box sx={{ width: "100%" }}>
			<PaymentsTabs activeTab={activeTab} onTabChange={handleTabChange} />

			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
					<CircularProgress />
				</Box>
			) : (
				<>
					<PaymentsFilterRow />
					<PaymentsTableContent
						payments={payments}
						total={total}
						page={page}
						rowsPerPage={rowsPerPage}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			)}
		</Box>
	);
}
