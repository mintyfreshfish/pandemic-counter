<template>
    <div>
        <div class="playerDraw">
            <button @click="draw()">Draw!</button>
            <div class="playerShow">
                <p>{{playerCards}}</p>
            </div>
        </div>

        <div class="infectDraw">
            <button @click="infect()">Infect!</button>
            <div class="infectShow">
                <p>{{infectCards}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DrawCard',
        props: ['prePlayerDeck', 'preInfectionDeck', 'characters'],
        data() {
            return {
                pDeck: [],
                infectionDeck: [],
                infectionRate: 2,
                infectCards: "",
                playerCards: "",
                firstInfection: true,
                discardPile: [],
            }
        },
        created() {
            // this.createPlayerDeck()
            // this.createInfectionDeck()
        },
        computed: {
            thisPlayerDeck() {
                let newDeck = []
                //add card names to player deck, giving a new index for each count (count of 3 gets 3 copies) and only allowing certain event cards
                for (let i = 0; i < this.prePlayerDeck.length; i++) {
                    for (let j = 0; j < this.prePlayerDeck[i].count; j++) {
                        const thisCard = Object.assign({}, this.prePlayerDeck[i])
                        if (thisCard.type != "event" && thisCard.type != "epidemic") {
                            newDeck.push(thisCard.name)
                        } else if (thisCard.name == "airlift" || thisCard.name == "Resilient Population" || this.prePlayerDeck[i].name == "One Quiet Night" || this.prePlayerDeck[i].name == "Drastic Measures") {
                            newDeck.push(thisCard.name)
                        } else if (thisCard.name.includes("Produce Supplies")) {
                            newDeck.push(thisCard.name)
                        }
                    }
                }
                //shuffle and draw    
                var currentIndex = newDeck.length,
                    temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = newDeck[currentIndex];
                    console.log("entered while loop");
                    newDeck[currentIndex] = newDeck[randomIndex];
                    newDeck[randomIndex] = temporaryValue;
                }
                const firstDrawDeck = newDeck.slice(0, 8);
                const secondDrawDeck = newDeck.slice(8, newDeck.length)
                // insert epidemics and shuffle
                const deckLength = secondDrawDeck.length / 5;
                let epiDeck = []
                epiDeck.push(secondDrawDeck.slice(0, deckLength));
                epiDeck.push(secondDrawDeck.slice(deckLength, 2 * deckLength));
                epiDeck.push(secondDrawDeck.slice(2 * deckLength, 3 * deckLength));
                epiDeck.push(secondDrawDeck.slice(3 * deckLength, 4 * deckLength));
                epiDeck.push(secondDrawDeck.slice(4 * deckLength, secondDrawDeck.length));
                for (let i = 0; i < epiDeck.length; i++) {
                    epiDeck[i].push("Epidemic!")
                    epiDeck[i] = epiDeck[i].sort(() => Math.random() - 0.5);
                }
                //combine array decks and first draw deck together
                let fullDeck = []
                for (let i = 0; i < epiDeck.length; i++) {
                    fullDeck = fullDeck.concat(epiDeck[i])
                }
                fullDeck = firstDrawDeck.concat(fullDeck);
                return fullDeck
            },
            thisInfectionDeck() {
                let newDeck = []
                //make deck
                for (let i = 0; i < this.preInfectionDeck.length; i++) {
                    if (this.preInfectionDeck[i].color != "none") {
                        for (let j = 0; j < this.preInfectionDeck[i].count; j++) {
                            const thisCard = Object.assign({}, this.preInfectionDeck[i])
                            newDeck.push(thisCard.name)
                        }
                    }
                }
                //shuffle deck with Fisher-Yates shuffle
                var currentIndex = newDeck.length,
                    temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = newDeck[currentIndex];
                    console.log("entered while loop");
                    newDeck[currentIndex] = newDeck[randomIndex];
                    newDeck[randomIndex] = temporaryValue;
                }
/*************************************************************************** */
                return newDeck.sort((a, b) => a > b);
/************************************************************************************** */
                // return newDeck;
            },
        },
        methods: {
            draw() {
                this.playerCards = this.thisPlayerDeck[0] + ', ' + this.thisPlayerDeck[1];
                if (this.thisPlayerDeck[0] == "Epidemic!" || this.thisPlayerDeck[1] == "Epidemic!") {
                    this.epidemic();
                }
                console.log(this.playerCards)
                this.thisPlayerDeck.shift();
                this.thisPlayerDeck.shift();
            },
            infect() {
                if (this.firstInfection == true) {
                    this.showFirstInfection()
                    this.firstInfection = false;
                    return
                }
                this.infectCards = this.thisInfectionDeck[0] + ', ' + this.thisInfectionDeck[1];
                this.discardPile.push(this.thisInfectionDeck[0]);
                this.discardPile.push(this.thisInfectionDeck[1]);
                this.thisInfectionDeck.shift();
                this.thisInfectionDeck.shift();
            },
            showFirstInfection() {
                for (let i = 0; i < 9; i++) {
                    this.infectCards += this.thisInfectionDeck[0] + ', ';
                    this.discardPile.push(this.thisInfectionDeck[0]);
                    this.thisInfectionDeck.shift()
                }
                this.infectCards = this.infectCards.substring(0, this.infectCards.length - 2)
            },
            epidemic() {
                //display epidemic card and put in discard pile
                this.playerCards += ` => ${this.thisInfectionDeck[this.thisInfectionDeck.length-1]}`;
                this.discardPile.push(this.thisInfectionDeck[this.thisInfectionDeck.length - 1]);
                this.infectionDeck.pop();
                //shuffle discard pile
                var currentIndex = this.discardPile.length,
                    temporaryValue, randomIndex;
                while (0 !== currentIndex) {
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;
                    temporaryValue = this.discardPile[currentIndex];
                    console.log("entered while loop");
                    this.discardPile[currentIndex] = this.discardPile[randomIndex];
                    this.discardPile[randomIndex] = temporaryValue;
                }

                //add shuffled deck to top of infection deck
                for (let i = 0; i < this.discardPile.length; i++) {
                    this.thisInfectionDeck.unshift(this.discardPile[i])
                }
                console.log(this.discardPile);
                this.discardPile = [];
            },
        }
    }
</script>

<style scoped language="scss">
    .drawCardComp {
        width: 50px;
        height: 50px;
        position: absolute;
        bottom: 0px;
        right: 0px;
    }

    .playerDraw {
        position: fixed;
        height: 400px;
        right: 0px;
        top: 85px;
    }

    .playerShow {
        position: fixed;
        right: 65px;
        top: 85px;
        background: white;
    }

    .infectDraw {
        position: fixed;
        right: 0px;
        top: 50px;
    }

    .infectShow {
        position: fixed;
        right: 65px;
        top: 50px;
        background: white;
    }
</style>