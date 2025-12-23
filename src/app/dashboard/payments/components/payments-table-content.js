"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";

import { PaymentTableRow } from "./payment-table-row";

export function PaymentsTableContent({ payments, total, page, rowsPerPage, onPageChange, onRowsPerPageChange }) {
	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Amount / Payment</TableCell>
						<TableCell>Payment Method</TableCell>
						<TableCell>Customer</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Date</TableCell>
						<TableCell align="right">Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{!payments || payments.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} align="center" sx={{ py: 3 }}>
								No payments found
							</TableCell>
						</TableRow>
					) : (
						payments.map((payment, index) => (
							<PaymentTableRow key={payment.payment_id} payment={payment} index={index} />
						))
					)}
				</TableBody>
			</Table>

			<TablePagination
				rowsPerPageOptions={[5, 10, 20, 50, 100]}
				component="div"
				count={total}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</>
	);
}
