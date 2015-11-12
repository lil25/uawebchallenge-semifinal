import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
    map: null,
    directionsRenderer: null,
    directionService: null,
    routeColors: {
        danger: '#dd335b',
        medium: '#e2aa00',
        safe: '#4bc382'
    },
    routeAlts: [],
    routeDataArr: [],
    routeDetails: null,
    startingAddress: null,
    destinationAddress: null,
    isPanelOpened: false,
    additionalMarkers: [],
    updateMapTimer: null,
    
    insertMap: function() {
        var currentMap;
        var self = this;
        var startLatitude = this.get('startLatitude');
        var startLongitude = this.get('startLongitude');
        var destinationLatitude = this.get('destinationLatitude');
        var destinationLongitude = this.get('destinationLongitude');
        var container = this.$('.jsMap')[0];
        var options = {
            center: new window.google.maps.LatLng(46.941441, 32.057921),
            zoom: 15
        };
        
        if(startLatitude &&
           startLongitude &&
           destinationLatitude &&
           destinationLongitude) {
            options.center = new window.google.maps.LatLng(
                this.get('startLatitude'),
                this.get('startLongitude')
            );
        }
        
        currentMap = new window.google.maps.Map(container, options);
        
        this.set('map', currentMap);
        
        window.google.maps.event.addListener(currentMap, 'tilesloaded', function() {
            self.initDirectionsService();
            self.initMapEvents();
            window.google.maps.event.clearListeners(currentMap, 'tilesloaded');
        });
    }.on('didInsertElement'),
    
    initPerfectScrollbar: function() {
        var scrollContainer = this.$('.left-sidebar__inner');
        
        scrollContainer.perfectScrollbar({
			suppressScrollX: true,
			wheelPropagation: true,
			useSelectionScroll: true
		});
    }.on('didInsertElement'),
    
    updatePerfectScrollbar: function() {
        var scrollContainer = this.$('.left-sidebar__inner');
        
        scrollContainer.perfectScrollbar('update');
    }.observes('routeAlts'),
    
    destroyPerfectScrollbar: function() {
        var scrollContainer = this.$('.left-sidebar__inner');
        
        scrollContainer.perfectScrollbar('destroy');
    }.on('willDestroyElement'),
    
    initMapEvents: function() {
        var self = this;
        var map = this.get('map');
        
        window.google.maps.event.addListener(map, 'click', function(e) {
            var marker;
            var startLatitude = self.get('startLatitude');
            var startLongitude = self.get('startLongitude');
            var destinationLatitude = self.get('destinationLatitude');
            var destinationLongitude = self.get('destinationLongitude');
            
            if(!(startLatitude && startLongitude)) {
                self.showPanelHandler();
                map.setCenter(e.latLng);
                marker = new window.google.maps.Marker({
                    map: map,
                    position: e.latLng,
                    label: {
                        text: 'A'
                    }
                });
                self.get('additionalMarkers').push(marker);
                self.sendAction('setCoordsQuery', {
                    startLatitude: e.latLng.lat(),
                    startLongitude: e.latLng.lng()
                });
                
            }
            else if(!(destinationLatitude && destinationLongitude)) {
                self.showPanelHandler();
                marker = new window.google.maps.Marker({
                    map: map,
                    position: e.latLng,
                    label: {
                        text: 'B'
                    }
                });
                self.get('additionalMarkers').push(marker);
                self.sendAction('setCoordsQuery', {
                    destinationLatitude: e.latLng.lat(),
                    destinationLongitude: e.latLng.lng()
                });
            }
        });
    },
    
    destroyMapEvents: function() {
        var map = this.get('map');
        
        window.google.maps.event.clearListeners(map, 'click');
    }.on('willDestroyElement'),
    
    initDirectionsService: function() {
        var service = new window.google.maps.DirectionsService();

        this.set('directionsService', service);
        this.updateRoute();
    },
    
    updateRoute: function() {
        var self = this;
        var updateMapTimer = this.get('updateMapTimer');
        
        clearTimeout(updateMapTimer);
        updateMapTimer = setTimeout(function() {
            self.updateRouteHandler();
        }, 500);
        this.set('updateMapTimer', updateMapTimer);
    }.observes('startLatitude', 'startLongitude', 'destinationLatitude', 'destinationLongitude'),
    
    updateRouteHandler: function() {
        var self = this;
        var map = this.get('map');
        var service = this.get('directionsService');
        var startLatitude = this.get('startLatitude');
        var startLongitude = this.get('startLongitude');
        var destinationLatitude = this.get('destinationLatitude');
        var destinationLongitude = this.get('destinationLongitude');
        var geocoder = new window.google.maps.Geocoder();
        
        this.set('lastMapUpdateTimestamp', Date.now());
        
        if(startLatitude && startLongitude) {
            geocoder.geocode({
                location: new window.google.maps.LatLng(startLatitude, startLongitude)
            }, function(results, status) {
                if(status === window.google.maps.GeocoderStatus.OK) {
                    self.set('startingAddress', results[0].formatted_address);
                }
            });
        }
        else {
            self.set('startingAddress', null);
        }
        
        if(destinationLatitude && destinationLongitude) {
            geocoder.geocode({
                location: new window.google.maps.LatLng(destinationLatitude, destinationLongitude)
            }, function(results, status) {
                if(status === window.google.maps.GeocoderStatus.OK) {
                    self.set('destinationAddress', results[0].formatted_address);
                }
            });
        }
        else {
            self.set('destinationAddress', null);
        }

        if(service &&
            startLatitude && startLongitude &&
            destinationLatitude && destinationLongitude) {
            var origin = new window.google.maps.LatLng(startLatitude, startLongitude);
            var destination = new window.google.maps.LatLng(destinationLatitude, destinationLongitude);
            
            $.get('/api/safe-routes', {
                startLatitude: startLatitude,
                startLongitude: startLongitude,
                destinationLatitude: destinationLatitude,
                destinationLongitude: destinationLongitude
            })
            .done(function(data) {
                self.showPanelHandler();
                self.clearAdditionalMarkers();
                
                data.routes.forEach(function(route) {
                    var waypointsArr = [];

                    route.waypoints.forEach(function(waypoint) {
                        waypointsArr.push({
                            location: new window.google.maps.LatLng(waypoint.latitude, waypoint.longitude),
                            stopover: false
                        });
                    });

                    var rendererOptions = {
                        map: map,
                        suppressMarkers: false,
                        preserveViewport: true,
                        polylineOptions: {
                            strokeColor: self.get('routeColors.' + route.status)
                        }
                    };
                    var renderer = new window.google.maps.DirectionsRenderer(rendererOptions);
                    var request = {
                        origin: origin,
                        destination: destination,
                        waypoints: waypointsArr,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    };

                    service.route(request, function(response, status) {
                        if(status === window.google.maps.DirectionsStatus.OK) {
                            var bounds = response.routes[0].bounds;
                            var markersArr = [];
                            
                            route.accidents.forEach(function(accident) {
                                var marker = new window.google.maps.Marker({
                                    map: map,
                                    position: new window.google.maps.LatLng(accident.latitude, accident.longitude),
                                    title: accident.address
                                });
                                
                                window.google.maps.event.addListener(marker, 'click', function() {
                                    self.showPanelHandler();
                                });
                                markersArr.push(marker);
                            });

                            renderer.setDirections(response);
                            map.fitBounds(bounds);
                            map.setCenter(bounds.getCenter());

                            self.get('routeAlts').pushObject({
                                isRouteOnMap: true,
                                isMarkersOnMap: true,
                                renderer: renderer,
                                markers: markersArr
                            });
                            
                            self.get('routeDataArr').pushObject({
                                status: route.status,
                                accidents: route.accidents,
                                summary: renderer.directions.routes[0].summary,
                                distance: renderer.directions.routes[0].legs[0].distance.text,
                                duration: renderer.directions.routes[0].legs[0].duration.text,
                                start_address: renderer.directions.routes[0].legs[0].start_address,
                                end_address: renderer.directions.routes[0].legs[0].end_address,
                                steps: renderer.directions.routes[0].legs[0].steps
                            });
                        }
                    });
                });
            });
        }
    },
    
    clearMapHandler: function() {
        this.get('routeAlts').forEach(function(route) {
            route.renderer.setMap(null);
            
            route.markers.forEach(function(marker) {
                marker.setMap(null);
            });
        });
        this.get('routeAlts').clear();
        this.get('routeDataArr').clear();
        this.set('startingAddress', null);
        this.set('destinationAddress', null);
        this.hidePanelHandler();
        
        this.sendAction('setCoordsQuery', {
            startLatitude: null,
            startLongitude: null,
            destinationLatitude: null,
            destinationLongitude: null
        });
    }.on('willDestroyElement'),
    
    showDetailsHandler: function(index) {
        this.set('routeDetails', this.get('routeDataArr')[index]);
        this.$('.left-sidebar__block:not(.ember-view)').slideUp(300);
        this.$('.left-sidebar__block.ember-view:not(:eq(' + index + '))').removeClass('active-route').slideUp(300);
        this.$('.left-sidebar__block.ember-view:eq(' + index + ')').addClass('active-route');
        this.$('.deployed-route').slideDown(300);
        this.$('.map-header-sidebar__learn-more-wrap').fadeIn(300);
    },
    
    hideDetailsHandler: function() {
        this.$('.left-sidebar__block').removeClass('active-route').slideDown(300);
        this.$('.deployed-route').slideUp(300);
        this.$('.map-header-sidebar__learn-more-wrap').fadeOut(300);
    },
    
    showPanelHandler: function() {
        this.set('isPanelOpened', true);
    },
    
    hidePanelHandler: function() {
        this.set('isPanelOpened', false);
    },
    
    clearAdditionalMarkers: function() {
        var additionalMarkers = this.get('additionalMarkers');
        
        additionalMarkers.forEach(function(marker) {
            marker.setMap(null);
        });
        
        this.set('additionalMarkers', []);
    },
    
    reverseRouteHandler: function() {
        var startLatitude = this.get('startLatitude');
        var startLongitude = this.get('startLongitude');
        var destinationLatitude = this.get('destinationLatitude');
        var destinationLongitude = this.get('destinationLongitude');
        
        if(startLatitude && startLongitude &&
            destinationLatitude && destinationLongitude) {
            this.clearMapHandler();
            this.sendAction('setCoordsQuery', {
                startLatitude: destinationLatitude,
                startLongitude: destinationLongitude,
                destinationLatitude: startLatitude,
                destinationLongitude: startLongitude
            });
        }
    },
    
    actions: {
        toggleRoute: function(index) {
            var map = this.get('map');
            var route = this.get('routeAlts')[index];
            
            if(route.isRouteOnMap) {
                route.isRouteOnMap = false;
                route.renderer.setMap(null);
            }
            else {
                route.isRouteOnMap = true;
                route.renderer.setMap(map);
            }
        },
        
        toggleMarkers: function(index) {
            var map = this.get('map');
            var route = this.get('routeAlts')[index];
            
            if(route.isMarkersOnMap) {
                route.isMarkersOnMap = false;
                route.markers.forEach(function(marker) {
                    marker.setMap(null);
                });
            }
            else {
                route.isMarkersOnMap = true;
                route.markers.forEach(function(marker) {
                    marker.setMap(map);
                });
            }
        },
        
        showDetails: function(index) {
            this.showDetailsHandler(index);
        },
        
        hideDetails: function() {
            this.hideDetailsHandler();
        },
        
        clearMap: function() {
            this.clearMapHandler();
        },
        
        hidePanel: function() {
            this.hidePanelHandler();
        },
        
        reverseRoute: function() {
            this.reverseRouteHandler();
        }
    }
});
