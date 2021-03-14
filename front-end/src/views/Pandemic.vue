<template class="m-0">
    <div class="m-0">
        <div class="container">
            <div class="block" v-for="city in stack" :key="city.id" :class="city.color">
                <div v-resize-text="{ratio:2, minFontSize: '10px', maxFontSize: '100px', delay: 200}">{{city.name}}</div>
                <h5>{{percentage}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    import cities from "../pandemicArray.js"
    import ResizeText from 'vue-resize-text'
    export default {
        name: 'Pandemic',
        directives: {
    ResizeText
 },
        props: {
            cities: Array,
        },
        data() {
            return {
                stack: cities,
                currentStack: [],
                stackHistory: [],
                infectionRate: 2,
            }
        },
        computed: {
            percentage() {
                return "5%";
            },
            // getDeck() {},
        },
        methods: {
            infect() {},
            epidemic() {},
            chainReaction() {},
            undo() {},
            undoEpidemic() {},
        }
    }
</script>

<style scoped>
    .container {
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .block {
        width: 32.5%;
        text-align: center;
        border-radius: 10px;
        height: 100px;
        margin: 2px 0px;
    }

    .blue {
        background-color: #0F4C82;

    }

    .gray {
        background-color: #838087;

    }

    .yellow {
        background-color: #F7A400;

    }

    .red {
        background-color: #BB1C21;

    }
</style>