export function isNavItemActive({ disabled, external, href, matcher, pathname }) {
	if (disabled || !href || external) {
		return false;
	}
	const hrefPath = href.split("?")[0];
	const pathnamePath = pathname.split("?")[0];

	if (matcher) {
		if (matcher.type === "startsWith") {
			return pathnamePath.startsWith(matcher.href.split("?")[0]);
		}

		if (matcher.type === "equals") {
			return pathnamePath === matcher.href.split("?")[0];
		}

		return false;
	}

	return pathnamePath === hrefPath;
}
