<!--<template>-->
<!--  &lt;!&ndash; <GoogleMap-->
<!--  api-key="AIzaSyAS9lUEEr_kzvJ0D7qSV3wHjyBlw99pzKU"-->
<!--  style="width: 100%; height: 500px"-->
<!--  :center="center"-->
<!--  :zoom="15"-->
<!--  >-->
<!--    <Marker :options="{ position: center }" />-->
<!--  </GoogleMap> &ndash;&gt;-->
<!--  <input-->
<!--    accept="image/*"-->
<!--    class="w-100 h-100 hidden hover-pointer"-->
<!--    multiple-->
<!--    type="file"-->
<!--    @change="onFileChange($event)"-->
<!--  />-->
<!--</template>-->

<!--<script>-->
<!--// import { defineComponent } from 'vue'-->
<!--// import { GoogleMap, Marker } from 'vue3-google-map'-->

<!--export default {-->
<!--  // components: { GoogleMap, Marker },-->
<!--  setup() {-->
<!--    // const center = { lat: 40.689247, lng: -74.044502 }-->

<!--    // return { center }-->

<!--    function onFileChange(e) {-->
<!--      if (e.target.files.length === 0) return;-->

<!--      // if (e.target.files.length + otherPhotoList.value.length <= 3) {-->
<!--      //   for (let i = 0; i < e.target.files.length; i++) {-->
<!--      //     convertFileTOBase64(e.target.files[i], (base64) => {-->
<!--      //       otherPhotoList.value.push(base64);-->
<!--      //     });-->
<!--      //   }-->
<!--      // } else {-->
<!--      //   ToastService.getInstance().error(i18n.global.tc("Max3"));-->
<!--      // }-->
<!--      const canvas = document.createElement("canvas");-->
<!--      canvas.width = e.target.files[0].naturalWidth;-->
<!--      canvas.height = e.target.files[0].naturalHeight;-->
<!--      canvas.getContext("2d").drawImage(e.target.files[0], 0, 0);-->
<!--      canvas.toBlob((blob) => {-->
<!--        // Now we have a `blob` containing webp data-->

<!--        // Use the file rename trick to turn it back into a file-->
<!--        const myImage = new File([blob], "my-new-name.webp", {-->
<!--          type: blob.type,-->
<!--        });-->
<!--      }, "image/webp");-->
<!--      -->
<!--    }-->
<!--    return {-->
<!--      onFileChange,-->
<!--    };-->
<!--  },-->
<!--}-->
<!--</script>-->
