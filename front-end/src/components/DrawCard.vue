<template>
    <div class="profileBtn">
        <input id="inpt" type="text" placeholder="card" class="profileSelect" />
        <button id="btn" class="profileDraw">Draw!</button>
    </div>
</template>

<script>
export default {
    name: 'drawCard',
    props: ['stack'],
    data() {
        return {
            name: "",
        }
    },
    computed: {
            cards() {
                let stack = this.stack.filter(c => c.name.toLowerCase().startsWith(this.name.toLowerCase()));
                return stack.sort((a, b) => a.name > b.name);
            },
        },
    methods: {

    }
}
</script>

<style scoped language="scss">
    /* .profileBtn {
        position: absolute;
        width: 175px;
        height: 30px;
        left: 35px;
        top: 239px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #DEDDDC;
        border: 0px solid rgba(0, 0, 0, 0);
    } */

    /* .profileBtn:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
    } */

    .profileSelect {
        position: absolute;
        width: 68% !important;
        height: 100%;
        left: 0px;
    }

    .profileDraw {
        position: absolute;
        width: 32% !important;
        height: 100%;
        right: 0px;
    }

    #btn {
        width: 32%;
        right: 0;
    }

    #inp {
        width: 68%;
    }
</style>