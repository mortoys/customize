<template>
    <div class="board">
        <Tabs/>
        <div class="board-box">
            <Cal/>
            <Star/>
        </div>
    </div>
</template>

<script>
import Tabs from './Tabs'
import Cal from './cal'


export default {
    name: 'Board',
    components: {
        Tabs, Cal
    }
}
</script>

<style scoped>
.board {
    width: 100%;
    /* border: solid; */
    height: 1400px;
    margin-top: -156px;
    z-index: 222;
    position: absolute;
    box-sizing: border-box;
    left: 0;
}
.board-box {
    display: flex;
    justify-content: center;
}
</style>