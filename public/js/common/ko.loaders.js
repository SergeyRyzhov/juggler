(function(app, $) {


	var templateFromUrlLoader = {
		loadTemplate: function(name, templateConfig, callback) {
			if (templateConfig.fromUrl) {
				// Uses jQuery's ajax facility to load the markup from a file
				var fullUrl = '/templates/' + templateConfig.fromUrl + '?cacheAge=' +
					templateConfig.maxCacheAge;
				$.get(fullUrl, function(markupString) {
					// We need an array of DOM nodes, not a string.
					// We can use the default loader to convert to the
					// required format.
					ko.components.defaultLoader.loadTemplate(name, markupString, callback);
				});
			} else {
				// Unrecognized config format. Let another loader handle it.
				callback(null);
			}
		}
	};

	// Register it
	ko.components.loaders.unshift(templateFromUrlLoader);

	var viewModelCustomLoader = {
		loadViewModel: function(name, viewModelConfig, callback) {
			if (viewModelConfig.viaLoader) {
				// You could use arbitrary logic, e.g., a third-party
				// code loader, to asynchronously supply the constructor.
				// For this example, just use a hard-coded constructor function.
				var viewModelConstructor = function(params) {
					this.prop1 = 123;
				};

				// We need a createViewModel function, not a plain constructor.
				// We can use the default loader to convert to the
				// required format.
				ko.components.defaultLoader.loadViewModel(name, viewModelConstructor,
					callback);
			} else {
				// Unrecognized config format. Let another loader handle it.
				callback(null);
			}
		}
	};

	// Register it
	ko.components.loaders.unshift(viewModelCustomLoader);

})(window.juggler = window.juggler || {}, jQuery);
