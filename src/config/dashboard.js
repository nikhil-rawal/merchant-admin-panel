import { paths } from "@/paths";

export const dashboardConfig = {
	layout: "vertical",
	navColor: "discrete",
	navItems: [
		{
			key: "dashboards",
			items: [{ key: "overview", title: "Overview", icon: "house" }],
		},
		{
			key: "payments",
			items: [
				{
					key: "[payments]",
					title: "Payments",
					href: paths.dashboard.payments(),
					icon: "currency-dollar-simple",
					matcher: { type: "startsWith", href: paths.dashboard.payments("") },
				},
			],
		},
		{
			key: "customers",
			items: [
				{
					key: "[customers]",
					title: "Customers",
					icon: "users",
				},
			],
		},
	],
};
