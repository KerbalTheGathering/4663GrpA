module.exports = (grunt) =>
{
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        eslint: {
            files: {
                options: {
                    configFile: './eslint.json',
                    fix: true,
                    rulesdir: ['eslint_rules']
                }
            },
            all: [
                "public/*.js",
                "public/js/*.js",
                "server/*.js",
                "Gruntfile.js",
            ]
        },
        watch: {
            files: ["public/**/*", "server/**/*", "!server/db.json", "!**/node_modules/**"],
            tasks: ["default", "express"],
            options: {
                spawn: false
            }
        },
        express: {
            web: {
                options: {
                script: "server/index.js",
                port: 4663
                }
            }
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks("grunt-eslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express-server");

    // Register task(s).
    grunt.registerTask("default", ["eslint"]);
    grunt.registerTask("serve", ["default", "express", "watch"]);
};