<template class="no-margin">
    <div class="home no-margin">

        <div class="no-margin">
            <b-button id="whatWeKnow" class="btn bg-success shadow-none border-success rounded-0" @click="bump('whatWeKnow')">What We Know</b-button>

            <div v-show="showWhatWeKnow">
                <b-button class="btnRight bg-secondary shadow-none border-secondary rounded-0" @click="bump('discard')">Discard Pile</b-button>
                <div id="knowContent">
                    <div class="knowChild" id="discard" v-show="showDiscardPile">
                        <h4>Discard: </h4>
                        <div v-for="card in currentStack" :key="card.id">
                            <p v-show="card.count>0">{{card.name}}: {{card.count}}</p>
                        </div>
                    </div>
                    <div class="knowChild">
                        <div>
                            <div v-for="card in stackHistory" :key="card.id">
                                <h4>{{stackHistory.indexOf(card)}}: </h4>
                                <div v-for="c in card" :key="c.id">
                                    <p>{{c.name}}: {{percent(c.count, card)}}% ({{c.count}} cards)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <b-button @click="bump('special')" v-show="!showWhatWeKnow" class="btnRight bg-primary shadow-none border-primary rounded-0">Override</b-button>
            <div id="specialEvents" v-show="showSpecialEvents">
                <h1>Override Discard Pile</h1>
                <br>
                <b-form>

                    <b-form-group id="input-group-o" label="City:" label-for="input-o">
                        <b-form-select class="mt-2 mb-3" id="input-o" v-model="dataName" :options="currentStackNames" required></b-form-select>
                    </b-form-group>

                    <br>
                    <b-form-group class="" id="input-group-6" label="Number Removed From Deck" label-for="input-3">
                        <b-form-select class="m-2 mt-3" id="input-6" v-model="dataCount" :options="numbers" required></b-form-select>
                    </b-form-group>
                    <br>
                    <div class="btnGroup">
                        <b-button class="mr-4" variant="primary" @click="override()">OK</b-button>
                        <b-button class="m-2" variant="danger" @click="showSpecialEvents = false">Cancel</b-button>
                    </div>
                </b-form>
            </div>

            <div>
                <div v-for="card in drawStack" :key="card.id">
                    <b-button v-touch:touchhold="touchholdHandler" v-touch:tap="tapHandler" class="city shadow-none border-secondary rounded-0" :class="card.color">
                        <div class="wide">
                            <h4>{{card.name}}</h4>
                            <p>amount left: {{card.count}}</p>
                        </div>
                        <div class="narrow equation">
                            <h2>{{percent(card.count, drawStack)}}%</h2>
                        </div>
                    </b-button>
                </div>

                <div v-show="showEpi" id="epidemicModal">
                    <b-form-group id="input-group-e" label="City:" label-for="input-e">
                        <b-form-select class="mt-2 mb-3" id="input-e" v-model="dataCity" :options="distinctNames" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-i" label="Rate:" label-for="input-i">
                        <b-form-select class="mt-2 mb-3" id="input-i" v-model="infectionRate" :options="numbers" required></b-form-select>
                    </b-form-group>

                    <b-button variant="primary" @click="bump('epi'), epidemic()">Go!</b-button>
                    <b-button variant="danger" @click="bump('epi')">Cancel</b-button>

                </div>

                <b-button @click="bump('epi')" class="city bg-success shadow-none border-success rounded-0" id="epidemic" v-touch:touchhold="epiHold">
                    <h2>Epidemic!</h2>
                </b-button>

            </div>




        </div>
    </div>
</template>

<style lang="scss" scoped>
    template {
        width: 300px;
    }

    div {
        font-family: 'Quicksand', sans-serif;
    }

    .home {
        background-color: white;
        border: 2px solid white;
    }

    .city p {
        margin: 0px;
    }

    .city h4 {
        margin: 0px;
    }


    .city {
        width: 100%;
        position: relative;
    }

    .blue {
        background-color: #0F4C82;
        outline: 1px solid rgba(212, 214, 227, 0.5);
        border: 1px;
    }

    .blue:hover {
        background-color: #0F4C82;
    }

    .blue:focus {
        background-color: #0F4C82;
    }

    .yellow {
        background-color: #F7A400;
        outline: 1px solid rgba(255, 255, 255, 0.59);
        border: 1px;
    }

    .yellow:hover {
        background-color: #F7A400
    }

    .yellow:focus {
        background-color: #F7A400
    }

    .gray {
        background-color: #838087;
        outline: 1px solid rgba(212, 214, 227, 0.5);
        border: 1px;
    }

    .gray:hover {
        background-color: #838087;
    }

    .gray:focus {
        background-color: #838087;
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

    .no-margin {
        margin: 0px;
        padding: 0px;
    }

    #whatWeKnow {
        float: left;
        margin-bottom: 5px;
        width: 70%;
        height: 60px;
    }

    #knowContent {
        text-align: center;
        width: 100%;
        margin: auto;
    }

    .btnRight {
        float: right;
        margin-bottom: 5px;
        width: 30%;
        height: 60px;
    }

    .btnGroup {
        margin-left: 20px;
    }

    #epidemic {
        height: 70px;
        margin-top: 5px;
    }

    #specialEvents {
        text-align: center;
        padding-top: 30px;
    }

    #epidemicModal {
        text-align: center;
        padding: 10px;
    }
