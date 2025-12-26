import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";

import { appConfig } from "@/config/app";

import PaymentsTable from "./paymentsTable/payments-table";

export const metadata = { title: `Payments | Dashboard | ${appConfig.name}` };

export default async function Page({ searchParams }) {
	const params = await searchParams;
	const merchantId = params?.merchant_id || process.env.NEXT_PUBLIC_MERCHANT_ID;

	return (
		<Box
			sx={{
				maxWidth: "var(--Content-maxWidth)",
				m: "var(--Content-margin)",
				p: "var(--Content-padding)",
				width: "var(--Content-width)",
			}}
		>
			<Stack spacing={4}>
				<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ alignItems: "flex-start" }}>
					<Box sx={{ flex: "1 1 auto" }}>
						<Typography variant="h4">Payments</Typography>
					</Box>
					<div style={{ display: "none" }}>
						<Button startIcon={<PlusIcon />} variant="contained">
							Add Payment
						</Button>
					</div>
				</Stack>
				<PaymentsTable merchantId={merchantId} />
			</Stack>
		</Box>
	);
}
