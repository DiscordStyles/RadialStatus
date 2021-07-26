// Used to build scss files to the dist folder.

const sass = require('sass');
const fs = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

console.log('Building RadialStatus.css file...');

sass.render({
	file: 'src/_base.scss',
	outputStyle: 'expanded'
}, (err, result) => {
	if (err) {
		console.error(err);
		return false;
	}

	const newRes = Buffer.from(result.css).toString();

	postcss([autoprefixer])
		.process(newRes, {
			from: undefined,
			to: undefined
		})
		.then(postcssRes => {
			fs.writeFile('dist/RadialStatus.css', postcssRes.css, (err) => {
				if (err) console.error(err);
				else console.log(`Successfully built RadialStatus.css file. (${(result.stats.duration/60000 * 60).toFixed(2)}s)`);
			})
		})
})