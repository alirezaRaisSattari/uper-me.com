<template>
 <Dialog :header="$t('showQr')" v-model:visible="showDialog" :style="{width: '100%' , 'max-width': '376px'}" :modal="true">
	 <div class="p-4 text-center">
     <qrCode :code="value"/>
	 </div>
	<template #footer>
		<Button class="p-button-text p-button-plain no-shadow" :label="$t('close_alt')" @click="close()" autofocus />
	</template>
</Dialog>
</template>

<script lang="ts">
import qrCode from "@/app/public/shared/QrCode/QrCode.vue";
import { onMounted , ref} from 'vue'
export default {
	components: {
    qrCode,
    },
	emits:['onClose'],
	props:{
		value:String,
		showDialog:Boolean
	},
	setup (props,{emit}) {
		const data = ref({
			size: 100,
			showDialog:props.showDialog ?? false
		})

		const close = () => {
			emit('onClose',false)
		}

		return {data,close}
	}
}
</script>

<style lang="scss" scoped>

</style>
