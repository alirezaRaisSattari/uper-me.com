<template>
  <div id="ShowLocationContainer"></div>
</template>

<script>
import {map, tileLayer} from "leaflet";
import {defineComponent, onBeforeUnmount, onMounted, ref} from "vue";


export default defineComponent(
    {
      name: "ShowLocationDialog",
      setup: function () {
        let container = null;
        let radius = ref(3500)
        let showAccountsDialog = ref(false)
        onMounted(() => {
              container = map("ShowLocationContainer", {
                zoomControl: false,
                fadeAnimation: true,
                zoom: 13,
                minZoom: 8,
                maxZoom: 17,
                attributionControl: false,
              }).setView([36.299793, 59.517450], 16);
              tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(container);
              container.on('zoomend', function (e) {
                radius.value = getRadius(container.getZoom())
              });

            },
        );

        function getRadius(zoom) {
          if (zoom <= 13) {
            return 3500
          } else {
            return 3500 - ((zoom - 13) * 800)
          }
        }

        onBeforeUnmount(() => {
              container.remove();
            },
        );

        return {
          showAccountsDialog
        }
      }
    },
);

</script>

<style scoped>
#ShowLocationContainer {
  width: 100%;
  height: 100%;
}
</style>
