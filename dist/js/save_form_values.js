(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    var form = document.getElementById('attribute-form');
    var defaultFormValues = {
      "attack": 100000,
      "attack_amplifier": 32,
      "crit": 10000,
      "crit_rate": 32,
      "crit_dmg": 0,
      "break_rate": 50,
      "dmg_increase": 10,
      "pvp_dmg_increase": 12,
      "pierce_rate": 50,
      "target_player": "shionne",
      "save_form_vals": "off"
    };
    var storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData === null) {
      storedFormData = defaultFormValues;
    } else {
      for (var _i = 0, _Object$keys = Object.keys(defaultFormValues); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (!storedFormData.hasOwnProperty(key)) {
          storedFormData[key] = defaultFormValues[key];
        }
      }
    }

    // Load saved values
    var formData = storedFormData;
    for (var _i2 = 0, _Object$entries = Object.entries(formData); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        _key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      if (form.elements[_key]) {
        if (form.elements[_key].type === 'checkbox') {
          form.elements[_key].checked = value === "on";
        } else {
          form.elements[_key].value = value;
        }
      }
    }
    form.addEventListener('submit', function (event) {
      var formData = new FormData(form);
      var data = Object.fromEntries(formData.entries());
      if (data["save_form_vals"] === "on") {
        var serializedData = JSON.stringify(data);
        localStorage.setItem("formData", serializedData);
      } else {
        localStorage.removeItem("formData");
      }
    });
  });

}());

//# sourceMappingURL=save_form_values.js.map
