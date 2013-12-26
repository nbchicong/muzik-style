/**
 * Created by nbchicong@gmail.com<Purple Sky>
 *         on 09/12/2013.
 */

(function(){
  $getId = function(name){
    return $('#'+name);
  };
  $postJson = function(url, data, callback){
    var fn = callback || function(){};
    return $.post(url, data, fn, 'json');
  };
  $getJson = function(url, data, callback){
    var fn = callback || function(){};
    return $.get(url, data, fn, 'json');
  };
  log = function(msg){
    console.log(msg);
  };
})();