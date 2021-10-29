//每次调用get() post() 和 ajax() 的时候会先调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3007' + options.url
    console.log(options.url);
})