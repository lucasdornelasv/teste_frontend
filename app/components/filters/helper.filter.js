'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp')
    .filter('translate', function(){
        return function (value){
            return value == 'male' ? 'masculino' : value == 'female' ? 'feminino' : value;
        }
    })
    .filter('titleCase', function() {
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        };
    });
