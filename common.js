L.Google.prototype.addTo =
L.Yandex.prototype.addTo =
function(map) {
    map.addLayer(this);
    return this;
};
L.Yandex.prototype.getContainer =
L.Google.prototype.getContainer = function() {
    return this._container;
};

L.mapbox.accessToken = 'pk.eyJ1IjoicHJhdGlreWFkYXYiLCJhIjoiY2pocHcxYTNxMWRpdTM3cWp5dHZtM2d6bCJ9.iPF7EN0N_BUbdwQ04t_HSw';

var addLayer = function(layerid, map) {
    var split = layerid.split('.');
    var layer = null;
    switch(split[0]) {
        case 'bing':
            layer = new L.BingLayer('AjCTNNlzpfcDOc0G58A4Hzx1N0OGrO8IXpFj1TVqlPG7sUxc8LqXbClnVK9RLk4q');
            break;
        case 'google':
            // split[1] can be one of:
            // ROADMAP
            // SATELLITE
            // HYBRID
            // TERRAIN
            layer = new L.Google(split[1] || 'ROADMAP');
            break;
        case 'yandex':
            layer = new L.Yandex();
            break;
        case 'osm':
            map.attributionControl.addAttribution('<a href="https://openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>');
            layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
            break;
        default:
            if (layerid.indexOf('http') === 0) {
                layer = new L.TileLayer(decodeURIComponent(layerid));
            } else {
                layer = L.mapbox.tileLayer(layerid);
            }
            break;
    }
    return layer.addTo(map);
};

var getLayerIds = function() {
    if (!location.search) {
        return null;
    }
    return (location.search.split('?')[1] || '')
        .split('/')[0]
        .split('&');
};
