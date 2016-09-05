// <author>Djordje Nedeljkovic</author> 
PPView = function () {
    var templateCache = [];
    var viewCache = [];
    return {
        getTemplate: function (url) {
            if (!templateCache[url]) {
                $.ajax({
                    url: url,
                    async: false,
                    success: function (data) {
                        templateCache[url] = data;
                    }
                });
            }
            return templateCache[url];
        },
        getView: function (name, options) {
            if (!viewCache[name]) {
                var viewConfig = ViewConfig[name];
                if (!viewConfig) {
                    return null;
                }
                viewConfig.el = '.outer-content';
                if (typeof options === 'object') {
                    $.extend(viewConfig, options);
                }
                var ctor = eval(viewConfig.ctor);
                if (typeof ctor === 'function') {
                    viewCache[name] = new ctor(viewConfig);
                }
            }
            return viewCache[name];
        }
    };
}();
