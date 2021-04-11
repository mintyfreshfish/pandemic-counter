<template>
    <div class="characterAdmin">
        <div class="charListWrap">
            <div class="charList">
                <div v-for="c in characters" :key="c.id">
                    <div class="cardWrap">
                        <div class="card">
                            <div class="cardImgWrap"><img class="cardImg" :src="c.image"></div>
                            <!-- <button @click="showDraw = true">draw</button> -->
                            <div :class="{showDraw : drawShow}" class="profileBtn">
                                <b-form-select class="profileSelect" v-model="drawnCard" :options="cardNames"></b-form-select>
                                <button :class="{showDraw : drawShow}" class="profileDraw" @click="draw(c)">Draw</button>
                            </div>
                            <div class="hand">
                                <div v-for="card in c.hand" :key="card.id">
                                    <div class="handCardWrap"><div class="handCard"><img class="handCardImage" :src="card.path"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // import axios from 'axios';

    export default {
        name: 'CharacterAdmin',
        props: ['cardNames', 'cardDeck'],
        data() {
            return {
                characters: this.$characters,
                player: null,
                drawnCard: null,
                showDraw: false,
            }
        },
        // created() {
        //     this.getCharacters();
        // },
        computed: {},
        methods: {
            // async getCharacters() {
            //     try {
            //         console.log("getting characters")
            //         let response = await axios.get("/api/characters");
            //         this.characters = response.data;
            //         console.log(this.characters);
            //     } catch (error) {
            //         console.log(error);
            //     }
            //     return true;
            // },

            draw(player) {
                console.log(player.hand)
                for (let i = 0; i < this.cardDeck.length; i++) {
                    if (this.cardDeck[i].name == this.drawnCard) {
                        player.hand.push(this.cardDeck[i]);
                        return;
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $imageWidth: 500px;
    $imageGrowWidth: 600px;

    .characterAdmin {
        position: fixed;
        left: 0px;        
        z-index: 0;

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

    .cardWrap:hover {
        z-index: 2;
    }
        
    .card {
        animation-name: growCard;
        animation-duration: 0.5s;
        width: $imageWidth;
        position: absolute;
        background-color: rgba(0, 0, 0, 0);
        height: 300px;
    }

    .card:hover {
        width: $imageGrowWidth;
        height: 520px;
    }

    .cardImg {
        width: 100%;
    }

    .cardImg:hover {
        z-index: 2;
    }

    .profileBtn {
        position: absolute;
        width: 175px;
        height: 30px;
        left: 35px;
        top: 194px;
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
    }

    .hand {
        width: $imageGrowWidth;
        display: flex;
        flex-flow: row nowrap;
    }

    @keyframes growCityCard {
        from {
            width: $imageGrowWidth/7;
            bottom: -110px;
        }

        to {
            width: 2*($imageGrowWidth/7);
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
        height: 300px;
    }

    .handCardWrap {
        width: $imageGrowWidth/7;
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
</style>