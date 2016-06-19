'use strict';

angular.module('myApp')
    .controller('HomeCtrl', function ($scope, FrontEndData) {
        $scope.users = [];
        $scope.brands = [];
        $scope.interactions = [];

        FrontEndData.getUsers().$promise
            .then(function (users) {
                $scope.users = users;
            });
        FrontEndData.getInteractions().$promise
            .then(function (interactions) {
                $scope.interactions = interactions;
            });
        FrontEndData.getBrands().$promise
            .then(function (brands) {
                $scope.brands = brands;
            });

        $scope.ordernar = function(){
            var interactions = [];

            function exists(userId){
                var resp = false;

                for(var i in interactions){
                    var aux = interactions[i];
                    if(aux.user == userId){
                        resp = i;
                        break;
                    }
                }
                return resp;
            }

            for(var i in $scope.interactions){
                var interaction = $scope.interactions[i];
                var resp = exists(interaction.user);
                if(resp){
                    interactions[resp].interactions++;
                }else{
                    interactions.push({user: interaction.user, interactions: 1});
                }
            }

            var a = interactions.filter(function(item){
                return item.user == 18;
            });

            console.log(a);
        };
    });