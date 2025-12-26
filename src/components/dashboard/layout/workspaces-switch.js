"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretUpDownIcon } from "@phosphor-icons/react/dist/ssr/CaretUpDown";

import { usePayments } from "@/hooks/use-payments";
import { usePopover } from "@/hooks/use-popover";

import { WorkspacesPopover } from "./workspaces-popover";

export function WorkspacesSwitch() {
	const popover = usePopover();
	const merchantId = process.env.NEXT_PUBLIC_MERCHANT_ID;
	const { allPayments, loading } = usePayments(merchantId);

	const label = React.useMemo(() => {
		if (allPayments && allPayments.length > 0) {
			const paymentWithLabel = allPayments.find((payment) => payment.label);
			return paymentWithLabel?.label || null;
		}
		return null;
	}, [allPayments]);

	return (
		<React.Fragment>
			<Stack
				direction="row"
				onClick={popover.handleOpen}
				ref={popover.anchorRef}
				spacing={2}
				sx={{
					alignItems: "center",
					border: "1px solid var(--Workspaces-border-color)",
					borderRadius: "12px",
					cursor: "pointer",
					p: "4px 8px",
				}}
			>
				<Avatar src={"/assets/workspace-avatar-1.png"} variant="rounded" />
				<Box sx={{ flex: "1 1 auto" }}>
					<Typography color="var(--Workspaces-title-color)" variant="subtitle3">
						{loading ? "Loading..." : label}
					</Typography>
				</Box>
				<CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
			</Stack>
			<WorkspacesPopover
				anchorEl={popover.anchorRef.current}
				onChange={popover.handleClose}
				onClose={popover.handleClose}
				open={popover.open}
				label={loading ? "Loading..." : label}
			/>
		</React.Fragment>
	);
}
