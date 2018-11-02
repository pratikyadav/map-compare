(function() {
    var layerids = getLayerIds();
    if (!layerids) {
        document.getElementById('map1').style.display = 'none';
        document.getElementById('map2').style.display = 'none';
        document.getElementById('toggle').style.display = 'none';
        document.getElementById('help').style.display = 'block';

        document.getElementById('compare').onclick = function(e) {
            document.getElementById('compare').className = 'bold';
            document.getElementById('swipe').className = '';
            var elements = document.getElementsByTagName('dd');
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = elements[i].innerHTML.replace(
                    /http:\/\/lxbarth.com\/compare\/swipe\//g,
                    'http:\/\/lxbarth.com\/compare\/');
            }
            return false;
        };
        document.getElementById('swipe').onclick = function() {
            document.getElementById('swipe').className = 'bold';
            document.getElementById('compare').className = '';
            var elements = document.getElementsByTagName('dd');
            for (var i = 0; i < elements.length; i++) {
                elements[i].innerHTML = elements[i].innerHTML.replace(
                    /http:\/\/lxbarth.com\/compare\//g,
                    'http:\/\/lxbarth.com\/compare\/swipe\/');
            }
            return false;
        };
        return;
    }

    var map1 = L.mapbox.map('map1', null)
        .setView([40, -74.50], 9);
    var map2 = L.mapbox.map('map2', null)
        .setView([40, -74.50], 9);
    addLayer(layerids[0], map1);
    addLayer(layerids[1], map2);
    L.hash(map1);

    // when either map finishes moving, trigger an update on the other one.
    map1.on('moveend', follow).on('zoomend', follow);
    map2.on('moveend', follow).on('zoomend', follow);

    // quiet is a cheap and dirty way of avoiding a problem in which one map
    // syncing to another leads to the other map syncing to it, and so on
    // ad infinitum. this says that while we are calling sync, do not try to 
    // loop again and sync other maps
    var quiet = false;
    function follow(e) {
        if (quiet) return;
        quiet = true;
        if (e.target === map1) sync(map2, e);
        if (e.target === map2) sync(map1, e);
        quiet = false;
    }

    // sync simply steals the settings from the moved map (e.target)
    // and applies them to the other map.
    function sync(map, e) {
        map.setView(e.target.getCenter(), e.target.getZoom(), {
            animate: false,
            reset: true
        });
    }

    // Toggle to swipe.
    document.getElementById('toggle').onclick = function() {
        location.href = location.origin + location.pathname + "swipe/" + location.search + location.hash;
    };
})();
