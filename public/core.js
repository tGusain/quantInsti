'use strict';
var quantInsti = angular.module('quantInsti', []);


function mainController($scope, $http) {
  $scope.formData = {};
  $scope.view=true;
  $scope.listSpecificInstrument = false;
  $scope.successPost = false;
  $scope.instrumentNotFound = false;
  setInterval(function() {
    $http.get('/showAll')
      .success(function(data) {
        $scope.instruments = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }, 2000);


  // GET INSTRUMENT BY ID
  $scope.getInstrumentById = function(instrumentId) {
    $http.get(`/instrument/${instrumentId}`)
      .success(function(data) {
        if (!data || !data.length) {
          $scope.instrumentNotFound = true;
        } else {
          $scope.instrumentNotFound = false;
          $scope.listSpecificInstrument = true;

          $scope.selectedInstruments = data;
        }
      })
      .error(function(data) {
        $scope.instrumentNotFound = true;
        console.log('Error: ' + data);
      });
  };

  // POST API
  $scope.postData = function(data) {
    var body = {};
    body.data=data;
    $http.post('/postData',body)
      .success(function(data) {
        $scope.successPost = true;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

}
