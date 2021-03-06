'use strict';

angular.module("app").controller('dashboardCtrl', ['DashboardService', '$rootScope', '$scope', 'appService', '$state', function(DashboardService, $rootScope, $scope, appService, $state) {
  var dashboard = this;
  var traits = [];
  dashboard.userName = $rootScope.globals.currentUser;
  (function() {
    getresponsedata();

    // var isSessionExist = appService.checkSessionOnURLChange();
    // if (!isSessionExist) {
    //   $state.go('login');
    //  }
		//   else {
    //   getresponsedata();
    // }
  })();

  function getresponsedata() {
    DashboardService.getcputime()
      .success(function(response) {
        console.log(response);
        dynamicUpdate(response);
        return response;
      })
      .error(function(error) {
        console.log(error);
      });
  };

  function dynamicUpdate(responsedata) {
    Highcharts.chart('containerdisk', {
      chart: {
        type: 'column',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 2,
        events: {
          load: function() {
            //
            // // set up the updating of the chart each second
              var series = this.series[0];
            //
            // setInterval(function() {
            //   var serverdata = getresponsedata();
            //   var x = (new Date()).getTime(), // current time
            //     y = serverdata.responsePayloadData.freeMemory;
            //   series.addPoint([x, y], true, true);
            // }, 10000);
            setInterval(function() {
              DashboardService.getcputime()
                .success(function(response) {
                  console.log(response.responsePayloadData.diskUsage);
                  var x = (new Date()).getTime(), // current time
                    y = response.responsePayloadData.diskUsage;
                  series.addPoint([x, y], true, true);
                }).error(function(error) {
                  //error
                });
            }, 5000);
          }
        }
      },
      title: {
        text: 'Disk Usage'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Disk'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      /*tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },*/
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'diskUsage',
        pointWidth: 4,
        data: (function() {
          //grapharray.push(data.responsePayloadData.freeMemory);
          //console.log(grapharray);
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -199; i <= 0; i += 1) {
            // var serverdata = getresponsedata();
            // console.log(serverdata);
            data.push({
              x: time + i * 5000,
              y: Math.round(Math.random() * 1)
            });
          }
          console.log(data);
          return data;
        }())
      }]
    });
    Highcharts.chart('containercpu', {
      chart: {
        type: 'column',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 2,
        events: {
          load: function() {
            //
            // // set up the updating of the chart each second
              var series = this.series[0];
            //
            // setInterval(function() {
            //   var serverdata = getresponsedata();
            //   var x = (new Date()).getTime(), // current time
            //     y = serverdata.responsePayloadData.freeMemory;
            //   series.addPoint([x, y], true, true);
            // }, 10000);
            setInterval(function() {
              DashboardService.getcputime()
                .success(function(response) {
                  console.log(response.responsePayloadData.cpuUsage);
                  var x = (new Date()).getTime(), // current time
                    y = response.responsePayloadData.cpuUsage;
                  series.addPoint([x, y], true, true);
                }).error(function(error) {
                  //error
                });
            }, 5000);
          }
        }
      },
      title: {
        text: 'CPU Usage'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'CPU'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      /*tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },*/
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'cpuUsage',
        pointWidth: 4,
        data: (function() {
          //grapharray.push(data.responsePayloadData.freeMemory);
          //console.log(grapharray);
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -199; i <= 0; i += 1) {
            // var serverdata = getresponsedata();
            // console.log(serverdata);
            data.push({
              x: time + i * 5000,
              y: Math.round(Math.random() * 2)
            });
          }
          console.log(data);
          return data;
        }())
      }]
    });

    Highcharts.chart('containermemory', {
      chart: {
        type: 'column',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 2,
        events: {
          load: function() {
            //
            // // set up the updating of the chart each second
	            var series = this.series[0];
            //
            // setInterval(function() {
            //   var serverdata = getresponsedata();
            //   var x = (new Date()).getTime(), // current time
            //     y = serverdata.responsePayloadData.freeMemory;
            //   series.addPoint([x, y], true, true);
            // }, 10000);
            setInterval(function() {
              DashboardService.getcputime()
                .success(function(response) {
									console.log(response.responsePayloadData.freeMemory);
                  var x = (new Date()).getTime(), // current time
                    y = response.responsePayloadData.freeMemory;
                  series.addPoint([x, y], true, true);
                }).error(function(error) {
                  //error
                });
            }, 5000);
          }
        }
      },
      title: {
        text: 'Memory Usage'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Memory'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      /*tooltip: {
          formatter: function () {
              return '<b>' + this.series.name + '</b><br/>' +
                  Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                  Highcharts.numberFormat(this.y, 2);
          }
      },*/
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'freeMemory',
        pointWidth: 4,
        data: (function() {
          //grapharray.push(data.responsePayloadData.freeMemory);
          //console.log(grapharray);
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -199; i <= 0; i += 1) {
            // var serverdata = getresponsedata();
            // console.log(serverdata);
            data.push({
              x: time + i * 5000,
              y: Math.round(Math.random() * 200000000)
            });
          }
          console.log(data);
          return data;
        }())
      }]
    });

  }
}]);