</style>

<script>
    export default {
        name: 'CardCounter',
        props: ['ogStack'],
        data() {
            return {
                // stack: this.ogStack,
                stackHistory: [],
                drawStack: [],
                // distinctNames: [{
                //     text: 'Select One',
                //     value: null
                // }],
                infectionRate: 2,
                currentStack: [],
                colors: [{
                    text: 'Select One',
                    value: null
                }, 'blue', 'gray', 'yellow', 'red'],
                dataName: "",
                dataCount: "",
                dataCity: "",
                numbers: [{
                    text: 'Select One',
                    value: null
                }, '0', '1', '2', '3', '4', '5', '6', '7', '8'],
                kinds: [{
                    text: 'Select One',
                    value: null
                }, 'city', 'haven'],
                showSpecialEvents: false,
                showDiscardPile: false,
                showWhatWeKnow: false,
                showEpi: false,
                decksMade: false,
            }
        },
        mounted() {
            this.$nextTick(this.makeDecks())
        },
        computed: {
            currentStackNames() {
                let c = [];
                if (this.currentStack.length != 0) {
                    for (let i = 0; i < this.currentStack.length; i++) {
                        if (this.currentStack[i] != undefined && this.currentStack[i].count > 0) {

                            c.push(this.currentStack[i].name);
                        }
                    }
                }
                return c;
            },
            stack() {
                return this.ogStack
            },
            distinctNames() {
                let names = [{
                    text: 'Select One',
                    value: null
                }];
                for (let i = 0; i < this.stack.length; i++) {
                    names.push(this.stack[i].name)
                }
                return names
            }
        },
        methods: {

            bump(att) {
                if (att == "discard") {
                    if (this.showDiscardPile == true) {
                        this.showDiscardPile = false;
                    } else {
                        this.showDiscardPile = true;
                    }

                } else if (att == "whatWeKnow") {
                    if (this.showWhatWeKnow == true) {
                        this.showWhatWeKnow = false;
                    } else {
                        this.showWhatWeKnow = true;
                    }

                } else if (att == "epi") {
                    if (this.showEpi == true) {
                        this.showEpi = false;
                        console.log(this.dataCity)
                    } else {
                        this.showEpi = true;
                    }

                } else if (att == "special") {
                    if (this.showSpecialEvents == true) {
                        this.showSpecialEvents = false;
                    } else {
                        this.showSpecialEvents = true;
                    }

                }
            },

            tapHandler: function(event) {
                let cardName = ""

                if (event.target.tagName == "P" || event.target.tagName == "H4") {
                    cardName = (event.target.offsetParent.children[0].innerText)
                } else if (event.target.tagName == "H2") {
                    cardName = (event.target.offsetParent.children[0].firstChild.innerText)
                } else if (event.target.tagName == "BUTTON") {
                    cardName = (event.target.children[0].children[0].innerText)
                }

                this.update(cardName)
            },

            touchholdHandler: function(event) {
                console.log("touchHold called");
                console.log(event);

                let cardName = ""

                if (event.target.tagName == "P" || event.target.tagName == "H4") {
                    cardName = (event.target.offsetParent.children[0].innerText)
                } else if (event.target.tagName == "H2") {
                    cardName = (event.target.offsetParent.children[0].firstChild.innerText)
                } else if (event.target.tagName == "BUTTON") {
                    cardName = (event.target.children[0].children[0].innerText)
                }

                this.undo(cardName)
            },

            epiHold: function() {
                this.undoEpidemic()
            },

            makeDecks() {
                console.log("deck build started")
                console.log(this.ogStack.length)
                let cloneDeck = [];
                for (let i = 0; i < this.stack.length; i++) {
                    if (this.stack[i].color != "none") {
                        const card = this.stack[i]
                        if (card.count != 0) {
                            const currentCard = Object.assign({}, card);
                            const drawCard = Object.assign({}, card);
                            cloneDeck.push(drawCard);
                            // this.distinctNames.push(drawCard.name);
                            currentCard.count = 0;
                            this.currentStack.push(currentCard);
                        }
                    }
                }
                this.stackHistory.push(cloneDeck);
                this.drawStack = this.stackHistory[0];
                // console.log(this.distinctNames)
            },

            update(cityName) {
                console.log("update " + cityName);
                //update stack
                for (let i = 0; i < this.stack.length; i++) {
                    if (this.stack[i].name == cityName) {
                        if (this.stack[i].supplyCubes != 0) {
                            this.stack[i].supplyCubes--;
                        } else {
                            this.stack[i].plagueCubes++;
                        }
                    }
                }
                //delete card from stack
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].name == cityName) {
                        this.drawStack[i].count--;
                        break;
                    }
                }
                //add the card to the currentStack
                for (let i = 0; i <= this.currentStack.length; i++) {
                    if (this.currentStack[i] != undefined) {
                        if (this.currentStack[i].name == cityName) {
                            this.currentStack[i].count++
                            break;
                        }
                    }
                }
                this.drawStack.sort((a, b) => (b.count > a.count) ? 1 : (b.count === a.count) ? ((a.color > b.color) ? 1 : -1) : -1)
                this.popit();
            },

            popit() {
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].count <= 0) {
                        this.drawStack.splice(i, 1);
                    }
                }
                if (this.drawStack.length == 0) {
                    this.stackHistory.shift();
                    this.drawStack = this.stackHistory[0];
                }
            },

            undo(cityName) {
                for (let i = 0; i < this.stack.length; i++) {
                    if (this.stack[i].name == cityName) {
                        if (this.stack[i].supplyCubes != 0) {
                            this.stack[i].supplyCubes++;
                        } else {
                            this.stack[i].plagueCubes--;
                        }
                    }
                }
                //add card to drawStack
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].name == cityName) {
                        this.drawStack[i].count++;
                    }
                }
                //delete card from currentStack
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].name == cityName) {
                        this.currentStack[i].count--
                    }
                }
                this.drawStack.sort((a, b) => (b.count > a.count) ? 1 : (b.count === a.count) ? ((a.color > b.color) ? 1 : -1) : -1)
                this.popit();
            },

            epidemic() {
                console.log("epidemic " + this.dataCity);
                this.update(this.dataCity)
                let stackClone = []
                for (let i = 0; i < this.currentStack.length; i++) {
                    const card = this.currentStack[i]
                    const currentCard = Object.assign({}, card);
                    if (currentCard.count > 0) {
                        stackClone.push(currentCard);
                    }
                    this.currentStack[i].count = 0;
                }
                this.stackHistory.unshift(stackClone);
                this.drawStack = this.stackHistory[0];
            },

            undoEpidemic() {
                this.currentStack = [];
                let previousStack = this.stackHistory[1];
                for (let i = 0; i < this.drawStack.length; i++) {
                    //take each card from the drawStack and put it into the currentStack (discard pile)
                    const card = this.drawStack[i]
                    const currentCard = Object.assign({}, card);
                    this.currentStack.push(currentCard);
                    //for each of these cards, go to stackHistory and update the numbers
                    for (let j = 0; j < previousStack.length; j++) {
                        if (currentCard.name == previousStack[j].name) {
                            previousStack[j].count++;
                        }
                    }
                }
                this.stackHistory.shift();
                this.drawStack = this.stackHistory[0]
                return
            },

            percent(count, arr) {
                let amount = 0;
                for (let i = 0; i < arr.length; i++) {
                    amount += arr[i].count
                }
                let countFalse = amount - count;
                console.log(`countFalse is ${countFalse}\namount is ${amount}`)
                let percentageFalse = 1;
                for (let i = 0; i < this.infectionRate; i++) {
                    percentageFalse *= ((countFalse) / amount)
                    countFalse += -1
                    amount += -1
                    console.log(`percentageFalse is ${percentageFalse} countFalse is ${countFalse} and amount is ${amount}`)
                }
                const percent = 1 - percentageFalse;
                return Math.round(100 * percent)




                // let total = 0
                // for (let i = 0; i < arr.length; i++) {
                //     total += arr[i].count
                // }
                // let percentage = 0;
                // for (let i = 0; i < this.infectionRate; i++) {
                //     percentage += (count / (total - i))
                //     if (percentage > 1) {
                //         percentage = 1;
                //     }
                // }
                // return Math.round(100 * percentage);
            },

            override() {
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].name == this.dataName) {
                        if (this.dataCount > this.currentStack[i]) {
                            alert("There are not that many cards in the discard pile!")
                            return
                        }
                        this.currentStack[i].count -= this.dataCount;
                    }

                }
                this.showSpecialEvents = false;
                this.dataName = "";
            },
        }
    }
</script>