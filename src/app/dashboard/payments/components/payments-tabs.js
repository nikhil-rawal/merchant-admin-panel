"use client";

import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { DUMMY_TAB_COUNTS, TABS } from "../constants/constants";

export function PaymentsTabs({ activeTab, onTabChange }) {
	if (!activeTab || !onTabChange) {
		return null;
	}

	return (
		<Tabs value={activeTab} onChange={onTabChange} sx={{ borderBottom: "1px solid", borderColor: "divider", mb: 2 }}>
			{TABS.map((tab) => (
				<Tab
					key={tab.value}
					label={
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<span>{tab.label}</span>
							<Box
								sx={{
									bgcolor: "action.hover",
									borderRadius: 1,
									px: 1,
									py: 0.25,
									minWidth: "20px",
									textAlign: "center",
									color: "text.primary",
								}}
							>
								<Typography variant="caption" fontWeight={600}>
									{DUMMY_TAB_COUNTS[tab.value] ?? 0}
								</Typography>
							</Box>
						</Box>
					}
					value={tab.value}
				/>
			))}
		</Tabs>
	);
}
