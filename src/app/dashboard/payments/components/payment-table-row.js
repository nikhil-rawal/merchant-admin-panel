"use client";

import React from "react";
import { Box, Chip, IconButton, Stack, TableCell, TableRow, Typography } from "@mui/material";
import { DotsThree, Wallet } from "@phosphor-icons/react";

import { DUMMY_CUSTOMER, DUMMY_PAYMENT_METHOD } from "../constants/constants";
import { formatAccountRef, formatAmount, formatDay, formatTime, maskPaymentId } from "../utils/utils";
import { getStatusStyles, STATUS_ICON } from "./status-icon";

export function PaymentTableRow({ payment, index }) {
	if (!payment || !payment.payment_id) {
		return null;
	}

	const dummyMethod = DUMMY_PAYMENT_METHOD[index % DUMMY_PAYMENT_METHOD.length];
	const dummyCustomer = DUMMY_CUSTOMER[index % DUMMY_CUSTOMER.length];

	// Use dummy data if available, otherwise fall back to API data
	const paymentMethodLabel = dummyMethod?.label || payment.label || payment.isoStatus?.name || "Payment method";
	const paymentMethodRef = dummyMethod?.order_ref || payment.order_ref || "Account N/A";
	const formattedRef = formatAccountRef(paymentMethodRef);
	const customerName = dummyCustomer?.name || payment.customer_name || "Customer";
	const customerEmail = dummyCustomer?.email || payment.customer_email || "customer@example.com";

	const Icon = STATUS_ICON[payment.payment_status] || STATUS_ICON.NEW;
	const statusStyles = getStatusStyles(payment.payment_status);

	return (
		<TableRow>
			{/* Amount / Payment */}
			<TableCell sx={{ py: 2 }}>
				<Stack spacing={0.5}>
					<Typography variant="subtitle2">
						{formatAmount(payment.amount)} {payment.currency || ""}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{maskPaymentId(payment.payment_id)}
					</Typography>
				</Stack>
			</TableCell>

			{/* Payment Method */}
			<TableCell sx={{ py: 2 }}>
				<Stack direction="row" spacing={1.5} alignItems="center">
					{dummyMethod?.icon ? (
						<Box
							component="img"
							src={dummyMethod.icon}
							alt={paymentMethodLabel}
							sx={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
					) : (
						<Box
							sx={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								bgcolor: "action.hover",
								display: "grid",
								placeItems: "center",
							}}
						>
							<Wallet size={18} />
						</Box>
					)}
					<Stack spacing={0.25}>
						<Typography variant="subtitle2">{paymentMethodLabel}</Typography>
						<Typography variant="body2" color="text.secondary">
							{formattedRef}
						</Typography>
					</Stack>
				</Stack>
			</TableCell>

			{/* Customer */}
			<TableCell sx={{ py: 2 }}>
				<Stack spacing={0.25}>
					<Typography variant="subtitle2">{customerName}</Typography>
					<Typography variant="body2" color="text.secondary">
						{customerEmail}
					</Typography>
				</Stack>
			</TableCell>

			{/* Status */}
			<TableCell sx={{ py: 2 }}>
				<Chip
					icon={<Icon color={statusStyles.icon} style={statusStyles.style} />}
					label={payment.payment_status}
					variant="outlined"
					size="small"
				/>
			</TableCell>

			{/* Date */}
			<TableCell sx={{ py: 2 }}>
				<Stack spacing={0.25}>
					<Typography variant="subtitle2">{formatDay(payment.creation_date)}</Typography>
					<Typography variant="body2" color="text.secondary">
						{formatTime(payment.creation_date)}
					</Typography>
				</Stack>
			</TableCell>

			{/* Actions */}
			<TableCell align="right" sx={{ py: 2 }}>
				<IconButton
					size="small"
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					<DotsThree size={44} />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
