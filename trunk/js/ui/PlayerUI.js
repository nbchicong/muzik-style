/**
 * Created by nbchicong@gmail.com<Purple Sky>
 *         on 02/12/2013.
 */
window.undefined = window.undefined;
PlayerUI = {
  version: '1.0'
};
/**
 * Copies all the properties of config to object.
 * @param object
 * @param config
 * @param defaults
 * @returns {*}
 */
PlayerUI.apply = function(object, config, defaults){
  if(defaults){
    PlayerUI.apply(object, defaults);
  }
  if(object && config && typeof config == 'object'){
    for(var prop in config){
      object[prop] = config[prop];
    }
  }
  return object;
};
(function(){
  var isSecure = /^https/i.test(window.location.protocol);
  PlayerUI.apply(PlayerUI, {
    /**
     * Copies all the properties of config to obj if they don't already exist.
     * @param object
     * @param config
     * @returns {Function}
     */
    applyIf: function(object, config){
      if (object) {
        for (var prop in config) {
          if (iNet.isEmpty(object[prop])) {
            object[prop] = config[prop];
          }
        }
      }
      return o;
    },
    /**
     * Returns the current context path.
     * @returns {string}
     */
    getContextPath: function(){
      var pathname = window.location.pathname;
      if (pathname == '/') {
        return '/';
      }
      var position = pathname.indexOf('/', 1);
      if (position == 0)
        position = pathname.length;
      return pathname.substr(0, position);
    },
    /**
     * Returns the full url from the given path.
     * @param path
     * @returns {string}
     */
    getUrl: function(path){
      var url = window.location.protocol + '//';
      url += window.location.hostname;
      if (isSecure && window.location.port != 443) {
        url += ':' + window.location.port;
      }
      else
      if (!isSecure && window.location.port != 80) {
        url += ':' + window.location.port;
      }
      // append the context path.
      pathname = window.location.pathname;
      if (pathname.length > 1) {
        var position = pathname.indexOf('/', 1);
        if (position == 0)
          position = pathname.length;
        url += pathname.substr(0, position);
      }
      if (path.indexOf('/') == 0) {
        return url + path;
      }
      else {
        return url + '/' + path;
      }
    },
    /**
     * Returns file extension
     * @param v
     * @returns {string}
     */
    getExt: function(v){
      if (v === null || v === undefined) {
        return '';
      }
      var i = v.search(/\./);
      return v.substring(i + 1);
    },
    /**
     * Returns true if the passed object is a JavaScript Object, otherwise false.
     * @param v
     * @returns {*|boolean}
     */
    isObject: function(v){
      return v && typeof v == "object";
    },
    /**
     * Returns true if the passed object is a string.
     * @param v
     * @returns {boolean}
     */
    isString: function(v){
      return typeof v === 'string';
    },
    /**
     * Returns true if the passed object is a number. Returns false for
     * non-finite numbers.
     * @param v
     * @returns {boolean}
     */
    isNumber: function(v){
      return typeof v === 'number' && isFinite(v);
    },
    /**
     * Returns true if the passed object is a JavaScript array, otherwise false.
     * @param v
     * @returns {boolean}
     */
    isArray: function(v){
      return toString.apply(v) === '[object Array]';
    },
    /**
     * Returns true if the passed object is not undefined.
     * @param v
     * @returns {boolean}
     */
    isDefined: function(v){
      return typeof v !== 'undefined';
    },
    /**
     * Returns true if the passed value is empty. The value is deemed to be
     * empty if it is * null * undefined * an empty array * a zero length
     * string (Unless the allowBlank parameter is true)
     * @param v
     * @param allowBlank
     * @returns {boolean|Boolean|*}
     */
    isEmpty: function(v, allowBlank){
      return v === null || v === undefined || ((PlayerUI.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false) || (!allowBlank ? v === ' ' : false);
    },
    /**
     * Returns true if the passed object is a email.
     * @param v
     * @returns {boolean}
     */
    isEmail: function(v){
      return /^([a-zA-Z\u00E2\u00EA\u00F4\u0103\u01A1\u01B0\u00E1\u00E0\u1EA3\u00E3\u1EA1\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u00E9\u00E8\u1EBB\u1EBD\u1EB9\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u00F3\u00F2\u1ECF\u00F5\u1ECD\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u00ED\u00EC\u1EC9\u0129\u1ECB\u00FD\u1EF3\u1EF7\u1EF9\u1EF50-9])+([\.a-zA-Z\u00E2\u00EA\u00F4\u0103\u01A1\u01B0\u00E1\u00E0\u1EA3\u00E3\u1EA1\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u00E9\u00E8\u1EBB\u1EBD\u1EB9\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u00F3\u00F2\u1ECF\u00F5\u1ECD\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u00ED\u00EC\u1EC9\u0129\u1ECB\u00FD\u1EF3\u1EF7\u1EF9\u1EF50-9_-])*@([a-zA-Z\u00E2\u00EA\u00F4\u0103\u01A1\u01B0\u00E1\u00E0\u1EA3\u00E3\u1EA1\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u00E9\u00E8\u1EBB\u1EBD\u1EB9\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u00F3\u00F2\u1ECF\u00F5\u1ECD\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u00ED\u00EC\u1EC9\u0129\u1ECB\u00FD\u1EF3\u1EF7\u1EF9\u1EF50-9])+(\.[a-zA-Z\u00E2\u00EA\u00F4\u0103\u01A1\u01B0\u00E1\u00E0\u1EA3\u00E3\u1EA1\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u00E9\u00E8\u1EBB\u1EBD\u1EB9\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u00F3\u00F2\u1ECF\u00F5\u1ECD\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u00ED\u00EC\u1EC9\u0129\u1ECB\u00FD\u1EF3\u1EF7\u1EF9\u1EF50-9_-]+)+$/.test(v);
    },
    /**
     * Generate the identifier as alphabet.
     * @returns {string}
     */
    alphaGenerateId: function(){
      var __id = '';
      var __alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var len = __alphabet.length;
      for (var index = 0; index < len; index++) {
        __id += __alphabet.charAt(Math.floor(Math.random() * len));
        __id += __alphabet.charAt(Math.floor(Math.random() * len));
      }
      // return the identifier 24 character
      return __id.substr(len - 24);
    }
  });
})();