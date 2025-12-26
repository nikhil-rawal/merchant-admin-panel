import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatAmount = (amountInCents) => {
	const amount = Number(amountInCents) || 0;
	if (!Number.isFinite(amount)) return "0.00";
	return (amount / 100).toFixed(2);
};

export const maskPaymentId = (id = "") => (!id || id.length <= 8 ? id || "-" : `${id.slice(0, 6)}…${id.slice(-4)}`);

export const formatDay = (dateString) =>
	dateString ? dayjs(dateString).tz(dayjs.tz.guess()).format("MMM D, YYYY") : "-";

export const formatTime = (dateString) => (dateString ? dayjs(dateString).tz(dayjs.tz.guess()).format("hh:mm A") : "-");

export const formatAccountRef = (ref) => {
	if (!ref || ref.length < 4) return ref || "Account N/A";
	const match = ref.match(/^([A-Z]{2})(.*?)(\d{4})$/);
	if (match) {
		const [, countryCode, , lastFour] = match;
		return `${countryCode} **** ${lastFour}`;
	}
	const lastFour = ref.slice(-4);
	return `**** ${lastFour}`;
};
