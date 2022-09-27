<template>
  <div class="d-flex justify-content-center p-5">
    <div id="qr-code" ref="qrCode"></div>
  </div>
  <!-- <p class="text-center">{{ introduce.introduceCode }}</p> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import QRCodeStyling, {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  Extension,
  Mode,
  TypeNumber,
} from "qr-code-styling";
import { getSelectedPageData } from "@/core/service/utils.service";

@Options({
  mounted: function () {
    this.qrCode.append(this.$refs["qrCode"]);
  },
  watch: {
    ["options.data"]: function () {
      this.qrCode.update(this.options);
    },
  },
  props: {},
  methods: {
    download() {
      this.qrCode.download({ extension: this.extension as Extension });
    },
  },
  data: () => {
    const introduce = getSelectedPageData();
    const options = {
      width: 150,
      height: 150,
      data: introduce.introduceCode,
      qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: "Byte" as Mode,
        errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
      },
      dotsOptions: {
        color: "#41b583",
        type: "dots" as DotType,
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      cornersSquareOptions: {
        color: "#35495E",
        type: "extra-rounded" as CornerSquareType,
      },
      cornersDotOptions: {
        color: "#35495E",
        type: "dot" as CornerDotType,
      },
    };
    return {
      options,
      introduce,
      extension: "svg",
      qrCode: new QRCodeStyling(options),
    };
  },
})
export default class QRCodeStylingComponent extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
