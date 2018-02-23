import { stringifyAuthParams, parseAuthParams } from ".";

test("parses correctly", () => {
	const correct = {
		foo: "bar",
		foofoo: "barbar"
	};
	const check = parseAuthParams(`foo="bar",foofoo="barbar"`);

	expect(check).toEqual(correct);
});

test("stringifies correctly", () => {
	const correct = `foo="bar",foofoo="barbar"`;
	const check = stringifyAuthParams({
		foo: "bar",
		foofoo: "barbar"
	});

	expect(check).toBe(correct);
});
