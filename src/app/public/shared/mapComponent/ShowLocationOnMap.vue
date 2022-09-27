<template>
  <div id="ShowLocationContainer"></div>
</template>

<script>
import {map, tileLayer} from "leaflet";
import {defineComponent, onBeforeUnmount, onMounted, ref, watch} from "vue";
import Dialog from "primevue/dialog";
import {i18n} from "@/main";
import {Swiper, SwiperSlide} from "swiper/vue";
import Chip from "primevue/chip";

export default defineComponent({
  name: "ShowLocationOnMap",
  components: {
    Dialog,
    Swiper,
    SwiperSlide,
    Chip,
  },
  props: {
    locationCallBack: Function,
    locations: Array,
    markersPoints: Array,
    deleteIcons: Boolean,
    searchedCats: Array,
  },
  setup(props, {emit}) {
    let container = null;
    const displayDialog = ref(true);
    const curr_lock = ref(null);
    let myIcon = L.icon({
      iconUrl: "img/icons/red-icon.png",
      iconSize: [40, 40],
    });

    let radius = ref(3500);

    let markersLayer = new L.LayerGroup();

    onMounted(() => {

      let center = ref({
        lat: 36,
        lng: 59,
      });
      container = map("ShowLocationContainer", {
        zoomControl: false,
        fadeAnimation: true,
        zoom: 13,
        minZoom: 8,
        maxZoom: 17,
        attributionControl: false,
        layers: [markersLayer],
      }).setView([36, 59], 14);
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
          container
      );
      container.on("move", function (e) {
        radius.value = getRadius(container.getZoom());
        center.value = container.getCenter();
      });
      container.on("zoomend", function (e) {
        radius.value = getRadius(container.getZoom());
      });
      watch(
          () => radius.value,
          (e) => {
            emit("getNewRadius", radius.value);
          }
      );

      watch(
          () => center.value,
          (e) => {
            emit("getNewCenter", center.value);
          }
      );

      emit("getNewCenter", center.value);
      emit("getNewRadius", radius.value);

      let locs = [];
      let markersArray = [];

      watch(
          () => props.markersPoints,
          (e) => {
            locs = e;
            const popup = L.popup();
            locs.forEach((loc) => {
              try {
                let newMarker = L.marker([
                  loc.points[0].latitude,
                  loc.points[0].longitude,
                ])
                    .addTo(container)
                    .on("click", (el) => {
                      curr_lock.value = loc;
                      // Todo: Category check shavad
                      if (loc.id == curr_lock.value.id) {
                        popup
                            .setLatLng(el.latlng)
                            .setContent(
                                `<div class="card" style="border: none !important;">
                                        <div class="card-body" style="height: 221px; !important;">
                                          <div class="d-flex flex-column align-items-center text-center">
                                            <img src="${
                                    curr_lock.value.profileImageUrl
                                }_sm" alt="Admin" class="rounded-circle" width="100px">
                                            <div class="mt-1">
                                              <h4>${curr_lock.value.name}</h4>
                                              <p class="text-secondary mb-1"> ${i18n.global.tc(
                                    "username"
                                )} ${curr_lock.value.username}</p>
                                              <p class="text-muted font-size-sm">${i18n.global.tc(
                                    "category"
                                )}</p>

                                              </div>
                                          </div>`
                            )
                            .openOn(container);
                      }
                    });

                markersArray.push(newMarker);
                markersArray.forEach((e) => {
                });
              } catch (e) {
              }
            });
          }
      );

      watch(
          () => props.deleteIcons,
          (e) => {
            if (props.deleteIcons === true && markersArray.length != 0) {
              markersArray.forEach((e) => {
                container.removeLayer(e);
              });
              markersArray = [];
            }
          }
      );
    });

    function assignMarkers(locs) {
      // locs = []
      markersLayer.clearLayers();
      locs.forEach((loc) => {
        markersLayer.addLayer(
            L.marker([loc.latitude, loc.longitude], {
              icon: myIcon,
            })
        );
      });
      //markersLayer.addTo(container);
    }

    function getRadius(zoom) {
      if (zoom <= 13) {
        return 3500;
      }
      // return Math.abs(3500 - (zoom - 13) *900 );
      else if (zoom == 15) {
        return 1000;
      } else if (zoom == 14) return 1600;
      else return Math.abs(3500 - 185 * zoom);
    }

    function showDialog() {
      displayDialog.value = true;
    }

    function closeResponsive() {
      displayDialog.value = false;
    }

    onBeforeUnmount(() => {
      container.remove();
    });

    return {assignMarkers, displayDialog, showDialog, closeResponsive};
  },
});
</script>

<style scoped>
#ShowLocationContainer {
  width: 100%;
  height: 100%;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  /* border: 1px solid rgba(0,0,0,.125); */
  border-radius: 0.25rem;
}
</style>