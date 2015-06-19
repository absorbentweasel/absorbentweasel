angular.module("howWasIt.map",[])

.controller('mapController', function($scope){

  window.initialize = function(){
    var mapOptions = {
      center: {lat: -25.363882, lng: 131.044922},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);


    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(-25.363882,131.044922),
          map: map,
          title: 'Hello World!'
      });

    var marker = new google.maps.Marker({
          position: new google.maps.LatLng(-26.363882,131.044922),
          map: map,
          title: 'Hi World!'
      });

    // attaching data to $scope object
    $scope.map = map;
  }


  var loadScript = function(){
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
        '&signed_in=true&callback=initialize';
    document.body.appendChild(script);
  };

  loadScript();

  // for API key use
  // api "https://maps.googleapis.com/maps/api/js?key="

});


