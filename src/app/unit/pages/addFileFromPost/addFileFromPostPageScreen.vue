<template>
    <div>
        <Header :title="$t('selectFile')"/>
        <div class="main-controller">
            <div class="box-controller">
                <div class="child">
                    <span>{{$t('selectFile')}}</span>
                </div>
                <div class="child">
                    <span>{{$t('noFileSelected')}}</span>
                </div>
                <div class="child">
                    <input  id="fileInput" accept="image/*,video/*" class="w-100 h-100 hover-pointer p-hidden" multiple type="file" />
                    <Button :label="$t('selectFile')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue'
export default {
    components:{
        Header
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.main-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .box-controller {
        box-shadow: 0 0 5px #b5b5b5;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 10px;
        .child {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 14px;
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 5px;
            }
            &:first-child {
                font-size: 16px;
                font-weight: bold;
                align-items: flex-start;

            }
            Button {
                background: #c5e4e9 !important;
                border-radius: 5px;
                color: #212121;
                padding: 8px 30px;
                font-size: 14px;
                border: none;
                outline: none;
            }
        }
    }
}
</style>