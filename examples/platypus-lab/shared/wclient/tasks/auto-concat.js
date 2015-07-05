var path = require('path');

function arrayDiff (a) {
    return function (i) {
        return a.indexOf(i) < 0;
    };
}

module.exports = function (grunt) {

    grunt.registerMultiTask('autoconcat', '', function () {
        var html = grunt.file.read(this.data.src, 'UTF-8');
        var wd = path.dirname(this.data.src);
        var scripts = getScripts(html);
        var stylesheets = getStylesheets(html);
        scripts = scripts.map(addWd.bind(this, wd));
        stylesheets = stylesheets.map(addWd.bind(this, wd));

        if ( typeof this.data.ignore === 'string' ) {
            this.data.ignore = [this.data.ignore];
        }

        this.data.ignore = this.data.ignore || [];
        this.data.more = this.data.more || {};
        this.data.more.js = this.data.more.js || [];
        this.data.more.css = this.data.more.css || [];

        var files = this.data.ignore.reduce(function (total, item) {
            return total.concat(grunt.file.expand(item));
        }, []);

        scripts = scripts.filter(arrayDiff(files));
        stylesheets = stylesheets.filter(arrayDiff(files));


        scripts = scripts.concat(this.data.more.js);
        stylesheets = stylesheets.concat(this.data.more.css);

        grunt.config('concat', {js:{}, css: {}});
        grunt.config('concat.js.src', scripts);
        grunt.config('concat.css.src', stylesheets);
        grunt.config('concat.js.dest', path.join(this.data.dest, 'app.js'));
        grunt.config('concat.css.dest', path.join(this.data.dest, 'style.css'));

        grunt.loadNpmTasks('grunt-contrib-concat');

        grunt.log.writeln(scripts.length + ' scripts found');
        grunt.log.writeln(stylesheets.length + ' stylesheets found');

        grunt.task.run(['concat:js', 'concat:css']);
    });

};

function getScripts (html) {
    var regScript = new RegExp('<script.*src=.(.*\.js).*></script>', 'gi');
    return getPart(html, regScript);
}

function getStylesheets (html) {
    var regStylesheet = new RegExp('<link.*rel=.stylesheet.*href=.(.*\.css).*>', 'gi');
    return getPart(html, regStylesheet);
}

function getPart (html, regex) {
    var m = null;
    var scripts = [];
    while((m = regex.exec(html)) !== null) {
        if (m[1]) {
            scripts.push(m[1]);
        }
    }
    return scripts;
}

function addWd (wd, item) {
    return path.join(wd, item);
}