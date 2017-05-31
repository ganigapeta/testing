'use strict';

angular.module("app").controller('dashboardCtrl', ['DashboardService', '$rootScope', '$scope', 'appService', '$state', function(DashboardService, $rootScope, $scope, appService, $state) {
  var dashboard = this;

  dashboard.chartOption = DashboardService.chartOptions(setServerProperties());
  //dashboard.server2Config = DashboardService.chartOptions(setServerProperties());

  (function () {
    setInterval(function () {
        addSeries();
    }, 1000);
  })();

  dashboard.selectServerType = function (type) {
    var params = {};
    switch (type) {
      case 'memoryUsage':
        setServerProperties(type, 'Memory Usage');
        break;
      case 'cpuUsage':
        setServerProperties(type, 'CPU Usage');
        break;
      case 'diskUsage':
        setServerProperties(type, 'Disk Usage');
        break;
    }

    dashboard.chartOption = DashboardService.chartOptions(dashboard.selectedChart);
  };

  dashboard.setServerURL = function (param) {
    DashboardService.setURL(param);    
  };

  function setServerProperties (type, title) {
    if (type) {
      dashboard.selectedChart = {
        type: type,
        title: title
      };
    } else {
      return  {
        type: 'memoryUsage',
        title: 'Memory Usage'
      };
    }
  }

  function addSeries () {

    successResponse();

      function successResponse (response) {
          var seriesPoint = {
            x: (new Date()).getTime(),
            y: response ? response.responsePayloadData[dashboard.selectedChart.type] : Math.round(Math.random() * 2)
          };
         dashboard.chartOption.series[0].data.push(seriesPoint);
         dashboard.chartOption.series[0].data.shift();
         $scope.$apply();
      }
      // Enable this to get the data from server
      /*DashboardService.getcputime()
                      .success(successResponse)
                      .error(function (error) {
                        console.log('Error >>>', error);
                      });*/

  };

}]);
