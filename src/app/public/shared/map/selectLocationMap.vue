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
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
export default {
  name: "Home",
  props: {
    show: Boolean,
  },
  emits: ["onClose", "latLan"],
  setup(prop, { emit }) {
    const showDialog = ref(false);
    let container;
    let map;
    let marker;
    let latlng;
    onMounted(() => {
      container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      map = L.map("map").setView([36.29793700229986, 59.58385705947877], 15);
      latlng = { lat: 36.10237644873644, lng: 58.79882812500001 };
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

      // L.tileLayer(
      //   "http://example.com:20008/tile/MyMap/{z}/{x}/{y}.png" +
      //     (L.Browser.retina ? "&scale=2" : ""),
      //   { detectRetina: true }
      // ).addTo(i);

      map.on("click", function (e) {
        emit("latLan", e.latlng);
      });
    });

    const done = () => {
      emit("latLan", latlng);
    };

    watch(
      () => prop.show,
      (e) => {
        showDialog.value = e;
        if (!e) return emit("onClose");
      }
    );

    return { showDialog, done };
  },
};
</script>
<style scoped>
#map {
  height: 380px;
  width: 100%;
}

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
</style>
