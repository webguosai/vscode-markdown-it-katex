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

			const expected = fixture.second.text;
			const actual = md.render(fixture.first.text);

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

			const expected = fixture.second.text;
			const actual = md.render(fixture.first.text);

			t.equals(actual, expected);
		});
	});
});
