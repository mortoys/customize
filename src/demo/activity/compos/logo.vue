<template>
<svg width="79px" height="17px" viewBox="0 0 79 17" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="logo--To-UE-的规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="logo--b-01" transform="translate(-896.000000, -405.000000)">
            <g id="logo--编组-12" transform="translate(886.000000, 397.000000)">
                <g id="logo--logo" transform="translate(10.000000, 8.000000)">
                    <rect id="logo--矩形" :fill="color" x="0" y="0" width="17" height="17"></rect>
                    <ellipse id="logo--椭圆形" :fill="color1" cx="8.5" cy="9" rx="7.5" ry="7"></ellipse>
                    <polygon id="logo--三角形" :fill="color" transform="translate(10.500000, 9.500000) rotate(91.000000) translate(-10.500000, -9.500000) " points="10.5 5 16 14 5 14"></polygon>
                    <text id="logo--全民小视频" font-family="PingFangSC-Semibold, PingFang SC" font-size="12" font-weight="500" fill="#404040">
                        <tspan x="19" y="13">全民小视频</tspan>
                    </text>
                </g>
            </g>
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name: 'logo',
    props: {
        color: {
            type: 'Color',
            default: '#F82755'
        },
        color1: {
            type:'Color',
            default: '#FFFFFF'
        }
    }
}
</script>

<style scoped>
svg {
    width: 229px;
    height: auto;
    top: 36px;
    position: absolute;
    left: 46px;
}
</style>