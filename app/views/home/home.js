'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                /*abstract: true,*/
                url: '/',
                templateUrl: 'views/home/home.html',
                controller: 'HomeCtrl'
            })/*
            .state('product.list', {
                url: '',
                templateUrl: 'components/product/product.list.html',
                controller: 'ProductListCtrl'
            })
            .state('product.create', {
                url: '/create',
                templateUrl: 'components/product/product.form.html',
                controller: 'ProductCreateCtrl'
            })
            .state('product.edit', {
                url: '/edit/:id',
                templateUrl: 'components/product/product.form.html',
                controller: 'ProductEditCtrl'
            });*/
    });