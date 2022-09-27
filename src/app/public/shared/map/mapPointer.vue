<template>
  <div class="map-frame m-auto">
    <div id="map" class="m-auto"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import L from "leaflet";
export default {
  name: "Home",
  props: ["latLan", "locationName"], // latLan = [ [lat, lan], [lat, lan], ... ]   &   locationName = [ name, name, ... ]
  setup(props) {
    let container;
    let map;
    let marker;

    onMounted(() => {
      container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      map = L.map("map").setView(props.latLan[0], 17);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors',
      }).addTo(map);

      props.latLan.forEach((e, i) => {
        marker = new L.marker([e[0], e[1]])
          .bindPopup(props.locationName ? props.locationName[i] : "asd")
          .addTo(map);
      });

      if (props.latLan.length > 1) {
        const myBounds = new L.LatLngBounds(props.latLan);
        map.fitBounds(myBounds);
      }
    });

    return {};
  },
};
</script>
<style scoped>
#map {
  height: 484px;
  width: 484px !important;
}

@media (max-width: 510px) {
  #map {
    height: 320px;
    width: 320px !important;
  }
}
</style>
