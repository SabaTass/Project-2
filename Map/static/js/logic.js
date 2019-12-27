//  Store our API endpoint inside queryUrl
var url = "https://crashviewer.nhtsa.dot.gov/CrashAPI/crashes/GetCaseList?states=37&fromYear=2016&toYear=2019&minNumOfVehicles=1&maxNumOfVehicles=6&format=json";
var xhr = createCORSRequest('GET', url);
xhr.send();
function createCORSRequest(method, url){
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr){
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined"){
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "https://crashviewer.nhtsa.dot.gov/CrashAPI/crashes/GetCaseList?states=37&fromYear=2016&toYear=2019&minNumOfVehicles=1&maxNumOfVehicles=6&format=json");
if (request){
    request.onload = function(){
        //do something with request.responseText
    };
    request.send();
}



// Perform a GET request to the query URL
d3.json(xhr, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    // console.log(data);
    createFeatures(data.features);
  });

  function createFeatures(crashData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the crash
    function onEachFeature(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.CountyName +
        "</h3><hr><p>" + new Date(feature.properties.CrashDate) + "</p>"+
        "</h3><hr><p>Magnitude: " + feature.properties.TotalVehicles + "</p>");
    }
  
    // Create a GeoJSON layer containing the features array on the crashData object
    // Run the onEachFeature function once for each piece of data in the array
    var crashes = L.geoJSON(crashData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          var color;
          var r = 250
          var g = Math.floor(250-30*feature.properties.mag);
          var b = Math.floor(250-10*feature.properties.mag);
          color= "rgb("+r+" ,"+g+","+b+")"
        
          var geojsonMarkerOptions = {
            radius: 4*feature.properties.mag,
            fillColor: color,
            color: "pink",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          };
          return L.circleMarker(latlng, geojsonMarkerOptions);
        }
      });
  
    // Sending our crashes layer to the createMap function
    createMap(crashes);
  }
  function createMap(crashes) {
    // Various Map Layers (Mapbox API) for user selection
    var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiY2ZlcnJhcmVuIiwiYSI6ImNqaHhvcW9sNjBlMmwzcHBkYzk0YXRsZ2cifQ.lzNNrQqp-E85khEiWhgq4Q");
    var grayScale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiY2ZlcnJhcmVuIiwiYSI6ImNqaHhvcW9sNjBlMmwzcHBkYzk0YXRsZ2cifQ.lzNNrQqp-E85khEiWhgq4Q");
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiY2ZlcnJhcmVuIiwiYSI6ImNqaHhvcW9sNjBlMmwzcHBkYzk0YXRsZ2cifQ.lzNNrQqp-E85khEiWhgq4Q");
  
  
    // BaseMaps that users can select
    var baseMaps = {
      "Satellite Map": satelliteMap,
      "Outdoor Map": outdoors,
      "Gray Scale": grayScale
    };
  
    // Add a tectonic plate layer
    var faultLines =new  L.LayerGroup();
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Faultlines: faultLines
    };
  
    // Create our map, giving it the streetmap and crashes layers to display on load
    var myMap = L.map("map", {
      center: [41.881832, -87.62317],
      zoom: 2.5,
      layers: [satelliteMap, grayScale, outdoors]
    
    });
  
     // Add Fault lines data
     d3.json(faultLines, function(crashData) {
       // Adding our geoJSON data, along with style information, to the tectonicplates
       // layer.
       L.geoJson(crashData, {
         color: "orange",
         weight: 3
       })
       .addTo(faultLines);
     });
  
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    legend: true
  }).addTo(myMap);
  
  }