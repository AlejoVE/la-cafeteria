const { src, dest, watch, series, parallel } = require('gulp')

// CSS & SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

// IMAGES
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

const css = (done) => {
	// Identify the source
	src('src/scss/app.scss')
		// To start the sourcemap
		.pipe(sourcemaps.init())
		// Compile the source
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		// To save the source map  togehter with the css file in build
		.pipe(sourcemaps.write('.'))
		//  Save the compiled source
		.pipe(dest('build/css'))
	done()
}

const dev = () => {
	watch('src/scss/**/*.scss', css)
	watch('src/img/**/*', images)
}

const images = () => {
	return src('src/img/**/*')
		.pipe(imagemin({ optimizationLevel: 3 }))
		.pipe(dest('build/img'))
}

const webpVersion = () => {
	return src('src/img/**/*.{png,jpg}').pipe(webp()).pipe(dest('build/img'))
}

const avifVersion = () => {
	return src('src/img/**/*.{png,jpg}').pipe(avif()).pipe(dest('build/img'))
}

exports.css = css
exports.dev = dev
exports.images = images
exports.webp = webpVersion
exports.avif = avifVersion
exports.build = series(images, webpVersion, avifVersion, css)
exports.default = series(css, dev)
