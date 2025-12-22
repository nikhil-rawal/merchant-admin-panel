import { paths } from "@/paths";

export const dashboardConfig = {
	layout: "vertical",
	navColor: "evident",
	navItems: [
		{
			key: "dashboards",
			title: "Dashboards",
			items: [{ key: "overview", title: "Overview", href: paths.dashboard.overview, icon: "house" }],
		},
		{
			key: "misc",
			title: "Misc",
			items: [{ key: "[payments]", title: "Payments", href: paths.dashboard.payments, icon: "currency-dollar-simple" }],
		},
	],
};
