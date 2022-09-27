<template>
    <div class="empty-box-controller">
        <span>{{title}}</span>
        <i class="uempty-product"></i>
    </div>
</template>

<script lang="ts">
export default {
    props:{
        title:String
    },
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>
.empty-box-controller {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 50px 0;
    span {
        font-size: 14px;
        width: 100%;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 10px;
        color: #212121;
        text-align: center;
    }

    i {
        &::before {
            font-size: 80px;

        }
    }
}
</style>