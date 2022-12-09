<template>
    <div class="tabs">
        <div class="tab">{{Tab1Title}}</div>
        <div class="tab">{{Tab2Title}}</div>
        <div class="tab">{{Tab3Title}}</div>
    </div>
</template>

<script>


export default {
    name: 'Tabs',
    props: {
        Tab1Title: {
            type: String,
            default: '心动日榜'
        },
        Tab2Title: {
            type: String,
            default: '半小时礼物榜'
        },
        Tab3Title: {
            type: String,
            default: '心愿榜'
        }
    }
}
</script>

<style scoped>
.tabs {
    width: 100%;
    padding: 20px 20px;
    display: flex;
    box-sizing: border-box;
}
.tab {
    font-size: 37px;
    text-align: center;
    border: solid;
    flex-grow: 1;
}
</style>