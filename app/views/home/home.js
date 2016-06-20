'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    users: function(FrontEndData){
                        return FrontEndData.getUsers().$promise;
                    },
                    brands: function(FrontEndData){
                        return FrontEndData.getBrands().$promise;
                    },
                    interactions: function(FrontEndData){
                        return FrontEndData.getInteractions().$promise;
                    }
                }
            });
    });