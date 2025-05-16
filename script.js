// Inisialisasi peta
const map = L.map('map').setView([-6.903, 107.6510], 13);

// Basemap OSM
const basemapOSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// Basemap Google Maps
const baseMapGoogle = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Map by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Basemap Google Satellite
const baseMapSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  attribution: 'Satellite by <a href="https://maps.google.com/">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Tambahkan salah satu basemap secara default
basemapOSM.addTo(map);
// Daftar semua pilihan basemap
const baseMaps = {
    "OpenStreetMap": basemapOSM,
    "Google Maps": baseMapGoogle,
    "Google Satellite": baseMapSatellite
  };
  
  // Tambahkan control layer ke peta
  L.control.layers(baseMaps).addTo(map);
  
  
  // Tombol "Home"
  const homeControl = L.control({ position: 'topleft' });
  homeControl.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    div.innerHTML = '🏠';
    div.style.backgroundColor = 'white';
    div.style.width = '30px';
    div.style.height = '30px';
    div.style.lineHeight = '30px';
    div.style.textAlign = 'center';
    div.style.cursor = 'pointer';
    div.title = 'Kembali ke Home';
    div.onclick = function() {
      map.setView([home.lat, home.lng], home.zoom);
    };
    return div;
  };
  homeControl.addTo(map);
// Fitur "My Location"
L.control.locate({
    position: 'topleft',
    flyTo: true,
    strings: {
      title: "Temukan lokasiku"
    },
    locateOptions: {
      enableHighAccuracy: true
    }
  }).addTo(map);
  
  var symbologyPoint = {
    radius: 5,
    fillColor: "#9dfc03",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
    }
    
    const jembatanPT = new L.LayerGroup();
$.getJSON("./asset/data-spasial/jembatan_pt.geojson", function (OBJECTID) {
L.geoJSON(OBJECTID, {
pointToLayer: function (feature, latlng) {
return L.circleMarker(latlng, symbologyPoint);}
}).addTo(jembatanPT);
});
jembatanPT.addTo(map);

const adminKelurahanAR = new L.LayerGroup();
$.getJSON("./asset/data-spasial/admin_kelurahan_ln.geojson", function (OBJECTID) {
L.geoJSON(OBJECTID, {
style: {
color : "black",
weight : 2,
opacity : 1,
dashArray: '3,3,20,3,20,3,20,3,20,3,20',
lineJoin: 'round'
}
}).addTo(adminKelurahanAR);
});
adminKelurahanAR.addTo(map);