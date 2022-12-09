<template>
<svg width="77px" height="79px" viewBox="0 0 77 79" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="cal--To-UE-的规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" @click="isShow=!isShow">
        <g id="cal--b-01" transform="translate(-1006.000000, -729.000000)">
            <g id="cal--编组-12" transform="translate(886.000000, 397.000000)">
                <g id="cal--cal" transform="translate(121.000000, 333.000000)">
                    <rect id="cal--矩形" stroke="#979797" fill="#D8D8D8" x="0" y="0" width="75" height="17"></rect>
                    <text id="cal--10月25日" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" fill="#858585">
                        <tspan x="2.294" y="13">10月25日</tspan>
                    </text>
                    <rect id="cal--矩形" stroke="#979797" fill="#D8D8D8" x="55" y="0" width="20" height="17"></rect>
                    <line x1="60.5" y1="6.5" x2="65.5" y2="13.5" id="cal--直线" stroke="#979797" stroke-linecap="square"></line>
                    <line x1="65.5" y1="13.5" x2="69.5" y2="6.5" id="cal--直线-2" stroke="#979797" stroke-linecap="square"></line>
                    
                    <g v-show="isShow">
                        <g id="cal--编组-4" :transform="`translate(0.000000, ${17+20*i})`" v-for="(date, i) in dates" :key="date">
                            <rect id="cal--矩形" stroke="#979797" fill="#D8D8D8" x="0" y="0" width="75" height="20"></rect>
                            <text id="cal--10月25日备份" font-family="PingFangSC-Regular, PingFang SC" font-size="12" font-weight="normal" fill="#858585">
                                <tspan x="2.294" y="16">{{date}}</tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name: '日历',
    props: {
        startDate: {
            type: 'Date',
            default: ''
        },
        endDate: {
            type: 'Date',
            default: ''
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        dates() {
            return ['10月25日','10月25日', '10月25日']
        }
    }
}
</script>

<style scoped>
svg {
    width: 250px;
    height: auto;
}
</style>