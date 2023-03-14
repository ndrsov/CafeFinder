mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: cafe.geometry.coordinates, // starting position [lng, lat]
  zoom: 14, // starting zoom
});

const marker1 = new mapboxgl.Marker()
  .setLngLat(cafe.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 20 }).setHTML(
      `<h4>${cafe.title}</h4><p>${cafe.location}</p>`
    )
  )
  .addTo(map);
