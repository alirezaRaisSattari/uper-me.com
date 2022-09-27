<template>
  <div id="mapContainer"></div>
</template>

<script>
import {map, tileLayer} from "leaflet";
import {defineComponent, onBeforeUnmount, onMounted} from "vue";

export default defineComponent(
    {
      name: "SelectLocationOnMap",
      props: {
        callback: Function,
      },
      setup(props) {
        let container = null;
        let TappedLocation = new L.Icon({
          iconUrl: 'https://cdn2.iconfinder.com/data/icons/vivid/48/map-marker-64.png',
          iconSize: [42, 42],
        });
        let currentMarker

        onMounted(() => {
              container = map("mapContainer", {
                zoomControl: false,
                fadeAnimation: true,
                zoom: 14,
                minZoom: 8,
                maxZoom: 16,
                attributionControl: false,
              }).setView([36.299793, 59.517450], 12);
              tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(container);
              currentMarker = L.marker([36.299793, 59.517450], {
                    icon: TappedLocation,
                  },
              ).addTo(container).on('click', (e) => {
                props.callback(e.latlng)
              });
              container.on('move', function (e) {
                currentMarker.setLatLng(container.getCenter())
              })

            },
        );

        onBeforeUnmount(() => {
              container.remove();
            },
        );
      }
    },
);

</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
