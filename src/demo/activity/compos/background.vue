<template>
<svg width="100%" height="auto" viewBox="0 0 320 345" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="编组--To-UE-的规范" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="编组--b-01" transform="translate(-886.000000, -397.000000)">
            <g id="编组--编组-12" transform="translate(886.000000, 397.000000)">
                <g id="编组--编组">
                    <rect id="编组--矩形" fill="#FFFFFF" x="0" y="0" width="320" height="345"></rect>
                    <text id="编组--告白宣言-选你所爱" fill="#FF3F62" font-family="PingFangSC-Semibold, PingFang SC" font-size="32" font-weight="500">
                        <tspan x="30.172" y="85">{{title}}</tspan>
                    </text>
                    <g id="编组--人物" transform="translate(68.000000, 103.000000)" stroke="#979797">
                        <ellipse id="编组--椭圆形" fill="#D8D8D8" cx="39.5" cy="20" rx="20.5" ry="20"></ellipse>
                        <ellipse id="编组--椭圆形" fill="#D8D8D8" cx="140" cy="35" rx="17" ry="21"></ellipse>
                        <line x1="38.5" y1="40.5" x2="39.5" y2="108.5" id="编组--直线-4" stroke-linecap="square"></line>
                        <line x1="35.5" y1="51.5" x2="0.5" y2="98.5" id="编组--直线-5" stroke-linecap="square"></line>
                        <line x1="41.5" y1="53.5" x2="87.5" y2="110.5" id="编组--直线-6" stroke-linecap="square"></line>
                        <line x1="135.5" y1="59.5" x2="138.5" y2="133.5" id="编组--直线-7" stroke-linecap="square"></line>
                        <line x1="127.5" y1="63.5" x2="91.5" y2="116.5" id="编组--直线-8" stroke-linecap="square"></line>
                        <line x1="143.5" y1="68.5" x2="156.5" y2="100.5" id="编组--直线-9" stroke-linecap="square"></line>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
</template>

<script>
export default {
    name: 'Background',
    props: {
        title: {
            type: String,
            default: '告白宣言 选你所爱'
        }
    }
}
</script>