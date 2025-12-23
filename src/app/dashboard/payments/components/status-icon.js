import React from "react";
import { CheckFat, Prohibit, Star, XCircle } from "@phosphor-icons/react";

export const STATUS_ICON = {
	PAID: CheckFat,
	PAID_RECEIVED: CheckFat,
	FORCE_PAID: CheckFat,
	CANCELLED: Prohibit,
	EXPIRED: Prohibit,
	NEW: Star,
	PENDING: Star,
	BANK_CONNECTION_FAILED: Star,
	AWAITING_CONFIRMATION: Star,
	PROCESSING: Star,
	FAILED: XCircle,
	AUTH_FAILED: XCircle,
	EXECUTE_FAILED: XCircle,
};

const STATUS_TO_ICON_NAME = {
	PAID: "CheckFat",
	PAID_RECEIVED: "CheckFat",
	FORCE_PAID: "CheckFat",
	CANCELLED: "Prohibit",
	EXPIRED: "Prohibit",
	NEW: "Star",
	PENDING: "Star",
	BANK_CONNECTION_FAILED: "Star",
	AWAITING_CONFIRMATION: "Star",
	PROCESSING: "Star",
	FAILED: "XCircle",
	AUTH_FAILED: "XCircle",
	EXECUTE_FAILED: "XCircle",
};

const ICON_NAME_STYLES = {
	CheckFat: {
		icon: "success",
		style: { strokeWidth: 2, fill: "green" },
	},
	Prohibit: {
		icon: "warning",
		style: { strokeWidth: 2, fill: "orange" },
	},
	Star: {
		icon: "info",
		style: { strokeWidth: 2, fill: "blue" },
	},
	XCircle: {
		icon: "error",
		style: { strokeWidth: 2, fill: "red" },
	},
};

export function getStatusStyles(status) {
	const iconName = STATUS_TO_ICON_NAME[status] || "Star";
	return (
		ICON_NAME_STYLES[iconName] || {
			icon: "text.secondary",
		}
	);
}

export function StatusIcon({ status, size = 16 }) {
	const Icon = STATUS_ICON[status] || Star;
	return <Icon size={size} />;
}
