'use strict';

angular.module('myApp')
    .factory('FrontEndData', function ($resource) {
        function contains( elems, callback, inv ) {
            var ret = [];

            // Go through the array, only saving the items
            // that pass the validator function
            for ( var i = 0, length = elems.length; i < length; i++ ) {
                if ( !inv !== !callback( elems[ i ], i ) ) {
                    ret.push( elems[ i ] );
                }
            }

            return ret;
        }

        return {
            contains: contains
        };
    });