(function () {
    'use strict';

    var API_CONFIG = {
      api_url: 'http://localhost:7001'
    };

    var escapeHtml = function escapeHtml(unsafe) {
      return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    };

    document.addEventListener('DOMContentLoaded', function () {
      function getAndPreperateParameters() {
        var urlParams = new URLSearchParams(window.location.search);
        var params = Object.fromEntries(urlParams.entries());
        // Preprocess parameters
        delete params['save_form_vals'];
        for (var _i = 0, _arr = ['attack', 'crit']; _i < _arr.length; _i++) {
          var key = _arr[_i];
          params[key] = parseInt(params[key]);
        }
        for (var _i2 = 0, _arr2 = ['attack_amplifier', 'crit_rate', 'crit_dmg', 'break_rate', 'dmg_increase', 'pvp_dmg_increase', 'pierce_rate']; _i2 < _arr2.length; _i2++) {
          var _key = _arr2[_i2];
          params[_key] = parseFloat(params[_key]) / 100;
        }
        return params;
      }
      var recommendationContainer = document.getElementById('recommendation-container');
      function addToRecommendationContainer(html) {
        if (recommendationContainer) {
          recommendationContainer.innerHTML += html;
        }
      }
      function createAndInsertAlert(alertText) {
        var alertHTML = "\n            <div class=\"rest-failure-alert\">\n                <div class=\"alert alert-danger\" role=\"alert\">" + escapeHtml(alertText) + "</div>\n\n                <a href=\"index.html\">Go bath to the home page</a>\n            </div>";
        addToRecommendationContainer(alertHTML);
      }
      function addRecommendations(data) {
        console.log(data);
        var recommendationHTML = "\n            <h1>Recommendations against player " + escapeHtml(data['player']) + "</h1>\n        ";
        addToRecommendationContainer(recommendationHTML);
      }
      var recommendationsEndPoint = "".concat(API_CONFIG.api_url, "/calculate");
      fetch(recommendationsEndPoint, {
        method: 'POST',
        body: JSON.stringify(getAndPreperateParameters()),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if (!response.ok) {
          throw new Error();
        }
        return response.text();
      }).then(function (data) {
        data = JSON.parse(data);
        addRecommendations(data);
      })["catch"](function (err) {
        console.log(err);
        createAndInsertAlert('Issues processing the request. Please try again later.');
      });
    });

}());

//# sourceMappingURL=get_recommendations.js.map
