 <template>
	<div>
		<div>
        <Dialog :showHeader="false" modal v-model:visible="showDialog" :contentStyle="{'border-radius':'10px'}" :dismissableMask="true" :breakpoints="{ '440px': '100vw' }"  :style="{width: '100%', 'max-width':'500px','border-radius':'10px'}" >
            <div class="center stream">
                <qr-stream @decode="onDecode" class="mb" @init="onCameraChange">
                    <div style="color: red;" class="frame"></div>
                </qr-stream>
            </div>
            <div class="result">
            <!-- Result: {{data}} -->
            </div>
        </Dialog>
		</div>
	</div>
</template>

<script lang="ts">
import { ToastService } from '@/core/service/toast.service';
import { i18n } from '@/main';
import { defineComponent, reactive, toRefs,onMounted ,ref, watch} from 'vue';
import { QrStream } from 'vue3-qr-reader';
export default defineComponent({
  components: {
    QrStream
  },
  emits:['onDecode'],
  props:{
      show:Boolean
  },
  setup(props,{emit}) {
    const showDialog = ref(props.show);
 
    const state = reactive({
      data: null
    })
    function onDecode(data) {
      state.data = data;
      emit('onDecode' , data);
    }

    const onCameraChange = (promise) => {
      promise.catch(error => {
        if (error.name === 'NotAllowedError') {
          ToastService.getInstance().warning(i18n.global.tc('deniedCameraAccessPermission'))
        } else if (error.name === 'NotFoundError') {
          ToastService.getInstance().warning(i18n.global.tc('noSuitableCameraDeviceInstalled'));
        } else if (error.name === 'NotSupportedError') {
          ToastService.getInstance().warning(i18n.global.tc('pageIsNotServedOverHTTPSOrLocalhost'))
        } else if (error.name === 'NotReadableError') {
          ToastService.getInstance().warning(i18n.global.tc('cameraIsAlreadyInUse'))
        } else if (error.name === 'OverconstrainedError') {
          ToastService.getInstance().warning(i18n.global.tc('didYouRequestedTheFrontCameraAlthoughThereIsNone'))
        } else if (error.name === 'StreamApiNotSupportedError') {
          ToastService.getInstance().warning(i18n.global.tc('browserSeemsToBeLackingFeatures'))
        }
        showDialog.value = false;
    })
  }

   watch(
        () => showDialog.value,
        (e) => {
          if (!e) return emit('onDecode' , null);
        }
    );

    return {
      ...toRefs(state),
      onCameraChange,
      onDecode,
      showDialog
    }
  }
});
</script>

<style scoped>
.stream {
  max-height: 500px;
  max-width: 500px;
  margin: auto;
}
.frame {
  border-style: solid;
  border-width: 2px;
  border-color: red;
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  margin: auto;
}
</style>
