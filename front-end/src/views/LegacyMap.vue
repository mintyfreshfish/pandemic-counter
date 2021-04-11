<template>
    <div id="gameboard">
        <div id="adminBar" class="z1">

            <b-row>
                <b-col class="z1" cols="1" v-for="c in characters" :key=c.id>
                    <div class="relative">
                        <CharacterCard :character="c" :cardNames="drawChoice" :cardDeck="cards"></CharacterCard>
                    </div>
                </b-col>
            </b-row>


            <!--//ANCHOR worldMap-->
            <div id="worldmap" class="" @dblclick="activeCity = null">
                <img id="worldmapImg" :src="background">
                <div class="z2">
                    <InfoBar :thisMonth="month" :remainingPlagueCubes="spentPlague" :spentSupplyCubes="spentSupply" @showAction="toggleActionCities()" />
                </div>

                <div v-if="activeCity != null" class="activeCityInfo">
                    <h2>
                        {{activeCity.name}}:
                    </h2>
                    <ul>
                        <li><label for="supplyCubeCount">Supply</label>
                            <b-form-spinbutton id="supplyCubeCount" @change="spentSupply()" min=0 v-model="activeCity.supplyCubes" inline></b-form-spinbutton>
                        </li>
                        <li><label for="plagueCubeCount">Plague</label>
                            <b-form-spinbutton id="plagueCubeCount" min=0 v-model="activeCity.plagueCubes" inline></b-form-spinbutton>
                        </li>
                        <li>Population - {{activeCity.population}}</li>
                        <li> Supply Center <input type="checkbox" id="checkbox" v-model="activeCity.supplyCenter">
                        </li>
                    </ul>
                </div>
                <DrawDecks :prePlayerDeck="cards" :preInfectionDeck="deck" :characters="characters" class="DrawDecksComp" />
                <div v-for="city in deck" :key="city.id" class="z0">
                    <button v-if="city.xcor < 900 || actions==false" class="city btn cityName z0" :class="city.color + ' ' + status(city)" @click="changeActiveCity(city)" @dblclick="adjust(c)" :style="{ left: city.xcor + 'px', top: city.ycor + 'px' }" v-b-tooltip.hover="city.name + ' ' + city.special">
                        {{city.tag}}
                        <b-icon-flag-fill v-if="city.supplyCenter == true" variant="" class="h5 mb-2 sIcon"></b-icon-flag-fill>
                        <div>
                            <b-icon-circle-fill variant="secondary" class="" id="supplyCubes"></b-icon-circle-fill>
                            <p id="supplyCubeNum">{{city.supplyCubes}}</p>
                        </div>
                        <div v-if="city.plagueCubes > 0">
                            <b-icon-circle-fill variant="success" class="" id="plagueCubes"></b-icon-circle-fill>
                            <p id="plagueCubeNum">{{city.plagueCubes}}</p>
                        </div>
                        <div>
                            <b-icon-circle-fill variant="primary" class="" id="population"></b-icon-circle-fill>
                            <p id="populationNum">{{city.population}}</p>
                        </div>
                        <div class="icon">
                            <b-icon-exclamation-circle-fill v-if="city.special != ''" variant="light" class="rounded-circle bg-info h5 mb-2"></b-icon-exclamation-circle-fill>
                        </div>
                    </button>
                </div>

                <div class="centered">
                    <div v-for="pawn in pawns" :key="pawn.pawnName">
                        <DraggableDiv :pawnName="pawn.pawnName"></DraggableDiv>
                    </div>
                </div>

                <div v-if="vShowCounter" :class="showCounter">
                    <!-- class="counterContract bg-info shadow-none border-info rounded-0" -->
                    <b-button @click="showCounter='hidden', showButton='visible'" class="counterContract bg-info shadow-none border-info rounded-0">
                        <b-icon-chevron-double-right></b-icon-chevron-double-right>
                    </b-button>
                    <div class="cardCounter">
                        <CardCounter :ogStack="deck" />
                    </div>
                </div>
                <!-- class="counterExpand bg-info shadow-none border-info rounded-0" -->
                <b-button @click="showCounter='visible', showButton='hidden', vShowCounter=true" :class="showButton" class="counterExpand bg-info shadow-none border-info rounded-0">
                    <b-icon-chevron-double-left></b-icon-chevron-double-left>
                </b-button>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import DraggableDiv from '../components/DraggableDiv.vue'
    import CharacterCard from '../components/CharacterCard.vue'
    import InfoBar from '../components/InfoBar.vue'
    import CardCounter from '../components/CardCounter.vue'
    // import DrawDecks from '../components/DrawDecks.vue'
    import {
        BIconExclamationCircleFill,
        BIconFlagFill,
        BIconCircleFill,
        BIconChevronDoubleRight,
        BIconChevronDoubleLeft
    } from 'bootstrap-vue'
    export default {
        name: 'LegacyMap',
        components: {
            DraggableDiv,
            CharacterCard,
            InfoBar,
            BIconExclamationCircleFill,
            BIconFlagFill,
            BIconCircleFill,
            BIconChevronDoubleRight,
            BIconChevronDoubleLeft,
            CardCounter,
            // DrawDecks,
        },
        data() {
            return {
                deck: [],
                cards: [],
                activeCity: null,
                characters: [],
                drawChoice: [{
                    text: 'Draw!',
                    value: null
                }],
                pawns: [{
                        pawnName: "Bimbletoken.png"
                    },
                    {
                        pawnName: "PollyToken.png"
                    },
                    {
                        pawnName: "LyleToken.png"
                    },
                    {
                        pawnName: "shortStackToken.png"
                    }
                ],
                actions: false,
                showCounter: "hidden",
                showButton: "visible",
                buttonClass: "counterContract bg-info shadow-none border-info rounded-0",
                month: "",
                background: "",
                decksMade: false,
                vShowCounter: false,
            }
        },
        created() {
            this.getStack();
            this.getCharacters();
            this.getCards();
            this.getMisc();
        },
        computed: {
            spentPlague() {
                let plague = 0;
                for (let i = 0; i < this.deck.length; i++) {
                    if (this.deck[i] != undefined) {
                        plague += this.deck[i].plagueCubes
                    } else {
                        console.log("undefined");
                    }
                }
                return plague;
            },
            spentSupply() {
                let supply = 0;
                for (let i = 0; i < this.deck.length; i++) {
                    if (this.deck[i] != undefined) {
                        supply += this.deck[i].supplyCubes
                    } else {
                        console.log("undefined");
                    }
                }
                for (let i = 0; i < this.characters.length; i++) {
                    if (this.characters[i] != undefined) {
                        supply += this.characters[i].supplyCubes
                    } else {
                        console.log("undefined");
                    }
                }
                return supply;
            },
        },
        methods: {
            status(c) {
                if (c.plagueCubes > 0) {
                    return 'plague'
                } else if (c.supplyCubes == 0) {
                    return 'danger'
                }
            },

            //show/hide actions
            toggleActionCities() {
                if (this.actions == true) {
                    this.actions = false;
                } else {
                    this.actions = true;
                }
            },

            //ANCHOR Event Handlers

            changeActiveCity(city) {
                this.activeCity = city;
            },

            //ANCHOR Gets
            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    for (let i = 0; i < response.data.length; i++) {
                        const c = response.data[i]
                        const city = {
                            name: c.name,
                            count: c.count,
                            color: c.color,
                            tag: c.tag,
                            population: c.population,
                            supplyCubes: 0,
                            plagueCubes: 0,
                            supplyCenter: c.supplyCenter,
                            xcor: c.xcor,
                            ycor: c.ycor,
                            special: c.special,
                        }
                        this.deck.push(city)
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            async getCharacters() {
                try {
                    let response = await axios.get("/api/characters");
                    for (let i = 0; i < response.data.length; i++) {
                        const c = response.data[i]
                        const char = {
                            name: c.name,
                            origin: c.origin,
                            image: c.image,
                            abilities: c.abilities,
                            order: 0,
                            player: "",
                            location: c.origin,
                            hand: [],
                            supplyCubes: 0,
                        }
                        this.characters.push(char)
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            async getCards() {
                try {
                    let response = await axios.get("/api/cards");
                    for (let i = 0; i < response.data.length; i++) {
                        const c = response.data[i]
                        const card = {
                            type: c.type,
                            name: c.name,
                            count: c.count,
                            image: c.path,
                            special: c.special,
                            color: c.color
                        }
                        if (c.special != "") {
                            card.name = card.name + '*'
                        }
                        this.cards.push(card)
                    }
                    this.drawChoice = [...new Set(response.data.map(x => x.name))];
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            async getMisc() {
                try {
                    let response = await axios.get("/api/misc");
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].title == "month") {
                            this.month = response.data[i].body
                        } else if (response.data[i].title == "background") {
                            this.background = response.data[i].body
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

        }
    }
</script>

<style scoped language="scss">
    .visible {
        visibility: visible;
    }

    .hidden {
        visibility: hidden;
    }

    .danger {
        border: 2px solid yellow;
    }

    .plague {
        border: 2px solid red;
    }

    .counterExpand {
        position: fixed;
        right: 0px;
        top: 239px;
        height: 50px;
        width: 30px;
    }

    .counterContract {
        position: fixed;
        right: 400px;
        top: 239px;
        height: 50px;
    }

    .cardCounter {
        width: 400px;
        position: fixed;
        right: 0px;
        height: 500px;
        overflow-y: scroll;
                scrollbar-width: none;
    }

    .city {
        height: 40px;
        width: 40px;
        border-radius: 10px;
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .adminBar {
        width: 100%;
    }

    .activeCityInfo {
        position: absolute;
        top: 10px;
        left: 10px;
    }

    .icon {
        position: absolute;
        left: -15px;
        top: -15px;
        width: 5px;
    }

    .sIcon {
        position: absolute;
        left: 20px;
        top: 20px;
        color: #1db30c
    }

    .cityName {
        font-size: 15px;
    }


    .blue {
        background-color: #0C3B65;
        color: white;
    }

    .black {
        background-color: rgb(131, 128, 135);
        color: white;
    }

    .yellow {
        background-color: #DA9200;
        color: white;
    }

    .none {
        background-color: white;
        border: 1px solid black;
        color: black !important;
        border-radius: 50% !important;
    }

    #supplyCubes {
        position: absolute;
        top: -10px;
        left: 40px;
    }

    #supplyCubeNum {
        position: absolute;
        top: -12px;
        left: 45px;
    }

    #plagueCubes {
        position: absolute;
        top: 10px;
        left: 40px;
    }

    #plagueCubeNum {
        position: absolute;
        top: 8px;
        left: 45px;
    }

    #population {
        position: absolute;
        top: 30px;
        left: 40px;
    }

    #populationNum {
        position: absolute;
        top: 28px;
        left: 45px;
    }

    #worldmap {
        /* background-image: url(); */
        height: 1200px;
        width: 2300px;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: 45px;
        left: 0px;
    }

    #worldmapImg {
        height: 1200px;
        width: 2400px;
        background-size: cover;
        background-repeat: no-repeat;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
    }

    .z2 {
        z-index: 12 !important;
    }

    .z1 {
        z-index: 1 !important;
    }

    .z0 {
        z-index: 0 !important;
    }

    .centered {
        position: absolute;
        left: 1005px;
        top: 118px;
        background-color: rgba(255, 50, 255, 0.5);
        border: 2px solid gold;
        height: 34px;
        width: 34px;
    }

    .btn {
        color: white;
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 3px;
    }

    .drawDecksComp {
        position: fixed;
        width: 200px;
        bottom: 0px;
        right: 0px;
        height: 100px;
    }
</style>