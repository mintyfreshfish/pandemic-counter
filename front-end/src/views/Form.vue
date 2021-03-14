<template>
    <div id="form">
        <BlockGame />
    </div>
</template>

<script>
    import BlockGame from '../components/BlockGame.vue'

export default {
        name: 'form',
        components: {
            BlockGame
        }
    }
</script>

<style>
    body {
        background-color: #ddd;
    }
</style>