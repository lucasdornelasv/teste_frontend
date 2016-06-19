'use strict';

angular.module('myApp')
    .filter('customSorter', function(){
        return function(items, field){
            var filtered = [];
            angular.forEach(items, function(item) {
                filtered.push(item);
            });
            filtered.sort(function (a, b) {
                return (CustomOrder(a.class) > CustomOrder(b.class) ? 1 : -1);
            });
            return filtered;
        };
    })
    .controller('HomeCtrl', function ($scope, $filter, users, brands, interactions) {
        $scope.users = users || [];
        $scope.brands = brands || [];
        $scope.interactions = interactions || [];

        if($scope.users && $scope.users instanceof Array){
            $scope.users.sort(function (userA, userB) {
                return getInteractions(userA).length < getInteractions(userB).length ? 1 : -1;
            });
        }

        function getInteractions(user){
            return $scope.interactions.filter(function(interaction){
                return interaction.user == user.id;
            });
        }

        $scope.chartOptions = {
            title: {
                text: 'Temperature data'
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        };



        /*$scope.users = $filter('orderBy')($scope.users, function(){
            return function(items, field){
                items.sort(function (userA, userB) {
                    return getInteractions(userA).length < getInteractions(userB).length ? 1 : -1;
                });
                return items;
            }
        });*/

        $scope.ordernar = function(){
            console.log(getInteractions($scope.users[0]));
            console.log(getInteractions($scope.users[$scope.users.length - 1]));
        }
    });