'use strict';

angular.module('myApp')
    .factory('FrontEndData', function ($resource) {
        var urlJsonDefault = 'https://raw.githubusercontent.com/alexandre-gauge/frontend_data/master/';

        return $resource('', {}, {
            getUsers: {
                url: urlJsonDefault + 'users.json',
                method: 'GET',
                isArray: true
            },
            getBrands: {
                url: urlJsonDefault + 'brands.json',
                method: 'GET',
                isArray: true
            },
            getInteractions: {
                url: urlJsonDefault + 'interactions.json',
                method: 'GET',
                isArray: true
            }
        });
    });