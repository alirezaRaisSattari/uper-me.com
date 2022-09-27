<template>
  <div class="flex-row h-75">
    <Button icon="pi pi-times" @click="close()" class="p-button-rounded close p-button-lg" @click.prevent="$refs.VueCanvasDrawing.reset()" />
      <div class="source">
        <vue-drawing-canvas
          ref="VueCanvasDrawing"
          v-model:image="image"
          :stroke-type="strokeType"
          :fill-shape="fillShape"
          :eraser="eraser"
          :lineWidth="line"
          :color="color"
          :background-color="backgroundColor"
          :background-image="backgroundImage"
          :watermark="watermark"
          saveAs="webp"
          :styles="{
            'border': 'solid 1px #000'
          }"
          :lock="disabled"
          @mousemove="getCoordinate($event)"
        />
        <div class="button-container">
          <div class="child">
            <Button icon="pi pi-times" class="p-button-rounded p-button-lg" @click.prevent="$refs.VueCanvasDrawing.reset()" />
            <Button icon="pi pi-check" class="p-button-rounded p-button-lg" @click="onSubmit()" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import VueDrawingCanvas from "vue-drawing-canvas";
export default {
  name: "App",
  components: {
    VueDrawingCanvas,
  },
  emits:['submit'],
  data() {
    return {
      x: 0,
      y: 0,
      image: '',
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: '#303030',
      strokeType: 'dash',
      backgroundColor: '#FFFFFF',
      backgroundImage: null,
      watermark: null,
      saveAs:'png'
    }
  },
  methods: {
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    async setWatermarkImage(event) {
      let URL = window.URL;
      this.watermark = {
        type: "Image",
        source: URL.createObjectURL(event.target.files[0]),
        x: 0,
        y: 0,
        imageStyle: {
          width: 600,
          height: 400,
          saveAs:'png'
        }
      }
      await this.$refs.VueCanvasDrawing.redraw();
    },
    getCoordinate(event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
      this.x = coordinates.x;
      this.y = coordinates.y;
    },onSubmit(){
      this.$emit('submit', this.image)
    },close() {
      this.$emit('submit', null)
    }
  }
};
</script>

<style lang="scss" scoped>
  .flex-row {
    display: flex;
    flex-direction: row;
  }

  #VueDrawingCanvas {
    border: none !important;
    width: 100%;
    height: 100%;
  }
  .button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .child {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }
  }
  .button-container > * {
    margin-top: 15px;
    margin-right: 10px;
  }

  Button {
    background: #fc9707 !important;
    border-radius: 50%;
    box-shadow: 0 0 5px #b5b5b5;
    font-size: 25px;
    width: 50px !important;
    height: 50px !important;
    border: none;
    box-shadow: none !important;
    &.close {
      background: #eeeeeeA4 !important;
      color:#686868;
      position: absolute;
      z-index: 10;
      left: 10px;
      top: 10px;
    }
  }
</style>