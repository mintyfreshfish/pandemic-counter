<template>
    <div>
        <div>
            <b-button v-b-modal.modal-1>What We Know</b-button>

            <b-modal id="modal-1" title="BootstrapVue">
                <p class="my-4">{{currentStack}}</p>
                <p class="my-4">{{cardStack}}</p>
            </b-modal>
        </div>
        <h1>Pandemic Counter</h1>
        <b-button class="city bg-secondary shadow-none border-secondary" @click="update('tripoli')">
            <div class="wide">
                <h4>Tripoli</h4>
                <p>amount left: {{tripoliCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-secondary shadow-none border-secondary" @click="undo('tripoli')">
                    <p>Undo</p>
                </b-button>
            </div>
            <div class="narrow equation">
                <h2>{{100*(tripoliCount/currentStack.length)}}%</h2>
            </div>
        </b-button>
        <b-button class="city bg-secondary shadow-none border-secondary" @click="update('cairo')">
            <div class="wide">
                <h4>Cairo</h4>
                <p>amount left: {{cairoCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-secondary shadow-none border-secondary" @click="undo('cairo')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-secondary shadow-none border-secondary" @click="update('istanbul')">
            <div class="wide">
                <h4>Istanbul</h4>
                <p>amount left: {{istanbulCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="und bg-secondary shadow-none border-secondary" @click="undo('istanbul')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-warning shadow-none border-warning" @click="update('saoPaulo')">
            <div class="wide">
                <h4>Sao Paulo</h4>
                <p>amount left: {{saoPauloCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-warning shadow-none border-warning" @click="undo('saoPaulo')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-primary shadow-none border-primary" @click="update('newYork')">
            <div class="wide">
                <h4>New York</h4>
                <p>amount left: {{newYorkCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-primary shadow-none border-primary" @click="undo('newYork')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-primary shadow-none border-primary" @click="update('london')">
            <div class="wide">
                <h4>London</h4>
                <p>amount left: {{londonCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-primary shadow-none border-primary" @click="undo('london')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-warning shadow-none border-warning" @click="update('jacksonville')">
            <div class="wide">
                <h4>Jacksonville</h4>
                <p>amount left: {{jacksonvilleCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-warning shadow-none border-warning" @click="undo('jacksonville')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-warning border-warning shadow-none" @click="update('lagos')">
            <div class="wide">
                <h4>Lagos</h4>
                <p>amount left: {{lagosCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-warning shadow-none border-warning border-warning" @click="undo('lagos')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-primary shadow-none border-primary" @click="update('washington')">
            <div class="wide">
                <h4>Washington</h4>
                <p>amount left: {{washingtonCount}}</p>
            </div>
            <div class="narrow">
                <b-button class="undo bg-primary shadow-none border-primary" @click="undo('washington')">
                    <p>Undo</p>
                </b-button>
            </div>
        </b-button>
        <b-button class="city bg-success shadow-none border-success" @click="epidemic()">
            <h2>Epidemic!</h2>
        </b-button>
    </div>
</template>

<style>
    template {
        padding: 0%;
    }

    div {
        padding: 5px 0px;
    }

    .city p {
        margin: 0px;
    }

    .city h4 {
        margin: 0px;
    }


    .city {
        width: 100%;
        margin: 1px 0px;
        position: relative;
    }

    .blue {
        background-color: blue;
    }

    .yellow {
        background-color: yellow;
    }

    .gray {
        background-color: gray;
    }

    .warning {
        background-color: lightcoral;
    }

    .wide {
        width: 50%;
        float: left;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    .narrow {
        width: 20%;
        float: right;
        margin: 0px 5px;
    }

    .undo {
        height: 50px;
        margin: 0px;
    }

    .equation {
        margin-right: 10px;
        padding-top: 10px;
    }
</style>

<script>
    export default {
        name: 'CityCounter',
        data() {
            return {
                tripoliCount: 0,
                saoPauloCount:  0,
                jacksonvilleCount:  0,
                cairoCount:  0,
                lagosCount:  0,
                newYorkCount:  0,
                istanbulCount:  0,
                londonCount:  0,
                washingtonCount:  0,
                cardStack: [],
                currentStack: [],
            }
        },
        methods: {
            update(name) {
                if (this.cardStack.length > 0) { //this deletes the card from the cardStack
                    console.log("cardstack[0] is " + this.cardStack[0])
                    const index = this.cardStack[0].indexOf(name);
                    console.log(`index of ${name} is ${index}`)
                    if (index > -1) {
                        this.cardStack[0].splice(index, 1);
                        console.log(`cardstack[0] is now ${this.cardStack[0]}`)
                        if (this.cardStack[0].length == 0) {
                            this.cardStack.shift();
                        }
                    }
                }

                this.currentStack.push(name); //add the card to the currentStack

                switch (name) { //update numbers
                    case "tripoli":
                        this.tripoliCount  += 1;
                        break;
                    case "saoPaulo":
                        this.saoPauloCount  += 1;
                        break;
                    case "jacksonville":
                        this.jacksonvilleCount  += 1;
                        break;
                    case "cairo":
                        this.cairoCount  += 1;
                        break;
                    case "lagos":
                        this.lagosCount  += 1;
                        break;
                    case "newYork":
                        this.newYorkCount  += 1;
                        break;
                    case "istanbul":
                        this.istanbulCount  += 1;
                        break;
                    case "london":
                        this.londonCount  += 1;
                        break;
                    case "washington":
                        this.washingtonCount  += 1;
                        break;
                    default:
                        break;
                }
            },

            remove(name) { //removes a card of a given name from the currentStack
                for (let i = 0; i < this.currentStack.length(); i++) {
                    if (this.currentStack[i] == name) {
                        this.currentStack.splice(i, 1);
                        return;
                    }
                }
            },

            undo(name) { //unfinished. How to add to cardStack at the right time?
                switch (name) {
                    case "tripoli":
                        this.tripoliCount += 2;
                        this.remove("tripoli");
                        break;
                    case "saoPaulo":
                        this.saoPauloCount += 2;
                        this.remove("saoPaulo");
                        break;
                    case "jacksonville":
                        this.jacksonvilleCount += 2;
                        this.remove("jacksonville");
                        break;
                    case "cairo":
                        this.cairoCount += 2;
                        this.remove("cairo");
                        break;
                    case "lagos":
                        this.lagosCount += 2;
                        this.remove("lagos");
                        break;
                    case "newYork":
                        this.newYorkCount += 2;
                        this.remove("newYork");
                        break;
                    case "istanbul":
                        this.istanbulCount += 2;
                        this.remove("istanbul");
                        break;
                    case "london":
                        this.londonCount += 2;
                        this.remove("london");
                        break;
                    case "washington":
                        this.washingtonCount += 2;
                        this.remove("washington");
                        break;
                    default:
                        break;
                }
            },

            epidemic() {
                this.cardStack.unshift(this.currentStack);
                this.currentStack = [];
                this.tripoliCount = 0;
                this.saoPauloCount = 0;
                this.jacksonvilleCount = 0;
                this.cairoCount = 0;
                this.lagosCount = 0;
                this.newYorkCount = 0;
                this.istanbulCount = 0;
                this.londonCount = 0;
                this.washingtonCount = 0;
            }
        }
    }
</script>