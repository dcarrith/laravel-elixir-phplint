'use strict';

var gulp = require('gulp');
var phplint = require('phplint');
var notify = require('gulp-notify');
var elixir = require('laravel-elixir');
var path = require('path');

elixir.extend('phplint', function(src, options) {
    src = src || [
        'app/**/*.php',
        'test/**/*.php'
    ];

    options = options || {};

    var onError = function(err) {
        notify.onError({
            title: 'Laravel Elixir',
            subtitle: 'PHPLint Failed',
            message: '<%= error.message %>',
            icon: path.join(__dirname, '../laravel-elixir/icons/fail.png')
        })(err);
    };
    
    new Task('phplint', function() {
        phplint.lint(src, options, function(err) {
            if (err) {
                onError(err);
            } else {
                notify({
                    title: 'Laravel Elixir',
                    message: 'PHPLint Passed',
                    icon: path.join(__dirname, '../laravel-elixir/icons/pass.png'),
                    onLast: true
                });
            }
        });
    })
    .watch('./app/**');
});
