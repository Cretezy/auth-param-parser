/**
 * Stringify object to auth-params.
 *
 * @param {object} params
 */
export function stringifyAuthParams(params) {
	return Object.keys(params)
		.map(param => `${param}="${params[param]}"`)
		.join(",");
}

/**
 * Parses auth-params to object.
 * Based on: https://github.com/joyent/node-http-signature/blob/523e7c5a3a081e046813f62ab182e294a08eaf0d/lib/parser.js#L131
 *
 * @param {string} params
 */
export function parseAuthParams(params) {
	let state = ParamsState.Name;
	let tmpName = "";
	let tmpValue = "";

	const parsed = {};

	params.split("").forEach(c => {
		switch (Number(state)) {
			case ParamsState.Name:
				const code = c.charCodeAt(0);
				// restricted name of A-Z / a-z
				if (
					(code >= 0x41 && code <= 0x5a) || // A-Z
					(code >= 0x61 && code <= 0x7a) // a-z
				) {
					tmpName += c;
				} else if (c === "=") {
					if (tmpName.length === 0) throw new Error("Bad auth-param format");
					state = ParamsState.Quote;
				} else {
					throw new Error("Bad auth-param format");
				}
				break;

			case ParamsState.Quote:
				if (c === '"') {
					tmpValue = "";
					state = ParamsState.Value;
				} else {
					throw new Error("Bad auth-param format");
				}
				break;

			case ParamsState.Value:
				if (c === '"') {
					parsed[tmpName] = tmpValue;
					state = ParamsState.Comma;
				} else {
					tmpValue += c;
				}
				break;

			case ParamsState.Comma:
				if (c === ",") {
					tmpName = "";
					state = ParamsState.Name;
				} else {
					throw new Error("Bad auth-param format");
				}
				break;

			default:
				throw new Error("Invalid substate");
		}
	});

	return parsed;
}

const ParamsState = {
	Name: 0,
	Quote: 1,
	Value: 2,
	Comma: 3
};
