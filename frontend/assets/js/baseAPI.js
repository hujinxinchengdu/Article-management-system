//This function will be called every time get() post() and ajax() are called
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3007' + options.url
    console.log(options.url);
})