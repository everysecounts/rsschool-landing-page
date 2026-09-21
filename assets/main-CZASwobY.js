//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/utils/createElement.js
function createElement(tag, attributes = {}, ...children) {
	const element = document.createElement(tag);
	Object.entries(attributes).forEach(([name, value]) => {
		if (name === "className") element.className = value;
		else element.setAttribute(name, value);
	});
	element.append(...children);
	return element;
}
//#endregion
//#region src/utils/createSvg.js
function createSvg(tag, attributes = {}, ...children) {
	const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
	Object.entries(attributes).forEach(([name, value]) => {
		element.setAttribute(name, value);
	});
	element.append(...children);
	return element;
}
//#endregion
//#region src/utils/sections.js
var pageSections = /* @__PURE__ */ new Map();
var permanentSections = /* @__PURE__ */ new Map();
function registerSection(id, element, options = {}) {
	if (!id || !element) return;
	if (options.permanent) {
		permanentSections.set(id, element);
		return;
	}
	pageSections.set(id, element);
}
function getSection(id) {
	return pageSections.get(id) ?? permanentSections.get(id) ?? null;
}
function clearSections() {
	pageSections.clear();
}
//#endregion
//#region src/utils/paths.js
function getBaseUrl() {
	return "/rsschool-landing-page/";
}
function getPageUrl(path) {
	return `${getBaseUrl()}${path.replace(/^\/+/, "")}`;
}
function getHomeHashUrl(hash) {
	return `${getBaseUrl()}#${hash}`;
}
function getAssetUrl(path) {
	return `${getBaseUrl()}${path.replace(/^\/+/, "")}`;
}
function getPathname(pathname) {
	const base = getBaseUrl().replace(/\/$/, "");
	return (pathname.startsWith(base) ? pathname.slice(base.length) : pathname) || "/";
}
//#endregion
//#region src/components/Header/Controls/menuIcon.js
function menuIcon$3(className) {
	return createSvg("svg", {
		width: 20,
		height: 20,
		class: className,
		viewBox: "0 0 20 20",
		fill: "none",
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("path", {
		d: "M14.167 9.76667V11.6667C14.167 14.8883 11.5553 17.5 8.33366 17.5C5.112 17.5 2.50033 14.8883 2.50033 11.6667V9.76667C2.50033 9.4353 2.76896 9.16667 3.10033 9.16667H13.567C13.8984 9.16667 14.167 9.4353 14.167 9.76667Z",
		stroke: "currentColor",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}), createSvg("path", {
		d: "M10.0003 7.50008C10.0003 6.66675 10.5956 5.83341 11.786 5.83341C13.101 5.83341 14.167 4.76743 14.167 3.45246V2.91675",
		stroke: "currentColor",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}), createSvg("path", {
		d: "M6.66634 7.5V7.08333C6.66634 5.70262 7.78563 4.58333 9.16634 4.58333C10.0868 4.58333 10.833 3.83714 10.833 2.91667V2.5",
		stroke: "currentColor",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}), createSvg("path", {
		d: "M13.333 9.16675H15.4163C16.5669 9.16675 17.4997 10.0995 17.4997 11.2501C17.4997 12.4007 16.5669 13.3334 15.4163 13.3334H14.1663",
		stroke: "currentColor",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}));
}
//#endregion
//#region src/components/Header/MenuLink.js
function createMenuLink(className, iconClassName, onLinkClick) {
	const link = createElement("a", {
		className,
		href: getPageUrl("menu")
	}, "Menu", menuIcon$3(iconClassName));
	if (onLinkClick) link.addEventListener("click", (event) => {
		onLinkClick(event, link);
	});
	return link;
}
//#endregion
//#region src/components/Header/Controls/ThemeSwitcher/themeIcons.js
var SUN_PATH = "M10 3V1C10 0.45 10.45 0 11 0C11.55 0 12 0.45 12 1V3C12 3.55 11.55 4 11 4C10.45 4 10 3.55 10 3ZM17.36 6.05L18.77 4.63C19.16 4.24 19.16 3.61 18.77 3.22C18.38 2.83 17.75 2.83 17.36 3.22L15.95 4.64C15.56 5.03 15.56 5.66 15.95 6.05C16.34 6.44 16.97 6.44 17.36 6.05ZM21 10H19C18.45 10 18 10.45 18 11C18 11.55 18.45 12 19 12H21C21.55 12 22 11.55 22 11C22 10.45 21.55 10 21 10ZM11 18C10.45 18 10 18.45 10 19V21C10 21.55 10.45 22 11 22C11.55 22 12 21.55 12 21V19C12 18.45 11.55 18 11 18ZM4.64 6.05L3.22 4.64C2.83 4.25 2.83 3.61 3.22 3.23C3.61 2.85 4.25 2.84 4.63 3.23L6.04 4.64C6.43 5.03 6.43 5.67 6.04 6.05C5.65 6.43 5.02 6.44 4.64 6.05ZM15.95 15.95C15.56 16.34 15.56 16.98 15.95 17.36L17.36 18.77C17.75 19.16 18.39 19.16 18.77 18.77C19.16 18.38 19.16 17.74 18.77 17.36L17.36 15.95C16.98 15.56 16.34 15.56 15.95 15.95ZM1 12H3C3.55 12 4 11.55 4 11C4 10.45 3.55 10 3 10H1C0.45 10 0 10.45 0 11C0 11.55 0.45 12 1 12ZM4.64 18.78L6.05 17.37C6.44 16.98 6.44 16.34 6.05 15.96C5.66 15.58 5.02 15.57 4.64 15.96L3.23 17.37C2.84 17.76 2.84 18.4 3.23 18.78C3.61 19.17 4.25 19.17 4.64 18.78ZM11 5C7.69 5 5 7.69 5 11C5 14.31 7.69 17 11 17C14.31 17 17 14.31 17 11C17 7.69 14.31 5 11 5Z";
var MOON_PATH = "M9 0C4.03 0 0 4.03 0 9C0 13.97 4.03 18 9 18C13.97 18 18 13.97 18 9C18 8.54 17.96 8.08 17.9 7.64C16.92 9.01 15.32 9.9 13.5 9.9C10.52 9.9 8.1 7.48 8.1 4.5C8.1 2.69 8.99 1.08 10.36 0.0999999C9.92 0.0399999 9.46 0 9 0Z";
var ThemeSwitcher_module_default = {
	switcher: "_switcher_y8w0w_1",
	option: "_option_y8w0w_10",
	sun: "_sun_y8w0w_36",
	moon: "_moon_y8w0w_40"
};
//#endregion
//#region src/components/Header/Controls/ThemeSwitcher/ThemeSwitcher.js
var THEME_STORAGE_KEY = "theme";
function icon$1(path, viewBox, size) {
	return createSvg("svg", {
		viewBox,
		width: size,
		height: size,
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("path", {
		d: path,
		fill: "currentColor"
	}));
}
var ThemeSwitcher = class {
	constructor() {
		this.sunButton = createElement("button", {
			className: `${ThemeSwitcher_module_default.option} ${ThemeSwitcher_module_default.sun}`,
			type: "button",
			"aria-label": "Light theme",
			"aria-pressed": "false"
		}, icon$1(SUN_PATH, "0 0 22 22", 22));
		this.moonButton = createElement("button", {
			className: `${ThemeSwitcher_module_default.option} ${ThemeSwitcher_module_default.moon}`,
			type: "button",
			"aria-label": "Dark theme",
			"aria-pressed": "false"
		}, icon$1(MOON_PATH, "0 0 18 18", 18));
		this.element = createElement("div", { className: ThemeSwitcher_module_default.switcher }, this.sunButton, this.moonButton);
		this.bindEvents();
		this.updateState();
	}
	bindEvents() {
		this.sunButton.addEventListener("click", () => {
			this.setTheme("light");
		});
		this.moonButton.addEventListener("click", () => {
			this.setTheme("dark");
		});
	}
	getTheme() {
		return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
	}
	setTheme(theme) {
		if (theme === this.getTheme()) return;
		localStorage.setItem(THEME_STORAGE_KEY, theme);
		this.updateState();
	}
	updateState() {
		const theme = this.getTheme();
		const isLightTheme = theme === "light";
		document.documentElement.dataset.theme = theme;
		this.element.dataset.theme = theme;
		this.sunButton.disabled = isLightTheme;
		this.moonButton.disabled = !isLightTheme;
		this.sunButton.setAttribute("aria-pressed", String(isLightTheme));
		this.moonButton.setAttribute("aria-pressed", String(!isLightTheme));
	}
};
var Controls_module_default = {
	controls: "_controls_19ay7_1",
	menu: "_menu_19ay7_17",
	menuActive: "_menuActive_19ay7_33",
	menuIcon: "_menuIcon_19ay7_38",
	burger: "_burger_19ay7_67",
	burgerOpen: "_burgerOpen_19ay7_109"
};
//#endregion
//#region src/components/Header/Controls/Controls.js
var Controls = class {
	constructor(onBurgerClick, onLinkClick) {
		const themeSwitcher = new ThemeSwitcher();
		this.menuLink = createMenuLink(Controls_module_default.menu, Controls_module_default.menuIcon, (event, link) => {
			if (this.menuLink.classList.contains(Controls_module_default.menuActive)) {
				event.preventDefault();
				return;
			}
			onLinkClick?.(event, link);
		});
		this.burger = createElement("button", {
			className: Controls_module_default.burger,
			type: "button",
			"aria-label": "Open menu",
			"aria-expanded": "false"
		}, createElement("span"), createElement("span"));
		this.burger.addEventListener("click", onBurgerClick);
		this.element = createElement("div", { className: Controls_module_default.controls }, themeSwitcher.element, this.menuLink, this.burger);
	}
	setActivePath(path) {
		const isMenuPage = path === "/menu";
		this.menuLink.classList.toggle(Controls_module_default.menuActive, isMenuPage);
		if (isMenuPage) this.menuLink.setAttribute("aria-current", "page");
		else this.menuLink.removeAttribute("aria-current");
	}
	setBurgerState(isOpen) {
		this.burger.classList.toggle(Controls_module_default.burgerOpen, isOpen);
		this.burger.setAttribute("aria-expanded", String(isOpen));
		this.burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
	}
};
//#endregion
//#region src/components/Header/Logo/logoPaths.js
var LOGO_PATHS = [
	{
		kind: "accent",
		d: "M69 25C69 35.4934 60.4934 44 50 44C39.5066 44 31 35.4934 31 25C31 14.5066 39.5066 6 50 6C60.4934 6 69 14.5066 69 25Z"
	},
	{
		kind: "primary",
		d: "M95.6784 22.2913C95.8856 22.2732 96.0534 22.3548 96.1817 22.5364C96.326 22.7165 96.4127 22.9739 96.442 23.3086C96.4922 23.8824 96.4 24.3884 96.1652 24.8265C95.7789 25.5509 95.2359 26.1365 94.5362 26.5832C93.8524 27.0285 93.0084 27.295 92.0042 27.3829C90.4741 27.5168 89.2469 27.1664 88.3226 26.3318C87.3969 25.4812 86.8658 24.2749 86.7291 22.7129C86.6329 21.6131 86.7748 20.5727 87.1547 19.5919C87.5333 18.5951 88.1046 17.7822 88.8687 17.1532C89.6487 16.5229 90.5568 16.1623 91.5928 16.0717C92.5173 15.9908 93.2829 16.2049 93.8895 16.714C94.4948 17.2071 94.8386 17.9239 94.9209 18.8643C95.0171 19.9641 94.7016 20.9473 93.9743 21.814C93.2617 22.6633 91.9772 23.4021 90.1208 24.0303C90.5675 24.73 91.2451 25.0401 92.1537 24.9606C92.8072 24.9035 93.3279 24.7053 93.7158 24.3662C94.1197 24.0257 94.5692 23.4725 95.0643 22.7064C95.2346 22.4506 95.4393 22.3122 95.6784 22.2913ZM91.3914 18.4503C90.8016 18.5019 90.3295 18.8885 89.9751 19.6102C89.6365 20.3304 89.5098 21.1767 89.5949 22.149L89.5991 22.1968C90.5199 21.8914 91.2318 21.4918 91.7347 20.9981C92.2376 20.5044 92.4632 19.9626 92.4117 19.3729C92.3852 19.0701 92.2766 18.8386 92.0859 18.6786C91.9098 18.5013 91.6783 18.4252 91.3914 18.4503Z"
	},
	{
		kind: "primary",
		d: "M83.2976 28.1446C81.7356 28.2813 80.4779 27.9497 79.5245 27.1497C78.5857 26.3324 78.0529 25.1985 77.926 23.7481C77.813 22.457 77.969 21.303 78.394 20.2861C78.819 19.2692 79.4149 18.4622 80.1818 17.8651C80.9487 17.268 81.7784 16.9304 82.671 16.8523C83.5477 16.7756 84.2481 16.9793 84.7723 17.4635C85.311 17.9303 85.6159 18.5702 85.6871 19.383C85.7456 20.0525 85.6437 20.6316 85.3813 21.1203C85.1348 21.6076 84.7725 21.8722 84.2944 21.9141C83.9915 21.9406 83.7382 21.8904 83.5344 21.7637C83.3465 21.6356 83.2414 21.444 83.2191 21.189C83.2093 21.0774 83.2141 20.9485 83.2334 20.8023C83.2527 20.6561 83.2676 20.5504 83.278 20.4852C83.3367 20.2392 83.357 20.0125 83.3389 19.8053C83.3208 19.5981 83.2511 19.4436 83.1297 19.3418C83.0243 19.2386 82.876 19.1953 82.6847 19.2121C82.3181 19.2441 81.9901 19.4415 81.7006 19.8041C81.4097 20.1508 81.193 20.6114 81.0506 21.186C80.9081 21.7606 80.8661 22.3826 80.9247 23.0521C81.0865 24.901 81.9723 25.7551 83.5821 25.6142C84.2356 25.557 84.9181 25.2805 85.6296 24.7846C86.3556 24.2714 87.0469 23.5444 87.7034 22.6036C87.8752 22.3637 88.0806 22.2333 88.3197 22.2124C88.5269 22.1942 88.6946 22.2759 88.8229 22.4574C88.9672 22.6375 89.054 22.895 89.0832 23.2297C89.1362 23.8354 89.028 24.3427 88.7587 24.7518C88.0904 25.7418 87.2526 26.5378 86.2452 27.1399C85.2524 27.7247 84.2699 28.0596 83.2976 28.1446Z"
	},
	{
		kind: "primary",
		d: "M69.548 29.3476C68.9423 29.4006 68.4841 29.1195 68.1733 28.5042C67.8784 27.8876 67.6696 26.8779 67.5469 25.4753C67.3656 23.4032 67.4882 21.4089 67.9148 19.4924C68.0179 19.0177 68.2197 18.6627 68.5203 18.4276C68.8355 18.1752 69.288 18.0232 69.8778 17.9716C70.1965 17.9437 70.4232 17.964 70.5577 18.0326C70.6921 18.1011 70.7692 18.2469 70.7887 18.4701C70.811 18.7251 70.7416 19.3094 70.5806 20.2229C70.477 20.8744 70.3983 21.4434 70.3445 21.93C70.2907 22.4165 70.2626 23.0132 70.2602 23.7201C70.6663 22.3033 71.1584 21.136 71.7366 20.2181C72.3148 19.3002 72.8987 18.6308 73.4883 18.2098C74.0938 17.7874 74.6595 17.5532 75.1855 17.5072C76.2215 17.4166 76.7849 17.8893 76.8755 18.9253C76.8936 19.1325 76.8658 19.6409 76.7921 20.4504C76.7204 21.0991 76.6915 21.5032 76.7054 21.6626C76.7542 22.2204 76.9779 22.4819 77.3764 22.4471C77.8227 22.408 78.3658 22.0072 79.0057 21.2445C79.1948 21.0191 79.4009 20.8967 79.6241 20.8772C79.8313 20.8591 79.9991 20.9408 80.1274 21.1223C80.2702 21.2864 80.3549 21.5199 80.3814 21.8228C80.433 22.4125 80.314 22.8887 80.0245 23.2513C79.6187 23.7526 79.1275 24.1971 78.5511 24.5848C77.9893 24.9552 77.3736 25.1697 76.7042 25.2282C75.8594 25.3021 75.1951 25.1434 74.7111 24.7521C74.2431 24.3594 73.977 23.7965 73.9129 23.0633C73.892 22.8242 73.895 22.583 73.9219 22.3397C73.9258 22.0182 73.923 21.8016 73.9132 21.69C73.8909 21.435 73.7921 21.3151 73.6167 21.3305C73.3777 21.3514 73.0826 21.6503 72.7315 22.2271C72.395 22.7865 72.0738 23.5213 71.768 24.4314C71.4621 25.3415 71.2322 26.2932 71.0782 27.2864C70.9684 28.0509 70.8058 28.5791 70.5904 28.8709C70.3896 29.1455 70.0421 29.3044 69.548 29.3476Z"
	},
	{
		kind: "primary",
		d: "M59.2452 30.2488C58.5279 30.3116 57.9096 30.0364 57.3902 29.4233C56.8853 28.7929 56.5897 27.9836 56.5032 26.9954C56.3986 25.8 56.3828 24.7012 56.4557 23.699C56.5273 22.6809 56.6975 21.5979 56.9665 20.4501C57.0841 19.958 57.2772 19.5958 57.546 19.3635C57.8148 19.1312 58.26 18.9878 58.8816 18.9334C59.2323 18.9028 59.4762 18.9376 59.6135 19.038C59.7667 19.1371 59.8531 19.2981 59.8726 19.5213C59.8838 19.6488 59.8337 20.0868 59.7226 20.8354C59.6148 21.4391 59.534 21.9842 59.4802 22.4707C59.3078 24.1722 59.246 25.3019 59.2948 25.8598C59.3241 26.1945 59.3849 26.4301 59.4771 26.5666C59.568 26.6871 59.7011 26.7397 59.8764 26.7244C60.1155 26.7035 60.3895 26.4386 60.6983 25.9297C61.023 25.4195 61.3421 24.6608 61.6555 23.6536C61.9849 22.6451 62.2788 21.4148 62.5372 19.9627C62.6229 19.4734 62.7842 19.114 63.0211 18.8845C63.2739 18.6535 63.6633 18.5151 64.1893 18.4691C64.5559 18.437 64.8151 18.4625 64.967 18.5456C65.1174 18.6127 65.203 18.7658 65.224 19.0049C65.2588 19.4034 65.1551 20.5127 64.9128 22.3327C64.645 24.412 64.532 25.6907 64.5739 26.1688C64.6004 26.4717 64.685 26.7052 64.8279 26.8694C64.9693 27.0176 65.1437 27.0827 65.3509 27.0645C65.6697 27.0366 66.0275 26.8126 66.4244 26.3924C66.8358 25.9549 67.3698 25.2657 68.0263 24.3249C68.198 24.0851 68.4035 23.9547 68.6425 23.9337C68.8498 23.9156 69.0175 23.9973 69.1458 24.1788C69.2901 24.3589 69.3768 24.6163 69.4061 24.9511C69.4619 25.5886 69.3537 26.096 69.0815 26.4731C68.4701 27.3779 67.7896 28.1361 67.04 28.7477C66.3064 29.358 65.4375 29.707 64.4334 29.7949C63.6683 29.8618 63.0766 29.6165 62.6585 29.0588C62.2562 28.4997 62.0084 27.6862 61.9149 26.6183C61.7388 27.7259 61.4055 28.5982 60.9152 29.2354C60.4235 29.8566 59.8668 30.1944 59.2452 30.2488Z"
	},
	{
		kind: "primary",
		d: "M57.5606 22.8796C57.7678 22.8614 57.9362 22.9511 58.0659 23.1485C58.1956 23.346 58.2744 23.6041 58.3023 23.9229C58.3692 24.688 58.1779 25.1625 57.7282 25.3463C56.8011 25.7647 55.7659 26.048 54.6225 26.1963C54.4367 27.5616 53.9332 28.6898 53.1117 29.5808C52.2888 30.4559 51.3115 30.9429 50.1799 31.0419C49.2235 31.1256 48.3824 30.9663 47.6566 30.564C46.9467 30.1603 46.383 29.5913 45.9654 28.8569C45.5478 28.1225 45.3 27.309 45.2219 26.4164C45.1159 25.205 45.2529 24.1089 45.6328 23.1281C46.0114 22.1313 46.5841 21.3343 47.351 20.7372C48.1165 20.1242 48.9933 19.7744 49.9816 19.688C51.1929 19.582 52.2022 19.9193 53.0093 20.6999C53.8309 21.4632 54.3592 22.453 54.5941 23.6691C55.339 23.5558 56.2177 23.3183 57.23 22.9567C57.3547 22.9136 57.4649 22.8879 57.5606 22.8796ZM50.1494 28.4908C50.6595 28.4462 51.0797 28.2007 51.41 27.7542C51.7563 27.3063 51.959 26.6863 52.0182 25.8941C51.4948 25.6026 51.0739 25.1977 50.7555 24.6795C50.4531 24.1599 50.2754 23.5972 50.2224 22.9916C50.2001 22.7365 50.2017 22.4794 50.2272 22.2202L50.1076 22.2307C49.4701 22.2864 48.9633 22.644 48.5873 23.3032C48.2259 23.9452 48.094 24.824 48.1916 25.9398C48.2683 26.8164 48.4942 27.4712 48.8694 27.9042C49.2605 28.3357 49.6872 28.5313 50.1494 28.4908Z"
	},
	{
		kind: "primary",
		d: "M40.3093 32.4354C39.4805 32.508 38.8262 32.3725 38.3464 32.029C37.8826 31.6841 37.6298 31.2726 37.5879 30.7944C37.5517 30.38 37.6717 30.0081 37.9481 29.6787C38.2244 29.3494 38.6575 29.1589 39.2472 29.1073C39.4544 29.0892 39.6956 29.0922 39.9708 29.1163C40.2604 29.1231 40.4777 29.1282 40.6226 29.1316C40.5704 28.7185 40.4406 28.3364 40.2332 27.9851C40.0417 27.6325 39.8038 27.3 39.5195 26.9876C39.2338 26.6592 38.9682 26.3773 38.7228 26.1418C38.3109 27.1254 37.8851 27.9497 37.4454 28.6145C37.0216 29.278 36.5472 29.9137 36.0222 30.5218C35.7604 30.8338 35.4701 31.0038 35.1513 31.0316C34.8963 31.054 34.6814 30.9844 34.5067 30.823C34.3306 30.6457 34.2307 30.4216 34.207 30.1506C34.1791 29.8318 34.2648 29.5272 34.4643 29.2367L34.7416 28.827C35.5235 27.6664 36.1068 26.7159 36.4918 25.9756C36.7223 25.4896 36.9874 24.8481 37.2871 24.0509C37.5853 23.2379 37.8735 22.4016 38.1517 21.542C38.3932 20.8142 38.9921 20.4085 39.9484 20.3248C40.3947 20.2858 40.709 20.2984 40.8913 20.3628C41.0736 20.4271 41.1725 20.547 41.1878 20.7223C41.1962 20.8179 41.1775 20.9722 41.1319 21.1849C41.0863 21.3977 41.0167 21.6126 40.9233 21.8296C40.6866 22.4285 40.5857 22.9272 40.6205 23.3257C40.6415 23.5647 40.7442 23.8208 40.9286 24.0937C41.1291 24.3653 41.4235 24.7009 41.8118 25.1006C42.3804 25.7254 42.8131 26.2657 43.11 26.7216C43.4214 27.1601 43.6015 27.6583 43.6503 28.2162C43.6642 28.3756 43.6678 28.6001 43.6611 28.8898C44.4156 28.5187 45.2617 27.6335 46.1993 26.2345C46.371 25.9946 46.5765 25.8642 46.8155 25.8433C47.0227 25.8252 47.1905 25.9069 47.3188 26.0884C47.4631 26.2685 47.5498 26.5259 47.5791 26.8606C47.6321 27.4663 47.5239 27.9737 47.2545 28.3827C46.544 29.4407 45.8382 30.185 45.1371 30.6158C44.4505 31.0292 43.5747 31.2985 42.5095 31.4238C41.9194 32.0215 41.186 32.3587 40.3093 32.4354Z"
	},
	{
		kind: "primary",
		d: "M36.6171 26.7357C36.8243 26.7175 36.9921 26.7992 37.1204 26.9807C37.2646 27.1608 37.3514 27.4183 37.3807 27.753C37.4365 28.3905 37.3283 28.8979 37.0561 29.2751C36.5291 30.0439 35.7502 30.7786 34.7193 31.4791C33.7044 32.1782 32.5833 32.5815 31.3559 32.6888C29.6823 32.8353 28.3436 32.4947 27.3396 31.667C26.3356 30.8394 25.7646 29.6365 25.6266 28.0586C25.5304 26.9588 25.6722 25.9185 26.0522 24.9376C26.4308 23.9408 27.0021 23.1279 27.7662 22.4989C28.5462 21.8686 29.4542 21.508 30.4903 21.4174C31.4147 21.3365 32.1803 21.5506 32.787 22.0597C33.3923 22.5528 33.7361 23.2696 33.8183 24.21C33.9145 25.3098 33.599 26.293 32.8718 27.1597C32.1591 28.009 30.8826 28.7471 29.0422 29.3739C29.5048 30.0722 30.294 30.3726 31.4098 30.275C32.127 30.2122 32.9183 29.894 33.7836 29.3204C34.6634 28.7295 35.4025 27.9983 36.0009 27.1269C36.1726 26.887 36.378 26.7566 36.6171 26.7357ZM30.2888 23.796C29.6991 23.8476 29.227 24.2342 28.8725 24.9559C28.534 25.6761 28.4073 26.5224 28.4923 27.4947L28.4965 27.5425C29.4174 27.2371 30.1293 26.8375 30.6322 26.3438C31.1351 25.8501 31.3607 25.3083 31.3091 24.7186C31.2826 24.4158 31.174 24.1843 30.9834 24.0243C30.8072 23.847 30.5757 23.7709 30.2888 23.796Z"
	},
	{
		kind: "primary",
		d: "M27.6906 27.5167C27.8978 27.4986 28.0656 27.5803 28.1939 27.7618C28.3382 27.9419 28.4249 28.1993 28.4542 28.5341C28.5086 29.1557 28.4004 29.6631 28.1296 30.0561C27.4454 31.0476 26.7351 31.8324 25.9987 32.4108C25.261 32.9733 24.3581 33.3012 23.2902 33.3946C22.2541 33.4853 21.3451 33.2837 20.5631 32.79C19.797 32.2949 19.028 31.3985 18.256 30.1009C17.6351 29.063 17.151 28.3023 16.8035 27.8188C16.4547 27.3193 16.119 26.9712 15.7967 26.7745C15.4903 26.5765 15.1198 26.4724 14.6852 26.4622C14.6508 26.8025 14.5595 27.8705 14.4114 29.6663C14.3537 30.4744 14.3165 30.9675 14.3 31.1456C14.2256 32.1319 13.9724 32.9089 13.5402 33.4767C13.1067 34.0286 12.4038 34.3471 11.4315 34.4321C10.3636 34.5256 9.38799 34.2977 8.50477 33.7486C7.63609 33.1822 6.9298 32.3606 6.38589 31.2839C5.84059 30.1913 5.50518 28.9277 5.37968 27.4932C5.1454 24.8154 5.40544 22.4638 6.15978 20.4383C6.93006 18.4115 8.10738 16.8148 9.69174 15.6483C11.2906 14.4644 13.1899 13.7763 15.3895 13.5838C16.9196 13.45 18.223 13.5688 19.2994 13.9404C20.3759 14.312 21.1968 14.8826 21.762 15.6523C22.3432 16.4206 22.6784 17.3148 22.7676 18.3349C22.8457 19.2275 22.7073 20.1229 22.3522 21.0213C22.0117 21.9023 21.4476 22.7066 20.66 23.434C19.8724 24.1614 18.8869 24.7375 17.7034 25.1622C18.4866 25.3025 19.1057 25.5856 19.5605 26.0116C20.0154 26.4376 20.4891 27.0787 20.9816 27.9351C21.5115 28.8524 22.0112 29.5153 22.4806 29.924C22.966 30.3312 23.4955 30.5098 24.0693 30.4596C24.5794 30.4149 25.0509 30.205 25.4838 29.8299C25.9154 29.4388 26.4456 28.7981 27.0744 27.9079C27.2461 27.6681 27.4515 27.5377 27.6906 27.5167ZM11.3837 26.727C10.8418 26.7744 10.4561 26.6797 10.2266 26.4428C10.013 26.2045 9.89225 25.9259 9.86436 25.6071C9.8309 25.2246 9.92394 24.9113 10.1435 24.6672C10.379 24.4218 10.6562 24.2851 10.9749 24.2572L11.5727 24.2049C11.691 22.6206 11.8123 21.2528 11.9364 20.1016C12.053 19.0474 12.6771 18.4708 13.8088 18.3718C14.7173 18.2923 15.2071 18.659 15.2782 19.4719C15.2936 19.6473 15.2975 19.7835 15.2899 19.8805L14.9199 23.9121C15.7764 23.789 16.5393 23.5134 17.2085 23.0855C17.8937 22.6561 18.4149 22.0966 18.7722 21.4068C19.1454 20.7156 19.2957 19.9556 19.2232 19.1268C19.1353 18.1226 18.7236 17.3636 17.988 16.8498C17.2524 16.3359 16.2232 16.1369 14.9002 16.2526C13.3382 16.3893 12.0016 16.8997 10.8904 17.7839C9.79381 18.6508 8.98568 19.8779 8.46605 21.4653C7.94503 23.0366 7.78003 24.9142 7.97108 27.0978C8.06033 28.1179 8.24063 28.9855 8.51198 29.7006C8.78334 30.4157 9.08648 30.9432 9.42139 31.2834C9.75631 31.6235 10.0592 31.7817 10.3302 31.7579C10.5374 31.7398 10.6957 31.6216 10.8051 31.4032C10.9304 31.1834 11.0127 30.839 11.052 30.3698L11.3837 26.727Z"
	},
	{
		kind: "primary",
		d: "M78.4033 54.0001V48.1819H82.1874V49.0654H79.4573V50.645H81.9914V51.5285H79.4573V53.1165H82.2101V54.0001H78.4033Z"
	},
	{
		kind: "primary",
		d: "M75.9698 49.7813C75.9433 49.5332 75.8316 49.34 75.6346 49.2017C75.4395 49.0635 75.1857 48.9943 74.8732 48.9943C74.6535 48.9943 74.4651 49.0275 74.3079 49.0938C74.1507 49.1601 74.0304 49.25 73.9471 49.3637C73.8638 49.4773 73.8211 49.607 73.8192 49.7529C73.8192 49.8741 73.8467 49.9792 73.9016 50.0682C73.9585 50.1572 74.0352 50.233 74.1317 50.2955C74.2283 50.3561 74.3353 50.4072 74.4528 50.4489C74.5702 50.4906 74.6886 50.5256 74.8079 50.554L75.3533 50.6904C75.573 50.7415 75.7842 50.8106 75.9869 50.8977C76.1914 50.9849 76.3742 51.0947 76.5352 51.2273C76.698 51.3599 76.8268 51.5199 76.9215 51.7074C77.0162 51.8949 77.0636 52.1146 77.0636 52.3665C77.0636 52.7074 76.9764 53.0076 76.8022 53.2671C76.628 53.5246 76.3761 53.7263 76.0465 53.8722C75.7189 54.0161 75.3221 54.0881 74.8562 54.0881C74.4035 54.0881 74.0105 54.018 73.6772 53.8779C73.3458 53.7377 73.0863 53.5332 72.8988 53.2642C72.7132 52.9953 72.6128 52.6676 72.5977 52.2813H73.6346C73.6497 52.4839 73.7122 52.6525 73.8221 52.787C73.9319 52.9214 74.0749 53.0218 74.2511 53.0881C74.4291 53.1544 74.628 53.1875 74.8477 53.1875C75.0768 53.1875 75.2776 53.1534 75.4499 53.0852C75.6242 53.0152 75.7605 52.9186 75.859 52.7955C75.9575 52.6705 76.0077 52.5246 76.0096 52.358C76.0077 52.2065 75.9632 52.0815 75.8761 51.983C75.7889 51.8826 75.6668 51.7993 75.5096 51.733C75.3543 51.6648 75.1725 51.6042 74.9641 51.5512L74.3022 51.3807C73.823 51.2576 73.4442 51.071 73.1658 50.821C72.8893 50.5692 72.7511 50.2349 72.7511 49.8182C72.7511 49.4754 72.8439 49.1752 73.0295 48.9176C73.217 48.6601 73.4717 48.4602 73.7937 48.3182C74.1156 48.1743 74.4802 48.1023 74.8874 48.1023C75.3003 48.1023 75.6621 48.1743 75.9727 48.3182C76.2852 48.4602 76.5304 48.6582 76.7085 48.912C76.8865 49.1638 76.9783 49.4536 76.984 49.7813H75.9698Z"
	},
	{
		kind: "primary",
		d: "M70.2086 48.1819H71.2626V51.983C71.2626 52.3997 71.1641 52.7662 70.9672 53.0825C70.7721 53.3987 70.4975 53.6459 70.1433 53.8239C69.7891 54.0001 69.3753 54.0881 68.9018 54.0881C68.4264 54.0881 68.0117 54.0001 67.6575 53.8239C67.3033 53.6459 67.0287 53.3987 66.8336 53.0825C66.6386 52.7662 66.541 52.3997 66.541 51.983V48.1819H67.595V51.895C67.595 52.1374 67.648 52.3533 67.7541 52.5427C67.862 52.7321 68.0136 52.8807 68.2086 52.9887C68.4037 53.0948 68.6348 53.1478 68.9018 53.1478C69.1689 53.1478 69.3999 53.0948 69.595 52.9887C69.792 52.8807 69.9435 52.7321 70.0495 52.5427C70.1556 52.3533 70.2086 52.1374 70.2086 51.895V48.1819Z"
	},
	{
		kind: "primary",
		d: "M65.1444 51.0909C65.1444 51.7178 65.027 52.2548 64.7922 52.7017C64.5592 53.1468 64.241 53.4877 63.8376 53.7245C63.4361 53.9612 62.9806 54.0796 62.4711 54.0796C61.9617 54.0796 61.5052 53.9612 61.1018 53.7245C60.7003 53.4858 60.3821 53.144 60.1473 52.6989C59.9143 52.2519 59.7979 51.7159 59.7979 51.0909C59.7979 50.464 59.9143 49.9281 60.1473 49.483C60.3821 49.036 60.7003 48.6942 61.1018 48.4574C61.5052 48.2207 61.9617 48.1023 62.4711 48.1023C62.9806 48.1023 63.4361 48.2207 63.8376 48.4574C64.241 48.6942 64.5592 49.036 64.7922 49.483C65.027 49.9281 65.1444 50.464 65.1444 51.0909ZM64.0848 51.0909C64.0848 50.6496 64.0157 50.2775 63.8774 49.9745C63.741 49.6695 63.5516 49.4394 63.3092 49.2841C63.0668 49.1269 62.7874 49.0483 62.4711 49.0483C62.1549 49.0483 61.8755 49.1269 61.6331 49.2841C61.3907 49.4394 61.2003 49.6695 61.0621 49.9745C60.9257 50.2775 60.8575 50.6496 60.8575 51.0909C60.8575 51.5322 60.9257 51.9053 61.0621 52.2102C61.2003 52.5133 61.3907 52.7434 61.6331 52.9006C61.8755 53.0559 62.1549 53.1335 62.4711 53.1335C62.7874 53.1335 63.0668 53.0559 63.3092 52.9006C63.5516 52.7434 63.741 52.5133 63.8774 52.2102C64.0157 51.9053 64.0848 51.5322 64.0848 51.0909Z"
	},
	{
		kind: "primary",
		d: "M53.5918 54.0001V48.1819H54.6458V50.645H57.3418V48.1819H58.3986V54.0001H57.3418V51.5285H54.6458V54.0001H53.5918Z"
	},
	{
		kind: "primary",
		d: "M45.9482 54.0001V48.1819H49.7323V49.0654H47.0022V50.645H49.5363V51.5285H47.0022V53.1165H49.7551V54.0001H45.9482Z"
	},
	{
		kind: "primary",
		d: "M40.6895 54.0001V48.1819H44.4735V49.0654H41.7434V50.645H44.2775V51.5285H41.7434V53.1165H44.4963V54.0001H40.6895Z"
	},
	{
		kind: "primary",
		d: "M35.6016 54.0001V48.1819H39.3288V49.0654H36.6555V50.645H39.0732V51.5285H36.6555V54.0001H35.6016Z"
	},
	{
		kind: "primary",
		d: "M30.5137 54.0001V48.1819H34.2409V49.0654H31.5676V50.645H33.9853V51.5285H31.5676V54.0001H30.5137Z"
	},
	{
		kind: "primary",
		d: "M29.1181 51.0909C29.1181 51.7178 29.0007 52.2548 28.7658 52.7017C28.5328 53.1468 28.2147 53.4877 27.8113 53.7245C27.4097 53.9612 26.9542 54.0796 26.4448 54.0796C25.9353 54.0796 25.4789 53.9612 25.0755 53.7245C24.6739 53.4858 24.3558 53.144 24.1209 52.6989C23.888 52.2519 23.7715 51.7159 23.7715 51.0909C23.7715 50.464 23.888 49.9281 24.1209 49.483C24.3558 49.036 24.6739 48.6942 25.0755 48.4574C25.4789 48.2207 25.9353 48.1023 26.4448 48.1023C26.9542 48.1023 27.4097 48.2207 27.8113 48.4574C28.2147 48.6942 28.5328 49.036 28.7658 49.483C29.0007 49.9281 29.1181 50.464 29.1181 51.0909ZM28.0584 51.0909C28.0584 50.6496 27.9893 50.2775 27.851 49.9745C27.7147 49.6695 27.5253 49.4394 27.2828 49.2841C27.0404 49.1269 26.7611 49.0483 26.4448 49.0483C26.1285 49.0483 25.8491 49.1269 25.6067 49.2841C25.3643 49.4394 25.1739 49.6695 25.0357 49.9745C24.8993 50.2775 24.8311 50.6496 24.8311 51.0909C24.8311 51.5322 24.8993 51.9053 25.0357 52.2102C25.1739 52.5133 25.3643 52.7434 25.6067 52.9006C25.8491 53.0559 26.1285 53.1335 26.4448 53.1335C26.7611 53.1335 27.0404 53.0559 27.2828 52.9006C27.5253 52.7434 27.7147 52.5133 27.851 52.2102C27.9893 51.9053 28.0584 51.5322 28.0584 51.0909Z"
	},
	{
		kind: "primary",
		d: "M22.5536 50.1449H21.4911C21.4608 49.9707 21.4049 49.8163 21.3235 49.6818C21.2421 49.5455 21.1407 49.4299 21.0195 49.3352C20.8983 49.2406 20.7601 49.1695 20.6048 49.1222C20.4513 49.0729 20.2856 49.0483 20.1076 49.0483C19.7913 49.0483 19.511 49.1279 19.2667 49.287C19.0224 49.4442 18.8311 49.6752 18.6928 49.9801C18.5546 50.2832 18.4854 50.6534 18.4854 51.0909C18.4854 51.536 18.5546 51.911 18.6928 52.2159C18.833 52.519 19.0243 52.7481 19.2667 52.9034C19.511 53.0568 19.7904 53.1335 20.1048 53.1335C20.279 53.1335 20.4419 53.1108 20.5934 53.0654C20.7468 53.018 20.8841 52.9489 21.0053 52.858C21.1284 52.7671 21.2317 52.6553 21.315 52.5227C21.4002 52.3902 21.4589 52.2387 21.4911 52.0682L22.5536 52.0739C22.5138 52.3504 22.4277 52.6099 22.2951 52.8523C22.1644 53.0947 21.993 53.3087 21.7809 53.4943C21.5688 53.6781 21.3207 53.822 21.0366 53.9262C20.7525 54.0284 20.4371 54.0796 20.0906 54.0796C19.5792 54.0796 19.1228 53.9612 18.7212 53.7245C18.3197 53.4877 18.0034 53.1459 17.7724 52.6989C17.5413 52.2519 17.4258 51.7159 17.4258 51.0909C17.4258 50.464 17.5423 49.9281 17.7752 49.483C18.0082 49.036 18.3254 48.6942 18.7269 48.4574C19.1284 48.2207 19.583 48.1023 20.0906 48.1023C20.4144 48.1023 20.7156 48.1477 20.994 48.2387C21.2724 48.3296 21.5205 48.4631 21.7383 48.6392C21.9561 48.8135 22.1351 49.0275 22.2752 49.2813C22.4173 49.5332 22.5101 49.821 22.5536 50.1449Z"
	}
];
var Logo_module_default = {
	link: "_link_1eazs_1",
	logo: "_logo_1eazs_13"
};
//#endregion
//#region src/components/Header/Logo/Logo.js
function createLogoGraphic() {
	return createSvg("svg", {
		width: "100",
		height: "60",
		viewBox: "0 0 100 60",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false"
	}, ...LOGO_PATHS.map(({ kind, d }) => createSvg("path", {
		d,
		fill: kind === "accent" ? "var(--text-accent)" : "currentColor"
	})));
}
var Logo = class {
	constructor(onLinkClick) {
		const graphic = createElement("span", {
			className: Logo_module_default.logo,
			"aria-hidden": "true"
		}, createLogoGraphic());
		this.element = createElement("a", {
			className: Logo_module_default.link,
			href: getBaseUrl(),
			"aria-label": "Resource Coffee House — Home page"
		}, graphic);
		if (onLinkClick) this.element.addEventListener("click", (event) => {
			onLinkClick(event, this.element);
		});
	}
};
var Navigation_module_default = {
	nav: "_nav_1vll6_1",
	navList: "_navList_1vll6_6",
	navItem: "_navItem_1vll6_20",
	navLink: "_navLink_1vll6_28"
};
//#endregion
//#region src/components/Header/Navigation/Navigation.js
var NAV_ITEMS = [
	{
		label: "Favorite coffee",
		hash: "favorite-coffee",
		homeOnly: true
	},
	{
		label: "About",
		hash: "about",
		homeOnly: true
	},
	{
		label: "Mobile app",
		hash: "mobile-app",
		homeOnly: true
	},
	{
		label: "Contact us",
		hash: "contact-us"
	}
];
function navHref({ hash, homeOnly }) {
	return homeOnly ? getHomeHashUrl(hash) : `#${hash}`;
}
var Navigation = class {
	constructor(onLinkClick) {
		const navItems = NAV_ITEMS.map((item) => {
			const link = createElement("a", {
				className: Navigation_module_default.navLink,
				href: navHref(item)
			}, item.label);
			if (onLinkClick) link.addEventListener("click", (event) => {
				onLinkClick(event, link);
			});
			return createElement("li", { className: Navigation_module_default.navItem }, link);
		});
		const navList = createElement("ul", { className: Navigation_module_default.navList }, ...navItems);
		this.element = createElement("nav", {
			className: Navigation_module_default.nav,
			"aria-label": "Primary"
		}, navList);
	}
};
var MobileMenu_module_default = {
	mobileMenu: "_mobileMenu_wf01g_1",
	open: "_open_wf01g_13",
	menu: "_menu_wf01g_17",
	menuIcon: "_menuIcon_wf01g_29",
	menuActive: "_menuActive_wf01g_59"
};
//#endregion
//#region src/components/Header/MobileMenu/MobileMenu.js
var MobileMenu = class {
	constructor(onClose, onLinkClick) {
		this.navigation = new Navigation((event, link) => {
			onClose();
			onLinkClick?.(event, link);
		});
		this.menuLink = createMenuLink(MobileMenu_module_default.menu, MobileMenu_module_default.menuIcon, (event, link) => {
			if (this.menuLink.classList.contains(MobileMenu_module_default.menuActive)) {
				event.preventDefault();
				return;
			}
			onClose();
			onLinkClick?.(event, link);
		});
		this.element = createElement("div", { className: MobileMenu_module_default.mobileMenu }, this.navigation.element, this.menuLink);
	}
	open() {
		this.element.classList.add(MobileMenu_module_default.open);
		document.body.style.overflow = "hidden";
	}
	close() {
		this.element.classList.remove(MobileMenu_module_default.open);
		document.body.style.overflow = "";
	}
	toggle() {
		const isOpen = this.element.classList.contains(MobileMenu_module_default.open);
		isOpen ? this.close() : this.open();
		return !isOpen;
	}
	setActivePath(path) {
		const isMenuPage = path === "/menu";
		this.menuLink.classList.toggle(MobileMenu_module_default.menuActive, isMenuPage);
		if (isMenuPage) this.menuLink.setAttribute("aria-current", "page");
		else this.menuLink.removeAttribute("aria-current");
	}
};
var Header_module_default = {
	header: "_header_eeewj_1",
	desktopNavigation: "_desktopNavigation_eeewj_17"
};
//#endregion
//#region src/components/Header/Header.js
var Header = class {
	constructor(onLinkClick) {
		this.logo = new Logo((event, link) => {
			this.closeMobileMenu();
			onLinkClick?.(event, link);
		});
		this.navigation = new Navigation(onLinkClick);
		this.navigation.element.classList.add(Header_module_default.desktopNavigation);
		this.mobileMenu = new MobileMenu(() => {
			this.closeMobileMenu();
		}, onLinkClick);
		this.controls = new Controls(() => {
			this.toggleMobileMenu();
		}, onLinkClick);
		this.element = createElement("header", { className: Header_module_default.header }, this.logo.element, this.navigation.element, this.controls.element, this.mobileMenu.element);
	}
	toggleMobileMenu() {
		const isOpen = this.mobileMenu.toggle();
		this.controls.setBurgerState(isOpen);
	}
	closeMobileMenu() {
		this.mobileMenu.close();
		this.controls.setBurgerState(false);
	}
	setActivePath(path) {
		this.controls.setActivePath(path);
		this.mobileMenu.setActivePath(path);
	}
};
var Main_module_default = { main: "_main_hyu87_1" };
//#endregion
//#region src/components/Main/Main.js
var Main = class {
	constructor() {
		this.element = createElement("main", { className: Main_module_default.main });
	}
};
//#endregion
//#region src/components/Footer/icons.js
function createIcon$1(paths, size) {
	return (className) => createSvg("svg", {
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		class: className,
		"aria-hidden": "true",
		focusable: "false"
	}, ...paths.map((path) => {
		if (typeof path === "string") return createSvg("path", {
			d: path,
			stroke: "currentColor",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		});
		const { d, fill, ...attributes } = path;
		return createSvg("path", {
			d,
			...attributes,
			stroke: "currentColor",
			...fill ? { fill: "currentColor" } : {}
		});
	}));
}
var socialIcons = {
	twitter: createIcon$1(["M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z"], 24),
	instagram: createIcon$1([
		"M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z",
		"M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z",
		"M17.5 6.51L17.51 6.49889"
	], 24),
	facebook: createIcon$1(["M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"], 24)
};
var contactIcons = {
	location: createIcon$1([{
		d: "M16.6663 8.33329C16.6663 12.0152 9.99967 18.3333 9.99967 18.3333C9.99967 18.3333 3.33301 12.0152 3.33301 8.33329C3.33301 4.65139 6.31778 1.66663 9.99967 1.66663C13.6816 1.66663 16.6663 4.65139 16.6663 8.33329Z",
		"stroke-width": "1.5"
	}, {
		d: "M10.0003 9.16667C10.4606 9.16667 10.8337 8.79357 10.8337 8.33333C10.8337 7.8731 10.4606 7.5 10.0003 7.5C9.54009 7.5 9.16699 7.8731 9.16699 8.33333C9.16699 8.79357 9.54009 9.16667 10.0003 9.16667Z",
		fill: true,
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}], 24),
	phone: createIcon$1([{
		d: "M15.0984 12.2516L11.6665 12.9166C9.34845 11.7531 7.91654 10.4166 7.08321 8.33329L7.72483 4.89154L6.51197 1.66663L3.72946 1.66663C2.60191 1.66663 1.71466 2.59958 1.90108 3.71161C2.29888 6.08454 3.37231 10.0391 6.24987 12.9166C9.27338 15.9401 13.5661 17.3318 16.1378 17.9288C17.299 18.1983 18.3332 17.2908 18.3332 16.0988L18.3332 13.4843L15.0984 12.2516Z",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}], 24),
	clock: createIcon$1([{
		d: "M10 5L10 10L15 10",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}, {
		d: "M10.0003 18.3333C14.6027 18.3333 18.3337 14.6023 18.3337 9.99996C18.3337 5.39759 14.6027 1.66663 10.0003 1.66663C5.39795 1.66663 1.66699 5.39759 1.66699 9.99996C1.66699 14.6023 5.39795 18.3333 10.0003 18.3333Z",
		"stroke-width": "1.5",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}], 24)
};
var Footer_module_default = {
	footer: "_footer_1qohz_1",
	content: "_content_1qohz_23",
	footerLeft: "_footerLeft_1qohz_36",
	title: "_title_1qohz_43",
	titleAccent: "_titleAccent_1qohz_56",
	socialLinks: "_socialLinks_1qohz_61",
	socialLink: "_socialLink_1qohz_61",
	socialIcon: "_socialIcon_1qohz_76",
	footerRight: "_footerRight_1qohz_97",
	contactTitle: "_contactTitle_1qohz_105",
	contactList: "_contactList_1qohz_112",
	contactItem: "_contactItem_1qohz_118",
	contactLink: "_contactLink_1qohz_122",
	contactText: "_contactText_1qohz_123",
	contactIcon: "_contactIcon_1qohz_131"
};
//#endregion
//#region src/components/Footer/Footer.js
var SOCIAL_LINKS = [
	{
		label: "X",
		href: "https://x.com/",
		icon: socialIcons.twitter
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/",
		icon: socialIcons.instagram
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/",
		icon: socialIcons.facebook
	}
];
var CONTACT_ITEMS = [
	{
		label: "8558 Green Rd.,  LA",
		href: "https://maps.app.goo.gl/fx5A8m8jbESmfFgJ9",
		target: "_blank",
		rel: "noopener noreferrer",
		icon: contactIcons.location
	},
	{
		label: "+1 (603) 555-0123",
		href: "tel:+16035550123",
		icon: contactIcons.phone
	},
	{
		label: "Mon–Sat: 9:00–23:00",
		icon: contactIcons.clock
	}
];
function createSocialLinks() {
	return SOCIAL_LINKS.map(({ label, href, icon }) => createElement("a", {
		className: Footer_module_default.socialLink,
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": label
	}, icon(Footer_module_default.socialIcon)));
}
function createContactItem({ label, href, target, rel, icon }) {
	const content = [icon(Footer_module_default.contactIcon), label];
	if (href) return createElement("li", { className: Footer_module_default.contactItem }, createElement("a", {
		className: Footer_module_default.contactLink,
		href,
		...target && { target },
		...rel && { rel }
	}, ...content));
	return createElement("li", { className: Footer_module_default.contactItem }, createElement("span", { className: Footer_module_default.contactText }, ...content));
}
var Footer = class {
	constructor() {
		const socialLinks = createElement("div", { className: Footer_module_default.socialLinks }, ...createSocialLinks());
		const contactItems = CONTACT_ITEMS.map(createContactItem);
		const contactList = createElement("ul", { className: Footer_module_default.contactList }, ...contactItems);
		const footerRight = createElement("div", {
			className: Footer_module_default.footerRight,
			id: "contact-us"
		}, createElement("h2", { className: Footer_module_default.contactTitle }, "Contact us"), contactList);
		registerSection("contact-us", footerRight, { permanent: true });
		const content = createElement("div", { className: Footer_module_default.content }, createElement("div", { className: Footer_module_default.footerLeft }, createElement("p", { className: Footer_module_default.title }, createElement("span", {}, "Sip, Savor, Smile."), createElement("span", { className: Footer_module_default.titleAccent }, "It’s coffee time!")), socialLinks), footerRight);
		this.element = createElement("footer", { className: Footer_module_default.footer }, content);
	}
};
//#endregion
//#region src/router/Router.js
var Router = class {
	constructor(routes, container, onNavigate) {
		this.routes = routes;
		this.container = container;
		this.onNavigate = onNavigate;
	}
	start() {
		window.addEventListener("popstate", () => {
			this.render();
		});
		this.render();
	}
	handleLinkClick(event, link) {
		if (link.origin !== window.location.origin) return;
		if (link.target === "_blank" || link.hasAttribute("download")) return;
		const path = getPathname(link.pathname);
		if (!this.routes[path]) return;
		const samePath = path === this.getPath();
		const hasHash = Boolean(link.hash);
		if (samePath && hasHash) {
			event.preventDefault();
			const nextUrl = `${link.pathname}${link.search}${link.hash}`;
			if (`${location.pathname}${location.search}${location.hash}` !== nextUrl) history.pushState(null, "", nextUrl);
			this.scrollToHash();
			return;
		}
		event.preventDefault();
		history.pushState(null, "", `${link.pathname}${link.search}${link.hash}`);
		this.render();
	}
	getPath() {
		return getPathname(location.pathname);
	}
	render() {
		clearSections();
		const path = this.getPath();
		new (this.routes[path] || this.routes["*"])(this.handleLinkClick.bind(this)).mount(this.container);
		this.onNavigate?.(path);
		this.scrollToHash();
	}
	scrollToHash() {
		const hash = location.hash.replace(/^#/, "");
		if (!hash) return;
		requestAnimationFrame(() => {
			const target = getSection(hash);
			if (target) target.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});
	}
};
var Hero_module_default = {
	section: "_section_4prp0_1",
	video: "_video_4prp0_14",
	content: "_content_4prp0_23",
	title: "_title_4prp0_44",
	titleAccent: "_titleAccent_4prp0_57",
	description: "_description_4prp0_63",
	button: "_button_4prp0_71",
	menuIcon: "_menuIcon_4prp0_87"
};
//#endregion
//#region src/components/Hero/Hero.js
var Hero = class {
	constructor(onLinkClick) {
		const video = createElement("video", {
			className: Hero_module_default.video,
			poster: getAssetUrl("assets/img-hero.avif"),
			preload: "metadata"
		});
		video.autoplay = true;
		video.muted = true;
		video.loop = true;
		video.playsInline = true;
		const source = createElement("source", {
			src: getAssetUrl("assets/hero.mp4"),
			type: "video/mp4"
		});
		video.append(source);
		const menuLink = createElement("a", {
			className: Hero_module_default.button,
			href: getPageUrl("menu")
		}, "Menu", menuIcon$3(Hero_module_default.menuIcon));
		if (onLinkClick) menuLink.addEventListener("click", (event) => {
			onLinkClick(event, menuLink);
		});
		const content = createElement("div", { className: Hero_module_default.content }, createElement("h1", { className: Hero_module_default.title }, createElement("span", { className: Hero_module_default.titleAccent }, "Enjoy"), " premium coffee at our charming cafe"), createElement("p", { className: Hero_module_default.description }, "With its inviting atmosphere and delicious coffee options, the Coffee House Resource is a popular destination for coffee lovers and those seeking a warm and inviting space to enjoy their favorite beverage."), menuLink);
		this.element = createElement("section", {
			className: Hero_module_default.section,
			id: "home"
		}, video, content);
		registerSection("home", this.element);
	}
};
//#endregion
//#region src/data/products.js
var FAVORITE_PRODUCTS = [
	{
		name: "S’mores Frappuccino",
		description: "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
		price: "$5.50",
		image: getAssetUrl("assets/coffee-slider-1.avif")
	},
	{
		name: "Caramel Macchiato",
		description: "Fragrant espresso with steamed milk and caramel sauce topped with a creamy milk foam.",
		price: "$5.50",
		image: getAssetUrl("assets/coffee-slider-2.avif")
	},
	{
		name: "Ice coffee",
		description: "A refreshing iced coffee drink with milk and a smooth coffee flavor.",
		price: "$5.50",
		image: getAssetUrl("assets/coffee-slider-3.avif")
	}
];
var PRODUCTS = [
	{
		name: "Irish coffee",
		description: "Fragrant black coffee with Jameson Irish whiskey and whipped milk",
		price: "7.00",
		category: "coffee",
		image: getAssetUrl("assets/coffee-1.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Kahlua coffee",
		description: "Classic coffee with milk and Kahlua liqueur under a cap of frothed milk",
		price: "7.00",
		category: "coffee",
		image: getAssetUrl("assets/coffee-2.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Honey raf",
		description: "Espresso with frothed milk, cream and aromatic honey",
		price: "5.50",
		category: "coffee",
		image: getAssetUrl("assets/coffee-3.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Ice cappuccino",
		description: "Cappuccino with soft thick foam in summer version with ice",
		price: "5.00",
		category: "coffee",
		image: getAssetUrl("assets/coffee-4.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Espresso",
		description: "Classic black coffee",
		price: "4.50",
		category: "coffee",
		image: getAssetUrl("assets/coffee-5.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Latte",
		description: "Espresso coffee with the addition of steamed milk and dense milk foam",
		price: "5.50",
		category: "coffee",
		image: getAssetUrl("assets/coffee-6.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Latte macchiato",
		description: "Espresso with frothed milk and chocolate",
		price: "5.50",
		category: "coffee",
		image: getAssetUrl("assets/coffee-7.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Coffee with cognac",
		description: "Fragrant black coffee with cognac and whipped cream",
		price: "6.50",
		category: "coffee",
		image: getAssetUrl("assets/coffee-8.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Cinnamon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Moroccan",
		description: "Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint",
		price: "4.50",
		category: "tea",
		image: getAssetUrl("assets/tea-1.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Lemon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Ginger",
		description: "Original black tea with fresh ginger, lemon and honey",
		price: "5.00",
		category: "tea",
		image: getAssetUrl("assets/tea-2.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Lemon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Cranberry",
		description: "Invigorating black tea with cranberry and honey",
		price: "5.00",
		category: "tea",
		image: getAssetUrl("assets/tea-3.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Lemon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Sea buckthorn",
		description: "Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon",
		price: "5.50",
		category: "tea",
		image: getAssetUrl("assets/tea-4.avif"),
		sizes: {
			s: {
				size: "200 ml",
				"add-price": "0.00"
			},
			m: {
				size: "300 ml",
				"add-price": "0.50"
			},
			l: {
				size: "400 ml",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Sugar",
				"add-price": "0.50"
			},
			{
				name: "Lemon",
				"add-price": "0.50"
			},
			{
				name: "Syrup",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Marble cheesecake",
		description: "Philadelphia cheese with lemon zest on a light sponge cake and red currant jam",
		price: "3.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-1.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Red velvet",
		description: "Layer cake with cream cheese frosting",
		price: "4.00",
		category: "dessert",
		image: getAssetUrl("assets/dessert-2.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Cheesecakes",
		description: "Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar",
		price: "4.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-3.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Creme brulee",
		description: "Delicate creamy dessert in a caramel basket with wild berries",
		price: "4.00",
		category: "dessert",
		image: getAssetUrl("assets/dessert-4.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Pancakes",
		description: "Tender pancakes with strawberry jam and fresh strawberries",
		price: "4.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-5.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Honey cake",
		description: "Classic honey cake with delicate custard",
		price: "4.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-6.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Chocolate cake",
		description: "Cake with hot chocolate filling and nuts with dried apricots",
		price: "5.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-7.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	},
	{
		name: "Black forest",
		description: "A combination of thin sponge cake with cherry jam and light chocolate mousse",
		price: "6.50",
		category: "dessert",
		image: getAssetUrl("assets/dessert-8.avif"),
		sizes: {
			s: {
				size: "50 g",
				"add-price": "0.00"
			},
			m: {
				size: "100 g",
				"add-price": "0.50"
			},
			l: {
				size: "200 g",
				"add-price": "1.00"
			}
		},
		additives: [
			{
				name: "Berries",
				"add-price": "0.50"
			},
			{
				name: "Nuts",
				"add-price": "0.50"
			},
			{
				name: "Jam",
				"add-price": "0.50"
			}
		]
	}
];
var Favorites_module_default = {
	section: "_section_1bkfs_1",
	title: "_title_1bkfs_14",
	titleAccent: "_titleAccent_1bkfs_25",
	carousel: "_carousel_1bkfs_31",
	arrow: "_arrow_1bkfs_40",
	card: "_card_1bkfs_68",
	image: "_image_1bkfs_76",
	name: "_name_1bkfs_87",
	description: "_description_1bkfs_94",
	price: "_price_1bkfs_106",
	progress: "_progress_1bkfs_115",
	progressItem: "_progressItem_1bkfs_120",
	progressItemActive: "_progressItemActive_1bkfs_126"
};
//#endregion
//#region src/components/Favorites/Favorites.js
function arrowIcon(direction) {
	return createSvg("svg", {
		width: 24,
		height: 24,
		viewBox: "0 0 24 24",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		focusable: "false"
	}, createSvg("path", {
		d: direction === "left" ? "M18 12H5.5M11.5 18L5.5 12L11.5 6" : "M6 12H18.5M12.5 18L18.5 12L12.5 6",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round"
	}));
}
function createArrowButton(direction, label, className) {
	return createElement("button", {
		className: `${Favorites_module_default.arrow} ${className}`,
		type: "button",
		"aria-label": label
	}, arrowIcon(direction));
}
function createCard(product) {
	const image = createElement("img", {
		className: Favorites_module_default.image,
		src: product.image,
		alt: product.name
	});
	const name = createElement("h3", { className: Favorites_module_default.name }, product.name);
	const description = createElement("p", { className: Favorites_module_default.description }, product.description);
	const price = createElement("p", { className: Favorites_module_default.price }, product.price);
	return createElement("article", { className: Favorites_module_default.card }, image, name, description, price);
}
function createProgress() {
	return createElement("div", {
		className: Favorites_module_default.progress,
		"aria-hidden": "true"
	}, ...FAVORITE_PRODUCTS.map((_, index) => createElement("span", { className: index === 0 ? `${Favorites_module_default.progressItem} ${Favorites_module_default.progressItemActive}` : Favorites_module_default.progressItem })));
}
var Favorites = class {
	constructor() {
		const product = FAVORITE_PRODUCTS[0];
		const title = createElement("h2", { className: Favorites_module_default.title }, "Choose your ", createElement("span", { className: Favorites_module_default.titleAccent }, "favorite"), " coffee");
		const previousButton = createArrowButton("left", "Previous coffee", Favorites_module_default.arrowPrevious);
		const nextButton = createArrowButton("right", "Next coffee", Favorites_module_default.arrowNext);
		const card = createCard(product);
		const carousel = createElement("div", { className: Favorites_module_default.carousel }, previousButton, card, nextButton);
		const progress = createProgress();
		this.element = createElement("section", {
			className: Favorites_module_default.section,
			id: "favorite-coffee"
		}, title, carousel, progress);
		registerSection("favorite-coffee", this.element);
	}
};
var About_module_default = {
	section: "_section_35wyt_1",
	description: "_description_35wyt_13",
	descriptionAccent: "_descriptionAccent_35wyt_23",
	images: "_images_35wyt_29",
	imageContainer: "_imageContainer_35wyt_43",
	imageLarge: "_imageLarge_35wyt_63",
	imageSmall: "_imageSmall_35wyt_64"
};
//#endregion
//#region src/components/About/About.js
var IMAGES = [
	{
		src: getAssetUrl("assets/about-1.avif"),
		alt: "Woman enjoying coffee",
		className: About_module_default.imageLarge
	},
	{
		src: getAssetUrl("assets/about-2.avif"),
		alt: "Cup of coffee",
		className: About_module_default.imageSmall
	},
	{
		src: getAssetUrl("assets/about-3.avif"),
		alt: "Man enjoying coffee",
		className: About_module_default.imageSmall
	},
	{
		src: getAssetUrl("assets/about-4.avif"),
		alt: "Couple enjoying coffee",
		className: About_module_default.imageLarge
	}
];
var About = class {
	constructor() {
		const description = createElement("p", { className: About_module_default.description }, "Resource is ", createElement("span", { className: About_module_default.descriptionAccent }, "the perfect and cozy place"), " where you can enjoy a variety of hot beverages, relax, catch up with friends, or get some work done.");
		const images = createElement("div", { className: About_module_default.images }, ...IMAGES.map(({ src, alt, className }) => createElement("div", { className: About_module_default.imageContainer }, createElement("img", {
			className,
			src,
			alt
		}))));
		this.element = createElement("section", {
			className: About_module_default.section,
			id: "about"
		}, description, images);
		registerSection("about", this.element);
	}
};
//#endregion
//#region src/components/MobileApp/icons.js
function createIcon(paths) {
	return (className) => createSvg("svg", {
		width: 36,
		height: 36,
		viewBox: "0 0 36 36",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		class: className,
		"aria-hidden": "true",
		focusable: "false"
	}, ...paths.map((d) => createSvg("path", {
		d,
		fill: "currentColor"
	})));
}
var appStoreIcon = createIcon(["M26.7073 18.6307C26.6704 14.6324 30.065 12.6872 30.2203 12.5966C28.2977 9.86366 25.3178 9.49026 24.2707 9.46048C21.7679 9.20369 19.3403 10.9206 18.0654 10.9206C16.765 10.9206 14.8017 9.48529 12.6858 9.52747C9.96293 9.56841 7.41566 11.1055 6.0186 13.4923C3.13542 18.359 5.28572 25.5108 8.04802 29.4446C9.42981 31.3712 11.0444 33.5223 13.1578 33.4466C15.2254 33.3635 15.9978 32.1614 18.4929 32.1614C20.9651 32.1614 21.6903 33.4466 23.8457 33.3983C26.0647 33.3635 27.4618 31.463 28.7952 29.519C30.392 27.3108 31.0333 25.1362 31.0588 25.0245C31.0066 25.0071 26.7493 23.4229 26.7073 18.6307Z", "M22.6357 6.87268C23.7477 5.51675 24.5086 3.67205 24.2974 1.80005C22.6879 1.86952 20.675 2.88554 19.5159 4.21169C18.4903 5.38029 17.5742 7.29571 17.8109 9.097C19.6189 9.2285 21.4753 8.20752 22.6357 6.87268Z"]);
var googlePlayIcon = createIcon([
	"M3.7558 3.20297C3.39335 3.57289 3.18359 4.14884 3.18359 4.89471V31.4994C3.18359 32.2453 3.39335 32.8212 3.7558 33.1911L3.84525 33.2723L19.1359 18.37V18.0181L3.84525 3.11575L3.7558 3.20297Z",
	"M26.0776 23.34L20.9863 18.37V18.0181L26.0837 13.0482L26.1979 13.1128L32.2345 16.4617C33.9573 17.4121 33.9573 18.976 32.2345 19.9324L26.1979 23.2753L26.0776 23.34V23.34Z",
	"M25.2733 24.2007L20.0617 19.1195L4.68164 34.1166C5.25384 34.7031 6.18695 34.7737 7.24807 34.1873L25.2733 24.2007",
	"M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z"
]);
var MobileApp_module_default = {
	section: "_section_718sv_1",
	info: "_info_718sv_18",
	title: "_title_718sv_29",
	titleAccent: "_titleAccent_718sv_39",
	description: "_description_718sv_45",
	storeLinks: "_storeLinks_718sv_52",
	storeLink: "_storeLink_718sv_52",
	storeText: "_storeText_718sv_75",
	storeLabel: "_storeLabel_718sv_76",
	storeName: "_storeName_718sv_77",
	storeIcon: "_storeIcon_718sv_84",
	image: "_image_718sv_114"
};
//#endregion
//#region src/components/MobileApp/MobileApp.js
var APP_LINKS = [{
	label: "App Store",
	availableText: "Available on the",
	href: "https://www.apple.com/app-store/",
	icon: appStoreIcon
}, {
	label: "Google Play",
	availableText: "Available on",
	href: "https://play.google.com/store/",
	icon: googlePlayIcon
}];
function createStoreLink({ label, availableText, href, icon }) {
	return createElement("a", {
		className: MobileApp_module_default.storeLink,
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": `Download on ${label}`
	}, icon(MobileApp_module_default.storeIcon), createElement("span", { className: MobileApp_module_default.storeText }, createElement("span", { className: MobileApp_module_default.storeLabel }, availableText), createElement("span", { className: MobileApp_module_default.storeName }, label)));
}
var MobileApp = class {
	constructor() {
		const storeLinks = createElement("div", { className: MobileApp_module_default.storeLinks }, ...APP_LINKS.map(createStoreLink));
		const info = createElement("div", { className: MobileApp_module_default.info }, createElement("h2", { className: MobileApp_module_default.title }, createElement("span", { className: MobileApp_module_default.titleAccent }, "Download"), " our app", createElement("br"), "to start ordering"), createElement("p", { className: MobileApp_module_default.description }, "Download the Resource app today and experience the comfort of ordering your favorite coffee from wherever you are"), storeLinks);
		const image = createElement("img", {
			className: MobileApp_module_default.image,
			src: getAssetUrl("assets/mobile-screens.avif"),
			alt: "Mobile screens"
		});
		this.element = createElement("section", {
			className: MobileApp_module_default.section,
			id: "mobile-app"
		}, info, image);
		registerSection("mobile-app", this.element);
	}
};
//#endregion
//#region src/pages/Home/Home.js
var Home = class {
	constructor(onLinkClick) {
		this.sections = [
			new Hero(onLinkClick),
			new Favorites(),
			new About(),
			new MobileApp()
		];
	}
	mount(container) {
		container.replaceChildren(...this.sections.map((section) => section.element));
	}
};
var CardCatalog_module_default = {
	card: "_card_z6hb7_1",
	imageWrapper: "_imageWrapper_z6hb7_11",
	image: "_image_z6hb7_11",
	content: "_content_z6hb7_39",
	text: "_text_z6hb7_48",
	name: "_name_z6hb7_53",
	description: "_description_z6hb7_59",
	price: "_price_z6hb7_66"
};
//#endregion
//#region src/components/CardCatalog/CardCatalog.js
var CardCatalog = class {
	constructor(product) {
		const image = createElement("img", {
			className: CardCatalog_module_default.image,
			src: product.image,
			alt: product.name
		});
		const imageWrapper = createElement("div", { className: CardCatalog_module_default.imageWrapper }, image);
		const name = createElement("h2", { className: CardCatalog_module_default.name }, product.name);
		const description = createElement("p", { className: CardCatalog_module_default.description }, product.description);
		const text = createElement("div", { className: CardCatalog_module_default.text }, name, description);
		const price = createElement("p", { className: CardCatalog_module_default.price }, `$${product.price}`);
		const content = createElement("div", { className: CardCatalog_module_default.content }, text, price);
		this.element = createElement("article", { className: CardCatalog_module_default.card }, imageWrapper, content);
	}
};
var Catalog_module_default = {
	section: "_section_1fy9o_1",
	loadMore: "_loadMore_1fy9o_10",
	title: "_title_1fy9o_43",
	titleAccent: "_titleAccent_1fy9o_51",
	tabs: "_tabs_1fy9o_61",
	tab: "_tab_1fy9o_61",
	iconWrapper: "_iconWrapper_1fy9o_83",
	icon: "_icon_1fy9o_83",
	label: "_label_1fy9o_99",
	tabActive: "_tabActive_1fy9o_104",
	products: "_products_1fy9o_128"
};
//#endregion
//#region src/components/Catalog/Catalog.js
var CATEGORIES = [
	{
		label: "Coffee",
		value: "coffee",
		icon: getAssetUrl("assets/coffee.svg")
	},
	{
		label: "Tea",
		value: "tea",
		icon: getAssetUrl("assets/teapot.svg")
	},
	{
		label: "Dessert",
		value: "dessert",
		icon: getAssetUrl("assets/cake.svg")
	}
];
var Catalog = class {
	constructor() {
		this.activeCategory = "coffee";
		this.title = createElement("h1", { className: Catalog_module_default.title }, "Behind each of our cups ", "hides an ", createElement("span", { className: Catalog_module_default.titleAccent }, "amazing surprise"));
		this.tabs = createElement("div", {
			className: Catalog_module_default.tabs,
			role: "tablist",
			"aria-label": "Menu categories"
		}, ...CATEGORIES.map((category, index) => this.createTab(category, index)));
		this.products = createElement("div", { className: Catalog_module_default.products });
		this.loadMoreButton = createElement("button", {
			className: Catalog_module_default.loadMore,
			type: "button",
			"aria-label": "Load more products"
		}, this.createLoadMoreIcon());
		this.renderProducts();
		this.element = createElement("section", { className: Catalog_module_default.section }, this.title, this.tabs, this.products, this.loadMoreButton);
	}
	createTab(category, index) {
		const isActive = index === 0;
		const icon = createElement("img", {
			className: Catalog_module_default.icon,
			src: category.icon,
			alt: "",
			"aria-hidden": "true"
		});
		const iconWrapper = createElement("span", { className: Catalog_module_default.iconWrapper }, icon);
		const label = createElement("span", { className: Catalog_module_default.label }, category.label);
		return createElement("button", {
			className: `${Catalog_module_default.tab} ${isActive ? Catalog_module_default.tabActive : ""}`,
			type: "button",
			role: "tab",
			"aria-selected": String(isActive)
		}, iconWrapper, label);
	}
	createLoadMoreIcon() {
		return createSvg("svg", {
			width: "24",
			height: "24",
			viewBox: "0 0 24 24",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true"
		}, createSvg("path", {
			d: "M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.1006 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8",
			stroke: "currentColor",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}), createSvg("path", {
			d: "M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3",
			stroke: "currentColor",
			"stroke-linecap": "round",
			"stroke-linejoin": "round"
		}));
	}
	renderProducts() {
		const products = PRODUCTS.filter((product) => product.category === this.activeCategory);
		this.products.replaceChildren(...products.map((product) => new CardCatalog(product).element));
	}
	mount(container) {
		container.replaceChildren(this.element);
	}
};
//#endregion
//#region src/pages/Menu/Menu.js
var Menu = class {
	constructor() {
		this.sections = [new Catalog()];
	}
	mount(container) {
		container.replaceChildren(...this.sections.map((section) => section.element));
	}
};
var NotFound_module_default = {
	page: "_page_cssot_1",
	title: "_title_cssot_10",
	text: "_text_cssot_17",
	link: "_link_cssot_22"
};
//#endregion
//#region src/pages/NotFound/NotFound.js
var NotFound = class {
	constructor(onLinkClick) {
		this.title = createElement("h1", { className: NotFound_module_default.title }, "404");
		this.text = createElement("p", { className: NotFound_module_default.text }, "Page not found");
		this.link = createElement("a", {
			href: getBaseUrl(),
			className: NotFound_module_default.link
		}, "Go to home");
		if (onLinkClick) this.link.addEventListener("click", (event) => {
			onLinkClick(event, this.link);
		});
		this.element = createElement("section", { className: NotFound_module_default.page }, this.title, this.text, this.link);
	}
	mount(container) {
		container.replaceChildren(this.element);
	}
};
//#endregion
//#region src/router/routes.js
var routes = {
	"/": Home,
	"/menu": Menu,
	"*": NotFound
};
//#endregion
//#region src/App.js
var App = class {
	constructor(container) {
		this.container = container;
		this.main = new Main();
		this.router = new Router(routes, this.main.element, (path) => {
			this.header.setActivePath(path);
			this.setLayout(path);
		});
		this.header = new Header((event, link) => {
			this.router.handleLinkClick(event, link);
		});
		this.footer = new Footer();
	}
	setLayout(path) {
		if (!routes[path]) {
			this.container.replaceChildren(this.main.element);
			return;
		}
		this.container.replaceChildren(this.header.element, this.main.element, this.footer.element);
	}
	start() {
		this.router.start();
	}
};
//#endregion
//#region src/main.js
var savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.dataset.theme = savedTheme;
new App(document.body).start();
//#endregion

//# sourceMappingURL=main-CZASwobY.js.map