<template>
  <div class="map-controller">
    <div class="map-frame">
      <div id="map"></div>
    </div>
    <div class="btn-controller">
      <Button @click="done()" icon="pi pi-check" class="p-button-rounded" />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import L from "leaflet";
export default {
  name: "Home",
  props: ["latLong"],
  setup(props, { emit }) {
    let container;
    let map;
    let marker;
    let latlng;
    onMounted(() => {
      container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }

      map = L.map("map").setView(
        props.latLong ?? [36.29793700229986, 59.58385705947877],
        17
      );
      latlng = {
        lat: props.latLong ? props.latLong[0] : 36.29793700229986,
        lng: props.latLong ? props.latLong[1] : 59.58385705947877,
      };

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors',
        }
      ).addTo(map);

      marker = L.marker(map.getCenter()).addTo(map);

      map.on("move", function (e) {
        latlng = e.target._lastCenter;
        map.removeLayer(marker);
        marker = L.marker(map.getCenter()).addTo(map);
      });
    });

    const done = () => {
      emit("returned", latlng);
    };

    return { done };
  },
};
</script>

<style scoped>
.map-controller {
  position: relative;
}

.btn-controller {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: left;
  z-index: 10;
  padding: 10px;
}
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
