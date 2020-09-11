module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["eslint-config-egg"],
	rules: {
		"no-console": "off",
		"comma-dangle": [2, "never"]
	},
	parserOptions: {
		parser: "@typescript-eslint/parser"
	}
};
