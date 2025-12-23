export const TABS = [
	{ label: "All", value: "all" },
	{ label: "Successful", value: "successful" },
	{ label: "Cancelled", value: "cancelled" },
	{ label: "Pending", value: "pending" },
	{ label: "Failed", value: "failed" },
];

export const STATUS_MAP = {
	successful: ["PAID", "PAID_RECEIVED", "FORCE_PAID"],
	cancelled: ["CANCELLED", "EXPIRED"],
	pending: ["NEW", "PENDING", "BANK_CONNECTION_FAILED", "AWAITING_CONFIRMATION", "PROCESSING"],
	failed: ["FAILED", "AUTH_FAILED", "EXECUTE_FAILED"],
};

export const DUMMY_PAYMENT_METHOD = [
	{
		label: "Societe Generale - Personal",
		order_ref: "DE1234567890",
		icon: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Logo-societe-generale.jpg",
	},
	{
		label: "Allianz Banque",
		order_ref: "AB1234567890",
		icon: "https://companies-assets.infonet.fr/companies/logos/572199461.webp",
	},
	{
		label: "Deutsche Bank AG",
		order_ref: "DBG1234567890",
		icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Deutsche_Bank_logo_without_wordmark.svg/330px-Deutsche_Bank_logo_without_wordmark.svg.png",
	},
	{
		label: "Societe Generale - Personal",
		order_ref: "SGP1234567890",
		icon: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Logo-societe-generale.jpg",
	},
	{
		label: "La Banque Postale",
		order_ref: "LBP1234567890",
		icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NtcT8A1H8veO8lYK6VASva4OK0MUrHUNaA&s",
	},
];

export const DUMMY_CUSTOMER = [
	{
		name: "John Doe",
		email: "john.doe@example.com",
	},
	{
		name: "Harvey Specter",
		email: "harvey.specter@example.com",
	},
	{
		name: "Mike Ross",
		email: "mike.ross@example.com",
	},
	{
		name: "Rachel Zane",
		email: "rachel.zane@example.com",
	},
	{
		name: "Donna Paulsen",
		email: "donna.paulsen@example.com",
	},
];

export const DUMMY_TAB_COUNTS = {
	all: 5,
	successful: 2,
	cancelled: 1,
	pending: 1,
	failed: 1,
};
