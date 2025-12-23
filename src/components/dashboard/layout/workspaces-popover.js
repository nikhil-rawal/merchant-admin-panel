"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export function WorkspacesPopover({ anchorEl, onChange, onClose, open = false, merchantId }) {
	return (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			onClose={onClose}
			open={open}
			slotProps={{ paper: { sx: { width: "250px" } } }}
			transformOrigin={{ horizontal: "right", vertical: "top" }}
		>
			<MenuItem
				onClick={() => {
					onChange?.(merchantId);
					onClose();
				}}
			>
				<ListItemAvatar>
					<Avatar src={"/assets/workspace-avatar-1.png"} variant="rounded" />
				</ListItemAvatar>
				<Typography
					color="var(--Workspaces-caption-color)"
					variant="caption"
					noWrap
					sx={{
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{merchantId}
				</Typography>
			</MenuItem>
		</Menu>
	);
}
