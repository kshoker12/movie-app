const mix = require('laravel-mix');
require("laravel-mix-purgecss");

mix.react().postCss('resources/css/app.css', 'public/css', []).purgeCss();