/**
 * Created by Anette on 10.03.2015.
 */

(function() {
    var app = angular.module('mainHeader', []);

    app.controller('clockCtrl', function($filter){

        var time = new Date(1);
        $filter('date')(time);

    })
})