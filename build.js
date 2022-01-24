const Metalsmith  = require('metalsmith'),
    markdown    = require('@metalsmith/markdown'),
    layouts     = require('@metalsmith/layouts'),
    toc         = require('@metalsmith/table-of-contents'),
    collections = require('@metalsmith/collections')
    metallic    = require('metalsmith-metallic'),
    sass        = require("metalsmith-sass");

Metalsmith(__dirname)
    .source('./src')
    .destination('./docs')
    .clean(true)

    .use(metallic())

    // Use Github Flavored Markdown for content
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))

    .use(collections())

    .use(
        toc({
          // explicit defaults
          levels: [2, 3, 4, 5, 6],
          anchor: 'add',
          root: null
        })
      )

      .use(sass({
        outputDir: "css/",   // This changes the output dir to "build/css/" instead of "build/scss/"
        sourceMap: true,
        sourceMapContents: true,
        outputStyle: 'compressed'
    }))

    // Use handlebars as layout engine.
    .use(layouts({
        default: 'default.hbs',
        engine: 'handlebars',
        directory: 'layouts'
    }))

    .build(function(err, files) {
        if (err) { throw err; }
    });