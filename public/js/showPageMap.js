mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: cafeLocation, // starting position [lng, lat]
  zoom: 14, // starting zoom
});

const marker1 = new mapboxgl.Marker().setLngLat(cafeLocation).addTo(map);
