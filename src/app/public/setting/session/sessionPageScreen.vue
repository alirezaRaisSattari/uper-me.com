<template>
    <div>
        <Header :title="$t('activeSession')" />
        <div class="main-controller has-fixed-footer">
            <div class="active-session-controller" v-if="state.activeSession">
                <div class="active-session">
                    <span :class="state.activeSession.deviceName.length > 50 ? 'two-Line':null">{{state.activeSession.deviceName}}</span>
                    <span>{{$filters.jalali(state.activeSession.createDate)}}</span>
                </div>
                <div class="active-session-footer">
                    <img :src="require('@/assets/img/svg/fotterSession.svg')" >
                    <span>{{$t('yourSession')}}</span>
                </div>
            </div>

            <div class="session-list-controller">
                <div class="session-item" v-for="item in state.sessionList" :key="item">
                    <div class="child">
                        <span :class="item.deviceName.length > 50 ? 'two-Line':null">{{item.deviceName}}</span>
                    </div>
                    <div class="child">
                        <span>{{$filters.jalali(item.createDate)}}</span>
                        <Button @click="state.deleteSession(item.sessionId)" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-plain" />
                    </div>
                </div>
                <loading v-if="state.loading"/>
                <Lottie v-if="state.sessionList.length == 0 && !state.loading" :path="'https://up-staticfiles.s3.ir-thr-at1.arvanstorage.com/notFound.json'" :title="$t('thereIsNoOtherMeeting')"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Header from '@/app/unit/shared/headerApp/headerAppScreen.vue';
import {ref , onMounted} from 'vue';
import {sessionPageState} from './sessionPageState';
import Lottie from "@/app/unit/shared/lottie/lottieWithTitleScreen.vue";

export default {
    components:{
        Header,
        Lottie
    },
    setup () {
        const state = ref(new sessionPageState());
        onMounted(() => {
            state.value.getSession();
        })

        return {state}
    }
}
</script>

<style lang="scss" scoped>
.main-controller {
    display: flex;
    flex-direction: column;
    padding: 10px;
    .active-session-controller {
        position: relative;
        display: flex;
        flex-direction: column;
        .active-session {
            background: #bddeff;
            border-radius: 10px;
            box-shadow: 0 0 5px #b5b5b5;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 10px;
            span {
                font-size: 15px;
                color: #212121;
                display: block ;
                overflow: hidden ;
                text-overflow: ellipsis ;
                font-size: 14px;
                color: #212121;
                &:last-child {
                    margin-top: 8px;
                    color: #686868;
                    font-size: 13px;
                }
            }
        }
        .active-session-footer {
            width: 100%;
            position: absolute;
            bottom: -30px;
            display: flex;
            justify-content: center;
            height: 30px;
            align-items: center;
            img {
                height: 30px;
                position: absolute;
                z-index: 2;
            }
            span {
                color: #fafafa;
                position: relative;
                z-index: 3;
                font-size: 14px;
            }
        }
    }
    .session-list-controller {
        display: flex;
        flex-direction: column;
        padding: 10px 5px;
        margin-top: 30px;
        .session-item {
            display: flex;
            flex-direction: column;
            margin-bottom: 8px;
            box-shadow: 0 0 5px #b5b5b5;
            border-radius: 8px;
            padding: 5px;

            .child {
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: center;
               

                span {
                    display: block ;
                    overflow: hidden ;
                    text-overflow: ellipsis ;
                    font-size: 14px;
                    color: #212121;
                   
                }
                &:last-child {
                    justify-content: space-between;
                    span {
                        color: #686868;
                        font-size: 13px;
                    }
                }
            }

        }
    }

 
}

.two-Line {
    height: 40px;
}
</style>