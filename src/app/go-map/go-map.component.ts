import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as GoogleMaps from 'angular-google-maps'

import { ViewChild } from '@angular/core';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-go-map',
  templateUrl: './go-map.component.html',
  styleUrls: ['./go-map.component.css']
})
export class GoMapComponent implements OnInit {

  constructor() { }
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() { setTimeout(()=> {
    // Put the logic here 
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  34.0522, lng: -118.2437},
        zoom: 12,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      });
      d3.csv("collision2017.csv", function(d) {
        return { lat: +d.latitude, lot: +d.longitude, direct: +d.day_of_week };
      }).then(function(data:any) {
      
        var overlay = new google.maps.OverlayView()
        // Add the container when the overlay is added to the map.
        overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
          .attr("class", "stations");
  
      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function() {
        var projection = this.getProjection(),
            padding = 10;
  
        var marker = layer.selectAll("svg")
            .data(data)
            .each(transform) // update existing markers
          .enter().append("svg")
            .each(transform)
            .attr("class", "marker");
  
        // Add a circle.
        marker.append("circle")
            .attr("r", 4.5)
            .attr("cx", padding)
            .attr("cy", padding);
  
        // Add a label.
        marker.append("text")
            .attr("x", padding + 7)
            .attr("y", padding)
            .attr("dy", ".31em")
            .text(function(d) { return d.key; });
  
        function transform(d) {
          d = new google.maps.LatLng(d.lat, d.lot);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
              .style("left", (d.x - padding) + "px")
              .style("top", (d.y - padding) + "px");
        }
      };
    };  // Bind our overlay to the map…
    overlay.setMap(map);
  });
    }, 1000);
  }

  }


