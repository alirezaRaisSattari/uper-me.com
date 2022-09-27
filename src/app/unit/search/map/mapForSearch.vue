<template>
  <div id="map"></div>
  <Swiper
    class="btn-controller-3"
    :direction="'horizontal'"
    :free-mode="true"
    :scrollbar="{ el: '.swiper-scrollbar', draggable: true }"
    :slides-per-view="'auto'"
    :space-between="0"
  >
    <SwiperSlide v-for="item in categories" :key="item">
      <Chip v-if="item">
        <div class="d-flex align-items-center py-2">
          <p class="text-one-line">{{ item.title }}</p>
          <i class="fas fa-chevron-left text-sm pr-3"></i>
        </div>
      </Chip>
    </SwiperSlide>
  </Swiper>
  <div class="btn-controller">
    <Button
      @click="$emit('next')"
      icon="fas fa-chevron-right"
      class="p-button-rounded ml-2"
    />
    <Button
      @click="$emit('previous')"
      icon="fas fa-chevron-left"
      class="p-button-rounded"
    />
  </div>
  <div class="btn-controller-2 d-flex flex-column">
    <Button
      @click="$emit('category')"
      :disabled="categories.length > 2"
      :label="$t('category')"
      icon="fas fa-chevron-right"
      class="p-button-rounded my-2 right-btns"
    />
    <Button
      @click="done"
      :label="$t('searchThisArea')"
      icon="fas fa-chevron-right"
      class="p-button-rounded right-btns"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import L from "leaflet";
import Chip from "primevue/chip";

export default {
  name: "Home",
  props: ["categories", "markers"],
  components: { Chip },
  emits: ["onClose", "latLan"],
  setup(props, { emit }) {
    const showDialog = ref(false);
    let container;
    let map;
    let marker;
    let latlng;
    let latLngList = [];

    onMounted(() => {
      container = L.DomUtil.get("map");
      if (container != null) {
        container._leaflet_id = null;
      }
      map = L.map("map").setView([36.29793700229986, 59.58385705947877], 15);
      latlng = { lat: 36.29793700229986, lng: 59.58385705947877 };
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      marker = L.marker(map.getCenter()).addTo(map);

      map.on("move", function (e) {
        latlng = e.target._lastCenter;
        map.removeLayer(marker);
        marker = L.marker(map.getCenter()).addTo(map);
      });
    });

    const done = () => {
      emit("latLan", latlng);
    };

    watch(
      () => props.markers,
      (event) => {
        event.forEach((e) => {
          e.points.forEach((element) => {
            latLngList.push(element.latitude, element.latitude);
          });
        });
      }
    );

    //   map = L.map("map").setView(props.latLan[0], 17);
    //   props.latLan.forEach((e, i) => {
    //   console.log(e, i);
    //   marker = new L.marker([e[0], e[1]])
    //     .bindPopup(props.locationName ? props.locationName[i] : "asd")
    //     .addTo(map);
    // });
    // if (props.latLan.length > 1) {
    //   const myBounds = new L.LatLngBounds(props.latLan);
    //   map.fitBounds(myBounds);
    // }
    // }
    // );
    return { showDialog, done };
  },
};
</script>
<style scoped>
#map {
  position: absolute;
  top: 86px;
  bottom: 0;
  width: 100%;
}

.btn-controller {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: left;
  z-index: 10;
  padding: 10px;
}

.btn-controller-2 {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: right;
  z-index: 10;
  padding: 10px;
}
.btn-controller-3 {
  position: absolute;
  top: 89px;
  width: 100%;
  text-align: right;
  z-index: 10;
  padding: 10px;
}

.right-btns {
  width: fit-content;
  font-size: 12px;
}

@media (max-width: 995px) {
  #map {
    bottom: 86px;
  }
  .btn-controller {
    bottom: 86px;
  }

  .btn-controller-2 {
    bottom: 86px;
  }
}

p {
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

::v-deep(.p-chip-text) {
  font-size: 12px;
}

::v-deep(.p-chip) {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}
</style>
