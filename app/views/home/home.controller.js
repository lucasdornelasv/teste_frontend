'use strict';

angular.module('myApp')
    .controller('HomeCtrl', function ($scope, $filter, users, brands, interactions) {
        $scope.users = users || [];
        $scope.brands = brands || [];
        $scope.interactions = interactions || [];

        $scope.chartConfig = {};
        $scope.brandFilter = -1;

        var options = {
            chart: {
                type: "column"
            },
            plotOptions: {
                series: {
                    stacking: ""
                }
            }
        };

        if ($scope.users && $scope.users instanceof Array) {
            angular.forEach($scope.users, function (item) {
                var interactions = getInteractions({user:item});
                var middle = item.name.title + '.' + item.name.first;
                Object.assign(item, {
                    name: {
                        middle: middle,
                        full: middle  + ' ' + item.name.last
                    },
                    interactions: interactions,
                    getInteractions: function(brandId){
                        return interactions.filter(function(item){
                            return item.brand == Number(brandId);
                        });
                    }
                });
            });

            $scope.users.sort(function (userA, userB) {
                return userA.interactions.length < userB.interactions.length ? 1 : -1;
            });
        }

        $scope.$watch('brandFilter', function(newValue, oldValue){
            var auxBrand = {id: oldValue};
            if($scope.brandFilter != -1){
                for(var i in $scope.brands){
                    var brand = $scope.brands[i];
                    if(brand.id == newValue){
                        auxBrand = brand;
                        break;
                    }
                }
            }
            loadChart(auxBrand);
        });

        function loadChart(brand){
            function isBrand(brand){
                return brand && brand.id && brand.id != -1;
            }
            var auxUsersResult = isBrand(brand) ? $scope.users.filter(function(user){
                var resp = false;
                for(var i in user.interactions){
                    var interaction = user.interactions[i];
                    if(interaction.brand == brand.id){
                        resp = true;
                        break;
                    }
                }
                return resp;
            }) : $scope.users;

            if(isBrand(brand)){
                auxUsersResult.sort(function (userA, userB) {
                    return userA.getInteractions(brand.id).length < userB.getInteractions(brand.id).length ? 1 : -1;
                });
            }

            var auxInteractionsResult = isBrand(brand) ? $scope.interactions.filter(function(interaction){
                return interaction.brand == brand.id;
            }) : $scope.interactions;

            $scope.pieData = [];
            $scope.usersResult = [];

            angular.forEach(auxUsersResult, function (item) {
                $scope.usersResult.push(item.name.first);

                var auxCountInteractions = (isBrand(brand) ? item.getInteractions(brand.id) : item.interactions).length;
                $scope.pieData.push({
                    name: item.name.middle,
                    y: numToPercent(auxCountInteractions),
                    countInteractions: auxCountInteractions,
                    user: item,
                    brand: brand
                });
            });

            $scope.pieData[0] = Object.assign($scope.pieData[0], {
                sliced: true,
                selected: true
            });
            loadInfoUsers($scope.pieData[0]);

            $scope.chartConfig = {
                options: options,
                series: [
                    {
                        name: brand.name || 'Geral',
                        data: $scope.pieData,
                        type: "column",
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}%'
                        },
                        tooltip: {
                            headerFormat: '{point.name}',
                            pointFormat: '{series.name}: <p>Número de Iterações: <b>{point.countInteractions}</b></p>'
                        },
                        showInLegend: false,
                        events:{
                            click:function(e){
                                $scope.$apply(function(){
                                    loadInfoUsers(e.point.options, e.point);
                                });
                            }
                        }
                    }
                ],
                title: {
                    text: "Usuários Influentes"
                },
                credits: {
                    enabled: true
                },
                loading: false,
                size: 100,
                xAxis: {
                    categories: $scope.usersResult
                }
            };
            if(isBrand(brand)){
                $scope.chartConfig.subtitle = {
                    text: 'Marca: <b>'+brand.name+'</b>, Total de iterações: '+
                    '<b>'+getInteractions({brand: brand}).length+'</b>'
                };
            }
        }

        function loadInfoUsers(options, point){
            console.log(point);
            $scope.userInfo = options.user;
        }

        function getInteractions(obj) {
            obj = obj || {};
            return $scope.interactions.filter(function (interaction) {
                    var resp = false;
                    if(obj.user && obj.brand){
                        resp = interaction.user == obj.user.id && interaction.brand == obj.brand.id;
                    }else if(obj.user){
                        resp = interaction.user == obj.user.id;
                    }else if(obj.brand){
                        resp = interaction.brand == obj.brand.id;
                    }
                    return resp;
            }) || [];
        }
    });

function numToPercent(number, context) {
    if (number && context && !isNaN(number) && !isNaN(context)) number = 100 * (Number(number) / Number(context));
    return number;
}