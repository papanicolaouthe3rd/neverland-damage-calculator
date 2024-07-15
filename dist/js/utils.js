var utils = (function (exports) {
    'use strict';

    var escapeHtml = function escapeHtml(unsafe) {
      return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    };

    exports.escapeHtml = escapeHtml;

    return exports;

}({}));

//# sourceMappingURL=utils.js.map
