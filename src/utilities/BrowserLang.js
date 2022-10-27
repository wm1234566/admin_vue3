export default (defaultLang = 'en-US') =>
	(navigator.language || (Array.isArray(navigator.languages) && navigator.languages[0]) || defaultLang).slice(0, 2);
