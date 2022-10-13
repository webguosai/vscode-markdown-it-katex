const path = require('path');
const tape = require('tape');
const testLoad = require('markdown-it-testgen').load;
const mdk = require('../index');

/* this uses the markdown-it-testgen module to automatically generate tests
   based on an easy to read text file
 */
testLoad(path.join(__dirname, 'fixtures/default.txt'), function (data) {
	const md = require('markdown-it')()
		.use(mdk);

	data.fixtures.forEach(function (fixture) {

		/* generic test definition code using tape */
		tape(fixture.header, function (t) {
			t.plan(1);

			const expected = normalizeWithStub(fixture.second.text);
			const actual = normalizeWithStub(md.render(fixture.first.text));

			t.equals(actual, expected);
		});
	});
});

testLoad(path.join(__dirname, 'fixtures/bare.txt'), function (data) {
	const md = require('markdown-it')()
		.use(mdk, {
			enableBareBlocks: true
		});

	data.fixtures.forEach(function (fixture) {

		/* generic test definition code using tape */
		tape(fixture.header, function (t) {
			t.plan(1);

			const expected = normalizeWithStub(fixture.second.text);
			const actual = normalizeWithStub(md.render(fixture.first.text));

			t.equals(actual, expected);
		});
	});
});

testLoad(path.join(__dirname, 'fixtures/math-in-html.txt'), function (data) {
	const md = require('markdown-it')({
			html: true
		})
		.use(mdk, {
			enableMathBlockInHtml: true,
			enableMathInlineInHtml: true
		});

	data.fixtures.forEach(function (fixture) {

		/* generic test definition code using tape */
		tape(fixture.header, function (t) {
			t.plan(1);

			const expected = normalizeWithStub(fixture.second.text);
			const actual = normalizeWithStub(md.render(fixture.first.text));

			t.equals(actual, expected);
		});
	});
});

// Replace differences between OS (Linux vs Windows) with stubs as we are not testing those specific
// values for these tests.
const normalizeWithStub = (text) => {
	// ex: style="height:1.6667em;..." => style=""
	text = text.replaceAll(/style=\".*?\"/g, "style=\"\"");

	// ex: rowspacing="0.1600em" => rowspacing="1.0em"
	text = text.replaceAll(/=\"\d+\.?\d*em\"/g, "=\"1.0em\"");

	// ex: <svg...></svg> => <svg></svg>
	text = text.replaceAll(/<svg[\s\S]*?><\/svg>/gm, "<svg></svg>");
	return text;
}