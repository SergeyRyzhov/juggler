(function (app, $) {
	var templateFromUrlLoader = {
		loadTemplate: function (name, templateConfig, callback) {
			if (templateConfig.fromUrl) {
				var fullUrl = '/templates/' + templateConfig.fromUrl + '?cacheAge=' +
					templateConfig.maxCacheAge;
				$.get(fullUrl, function (markupString) {
					ko.components.defaultLoader.loadTemplate(name, markupString, callback);
				});
			} else {
				callback(null);
			}
		}
	};

	ko.components.loaders.unshift(templateFromUrlLoader);

	var viewModelCustomLoader = {
		loadViewModel: function (name, viewModelConfig, callback) {
			if (viewModelConfig.viaLoader) {

				var viewModelConstructor = function (params) {
				};

				ko.components.defaultLoader.loadViewModel(name, viewModelConstructor, callback);
			} else {
				callback(null);
			}
		}
	};

	ko.components.loaders.unshift(viewModelCustomLoader);

})(window.juggler = window.juggler || {}, jQuery);
