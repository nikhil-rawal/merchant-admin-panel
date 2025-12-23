"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretUpDownIcon } from "@phosphor-icons/react/dist/ssr/CaretUpDown";

import { usePopover } from "@/hooks/use-popover";

import { useMerchantId } from "../../../hooks/use-merchant-id";
import { WorkspacesPopover } from "./workspaces-popover";

export function WorkspacesSwitch() {
	const popover = usePopover();
	const merchantId = useMerchantId();

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
						{merchantId}
					</Typography>
				</Box>
				<CaretUpDownIcon color="var(--Workspaces-expand-color)" fontSize="var(--icon-fontSize-sm)" />
			</Stack>
			<WorkspacesPopover
				anchorEl={popover.anchorRef.current}
				onChange={popover.handleClose}
				onClose={popover.handleClose}
				open={popover.open}
				merchantId={merchantId}
			/>
		</React.Fragment>
	);
}
