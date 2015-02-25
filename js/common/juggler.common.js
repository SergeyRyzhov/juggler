(function (app, $) {
  app.ready = function (fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive')
          fn();
      });
    }
  };

  app.ajax = function (url, data, type, dataType) {
        return $.ajax({
            type: type || 'get',
            url: url,
            data: data,
            dataType: dataType || 'json'
        });
    };
})(window.juggler = window.juggler || {}, jQuery);
