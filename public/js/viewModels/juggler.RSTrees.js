//RS tree builder
(function (app, $) {
  ko.components.register('juggler-rstrees', {
    viewModel: function (params) {
      
      var k = ko.observable(5);
      var r = ko.observable(4);
      var s = ko.observable(2);
      
      
      return {
        amountNodes:k,
        nodeSize:r,
        intersectionSize:s
      };
    },
    template: {
      fromUrl: 'rstrees.html',
      maxCacheAge: 60000
    }
  });
})(window.juggler = window.juggler || {}, jQuery);
