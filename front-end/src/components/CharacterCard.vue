<template>
    <div>
        <div class="card">
            <button class="supplyDiv cSupplyBtn" @click="toggle('supplyCubeCount')">
                <b-icon-circle-fill variant="secondary" class="h2 mb-2" id="supplyCubes"></b-icon-circle-fill>
                <p id="supplyCubeNum">{{character.supplyCubes}}</p>
            </button>
                <div v-if="showSupplyCubeCount==true" id="supplyCubeCount">
                    <b-form-spinbutton id="supplySpin"   @change="supplyCubes()" min=0 v-model="character.supplyCubes" inline></b-form-spinbutton>
                </div>
            <div class="cardImgWrap"><img class="cardImg" :src="character.image" @click="showList=false"></div>
            <div class="profileBtn">
                <input v-model="name" id="inpt" type="text" placeholder="card" class="profileSelect" />
                <button @click="draw()" id="btn" class="profileDraw">Draw!</button>
                <button v-show="showList==false" @click="showList=true" class="btnShowList hideOverflow"><span class="hideOverflow" v-if="drawnCard != null">{{drawnCard.name}}</span></button>
                <div v-show="showList" class="drawCardList">
                    <div v-for="c in cards" :key="c.id" @click="selectItem(c)">
                        <button class="nameBtn">
                            <span>{{c.name}}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="abilities">
                <p id="ability1">{{character.abilities[0]}}</p>
                <p id="ability2">{{character.abilities[1]}}</p>
                <p id="ability3">{{character.abilities[2]}}</p>
                <p id="ability4">{{character.abilities[3]}}</p>
                <p id="ability5">{{character.abilities[4]}}</p>
            </div>
            <div class="hand">
                <div v-for="h in character.hand" :key="h.id">
                    <div class="handCardWrap">
                        <div class="handCard" @dblclick="play(h)" @click="showPlay=true">
                            <img class="handCardImage" :src="h.image">
                            <div class="specialBox" v-show="h.special != ''">{{h.special}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        BIconCircleFill,
    } from 'bootstrap-vue'
    export default {
        name: 'CharacterCard',
        components: {
            BIconCircleFill
        },
        props: ['character', 'cardNames', 'cardDeck'],
        data() {
            return {
                drawnCard: null,
                name: "",
                path: "",
                showList: false,
                showSupplyCubeCount: false,
                cubeChange: 0,
            }
        },
        computed: {
            cards() {
                let cardNames = this.cardDeck.filter(n => n.name.toLowerCase().startsWith(this.name.toLowerCase()));
                cardNames.sort((a, b) => a > b);
                return cardNames
            },
        },
        methods: {
            toggle(n) {
                if (n == 'supplyCubeCount') {
                    if (this.showSupplyCubeCount == true) {
                        this.showSupplyCubeCount = false;
                    }
                    else {
                        this.showSupplyCubeCount = true;
                    }
                }
            },
            selectItem(c) {
                this.drawnCard = c;
                this.showList = false;
            },

            draw() {
                if (this.character.hand.length >= 7) {
                    alert("you must play a card before adding to your hand")
                    return;
                }
                for (let i = 0; i < this.cardDeck.length; i++) {
                    if (this.cardDeck[i].name == this.drawnCard.name) {
                        this.character.hand.push(this.cardDeck[i]);
                        // console.log(player.hand)
                        this.character.hand.sort((a, b) =>
                            ((a.color > b.color) ? 1 : (a.color === b.color) ? ((a.name > b.name) ? 1 : (a.name === b.name) ? ((a.type > b.type) ? 1 : -1) : -1) : -1))
                        return;
                    }
                }
            },
            play(h) {
                this.character.hand.splice(this.character.hand.indexOf(h), 1);
                this.character.hand.sort((a, b) =>
                    ((a.color > b.color) ? 1 : (a.color === b.color) ? ((a.name > b.name) ? 1 : (a.name === b.name) ? ((a.type > b.type) ? 1 : -1) : -1) : -1))
            },
            supplyCubes() {
                this.$emit("charSupply", this.cubeChange)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Quicksand:wght@300;400&display=swap');
    $imageWidth: 500px;
    $imageGrowWidth: 600px;

    div {
        border: none;
        outline: none;
        font-family: 'Quicksand', sans-serif;
    }

    #btn {
        outline: none;
        border: 1px solid black;
    }

    #btn:focus {
        outline: none;
    }

    .characterAdmin {
        position: fixed;
        left: 0px;
    }

    .charList {
        display: flex;
        justify-content: flex-end;
        flex-wrap: nowrap;
        z-index: 0;
    }

    .charListWrap {
        width: 100%;

    }

    .cardWrap {
        position: relative;
        width: 200px;
    }

    @keyframes growCard {
        from {
            width: $imageWidth;
            padding-top: 0px;
        }

        to {
            width: $imageGrowWidth;
            padding-top: 45px;
        }
    }

    .card {
        width: $imageWidth;
        position: absolute;
        background-color: rgba(0, 0, 0, 0);
        height: 45px;
        overflow: hidden;
    }

    .card:hover {
        animation-name: growCard;
        animation-duration: 0.5s;
        width: $imageGrowWidth;
        height: 1000px;
        padding-top: 45px;

    }

    .cardImg {
        width: 100%;
    }

    .profileBtn {
        position: absolute;
        width: 175px;
        height: 30px;
        left: 35px;
        top: 239px;
        background-color: rgba(0, 0, 0, 0.7);
        color: #DEDDDC;
        border: 0px solid rgba(0, 0, 0, 0);
    }

    .profileBtn:hover {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
    }

    .profileSelect {
        position: absolute;
        width: 68%;
        height: 100%;
        left: 0px;
    }

    .profileDraw {
        position: absolute;
        width: 32%;
        height: 100%;
        right: 0px;
        font-size: 14px;
    }

    .btnShowList {
        width: 68%;
        position: absolute;
        background-color: white;
        color: black;
        border: 1px solid black;
        height: 100%;
        text-align: left;
    }

    .hand {
        width: $imageGrowWidth;
        display: flex;
        flex-flow: row nowrap;
    }

    .hand:hover {
        z-index: 3;
    }

    @keyframes growCityCard {
        from {
            width: $imageGrowWidth/7 - 4;
            bottom: -110px;
        }

        to {
            width: 2*($imageGrowWidth/7 - 4);
            top: 210px;
        }
    }

    .handCard {
        position: absolute;
        width: 100px;
        height: 200px;
    }

    .handCard:hover {
        animation-name: growCityCard;
        animation-duration: 0.2s;
        width: 2*($imageGrowWidth/7);
        top: 210px;
        margin: auto;
        height: 500px;
    }

    .handCardWrap {
        width: $imageGrowWidth/7 - 50;
    }

    .handCardImage {
        width: 100%;

    }

    .handCardImage:focus {
        border: 2px solid yellow;
    }

    .drawShow {
        color: yellow;
        background-color: red;
    }

    .nameBtn {
        width: 100%;
        overflow: hidden;
        background-color: white;
        border: none;
        border-top: 1px solid gray;
    }

    .drawCardList {
        // overflow: scroll;
        max-height: 500px;
        position: absolute;
        top: 30px;
        width: 100%;
    }

    .hideOverflow {
        overflow: hidden;
    }

    .specialBox {
        position: absolute;
        color: white;
        background-color: black;
        opacity: 90%;
        top: 10%;
        left: 10%;
        width: 80%;
        text-align: left;
        font-size: 14px;
        max-height: 27%;
        overflow-y: scroll;
        padding: 3px;
        scrollbar-width: none;
    }

    .specialBox::-webkit-scrollbar {
        display: none;
    }

    .supplyDiv {
        position: absolute;
        z-index: 2 !important;
    }

    #supplyCubeNum {
        position: absolute;
        top: 2px;
        left: 17px;
        font-size: 20px;
        color: white;
    }

    .cSupplyBtn {
        background-color: transparent;
        outline: none;
        border: none;
        text-align: center;
    }

    #supplyCubeCount {
        width: 100px;
        position: absolute;
        top: 50px;
        left: 40px;
    }

    #supplySpin {
        top: 20px;
        position: absolute;
    }

    .abilities {
        position: absolute;
        right: 5%;
        top: 64px;
        width: 53%;
        height: 328px;
        font-size: 13px;
    }

    #ability1 {
        position: absolute;
        top: 5px;
        height: 53px;
        width: 100%;
    }

    #ability2 {
        position: absolute;
        top: 70px;
        height: 53px;
        width: 100%;
    }

    #ability3 {
        position: absolute;
        top: 140px;
        height: 53px;
        width: 100%;
    }

    #ability4 {
        position: absolute;
        top: 205px;
        height: 53px;
        width: 100%;
    }

    #ability5 {
        position: absolute;
        top: 273px;
        height: 53px;
        width: 100%;
    }
</style>