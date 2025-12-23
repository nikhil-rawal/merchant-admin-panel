"use client";

import React from "react";
import { Box, Button, Input, Link, Stack, Typography } from "@mui/material";
import { MinusCircle, PlusCircle, Share } from "@phosphor-icons/react";

export function PaymentsFilterRow() {
	return (
		<Box
			sx={{
				border: 0,
				px: 2,
				py: 2,
				bgcolor: "background.paper",
				justifyContent: "space-between",
			}}
		>
			<Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
				{/* Payment ID Filter */}
				<Stack
					direction="row"
					spacing={0.5}
					alignItems="center"
					sx={{ border: 1, borderColor: "divider", borderRadius: 1, px: 1 }}
				>
					<MinusCircle size={16} />
					<Typography variant="inherit" sx={{ mr: 1 }}>
						Payment ID:
					</Typography>
					<Input
						value="9f3b5c9a-32e3-41ec-bc1b-d51c7505d267"
						placeholder="9f3b5c9a-32e3-41ec-bc1b-d51c7505d267"
						disableUnderline
						readOnly
						sx={{
							color: "primary.main",
						}}
						onClick={(e) => {
							e.preventDefault();
						}}
					/>
				</Stack>

				{/* Date and time Filter */}
				<Button
					variant="outlined"
					color="secondary"
					startIcon={<PlusCircle size={16} />}
					onClick={(e) => {
						e.preventDefault();
						// Dummy - do nothing
					}}
				>
					Date and time
				</Button>

				{/* More filters */}
				<Button
					variant="outlined"
					color="secondary"
					startIcon={<PlusCircle size={16} />}
					onClick={(e) => {
						e.preventDefault();
						// Dummy - do nothing
					}}
				>
					More filters
				</Button>

				<Box sx={{ flex: 1 }} />

				{/* Clear filters */}
				<Link
					component="button"
					variant="body2"
					onClick={(e) => {
						e.preventDefault();
					}}
					sx={{ textDecoration: "none", color: "primary.main" }}
				>
					Clear filters
				</Link>

				{/* Export */}
				<Button
					variant="outlined"
					color="secondary"
					startIcon={<Share size={16} />}
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					Export
				</Button>
			</Stack>
		</Box>
	);
}
