<template class="no-margin">
    <div class="home no-margin">

        <div class="no-margin">
            <b-button id="modbtn1" class="modalButton bg-success shadow-none border-success rounded-0" v-b-modal.modal-1>What We Know</b-button>

            <b-modal id="modal-1" title="What We Know">
                <div v-for="card in stackHistory" :key="card.id">
                    <h4>{{stackHistory.indexOf(card)}}: </h4>
                    <div v-for="c in card" :key="c.id">
                        <p>{{c.name}}: {{percent(c.count, card)}}% ({{c.count}} cards)</p>
                    </div>
                </div>
            </b-modal>
            <b-button id="modbtn2" class="modalButton bg-primary shadow-none border-primary rounded-0" v-b-modal.modal-2>Add</b-button>

            <b-modal id="modal-2" title="New City!">
                <b-form-group id="input-group-1" label="Name:" label-for="input-1" description="city name">
                    <b-form-input id="input-1" v-model="dataName" placeholder="city name" required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Color:" label-for="input-3">
                    <b-form-select id="input-3" v-model="dataColor" :options="colors" required></b-form-select>
                </b-form-group>


                <b-form-group id="input-group-2" label="special" label-for="input-2">
                    <b-form-input id="input-2" v-model="dataSpecial" placeholder="anything special?"></b-form-input>
                </b-form-group>

                <b-button @click="upload()" variant="primary">Submit</b-button>
            </b-modal>
        </div>

        <div v-if="showSpecialEvents == false">
            <div v-for="card in drawStack" :key="card.id">
                <b-button v-touch:swipe.left="swipeHandler" v-touch:touchhold="touchholdHandler" v-touch:tap="tapHandler" class="city shadow-none border-secondary" :class="card.color">
                    <div class="wide">
                        <h4>{{card.name}}</h4>
                        <p>amount left: {{card.count}}</p>
                    </div>
                    <div class="narrow equation">
                        <h2>{{percent(card.count, drawStack)}}%</h2>
                    </div>
                </b-button>
            </div>
            <b-button class="city bg-success shadow-none border-success rounded-0" id="epidemic" v-touch:tap="epiTap" v-touch:touchhold="epiHold">
                <h2>Epidemic!</h2>
            </b-button>
        </div>

        <div id="specialEvents" v-show="showSpecialEvents">
            <h1>Override Discard Pile</h1>
            <br>
            <b-form>

                <b-form-group id="input-group-5" label="City Name:" label-for="input-5">
                    <b-form-select class="m-2 mt-3" id="input-5" v-model="dataName" :options="distinctNames" required></b-form-select>
                </b-form-group>

                <br>
                <b-form-group class="" id="input-group-6" label="Number Removed From Deck" label-for="input-3">
                    <b-form-select class="m-2 mt-3" id="input-6" v-model="dataCount" :options="numbers" required></b-form-select>
                </b-form-group>
                <br>
                <b-button class="mr-4" variant="primary" @click="override()">OK</b-button>
                <b-button class="m-4" variant="secondary" @click="showSpecialEvents = false">Cancel</b-button>
            </b-form>
        </div>



    </div>
</template>

<style scoped>
    template {
        padding: 0%;
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

    .red {
        background-color: #BB1C21;
        outline: none;
        border: 1px;
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

    #modbtn1 {
        float: left;
        margin-bottom: 5px;
        width: 70%;
        height: 60px;
    }

    #modbtn2 {
        float: right;
        margin-bottom: 5px;
        width: 30%;
        height: 60px;
    }

    #epidemic {
        height: 70px;
        margin-top: 5px;
    }

    #specialEvents {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        background-color: white;
        padding: 15px;
    }
</style>

<script>
    // @ is an alias to /src
    import axios from 'axios';
    export default {
        name: 'Home',
        data() {
            return {
                stack: [],
                stackHistory: [],
                drawStack: [],
                distinctNames: [{
                    text: 'Select One',
                    value: null
                }],
                currentStack: [],
                addItem: null,
                dataName: '',
                dataCount: 4,
                dataColor: '',
                dataSpecial: '',
                colors: [{
                    text: 'Select One',
                    value: null
                }, 'blue', 'gray', 'yellow', 'red'],
                numbers: [{
                    text: 'Select One',
                    value: null
                }, '1', '2', '3', '4'],
                showSpecialEvents: false,
            }
        },
        created() {
            this.getStack(); //retrieve from database and assign to itesm[]
        },
        methods: {

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

            swipeHandler: function(event) {
                if (event == "left") {
                    this.showSpecialEvents = true;
                }
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

            epiTap: function() {
                this.epidemic()
            },

            epiHold: function() {
                this.undoEpidemic()
            },

            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                //build decks
                let cloneDeck = []
                for (let i = 0; i < this.stack.length; i++) {
                    const card = this.stack[i]
                    const currentCard = Object.assign({}, card);
                    const drawCard = Object.assign({}, card);
                    cloneDeck.push(drawCard);
                    this.distinctNames.push(drawCard.name);
                    currentCard.count = 0;
                    this.currentStack.push(currentCard);
                }
                this.stackHistory.push(cloneDeck);
                this.drawStack = this.stackHistory[0];
                return true;
            },

            async upload() {
                try {
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/items', {
                        name: this.dataName,
                        count: this.dataCount,
                        color: this.dataColor,
                        special: this.dataSpecial,
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                } catch (error) {
                    console.log(error);
                }

            },

            update(cityName) {
                //delete card from stack
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].name == cityName) {
                        this.drawStack[i].count--;
                    }
                }
                //add the card to the currentStack
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].name == cityName) {
                        this.currentStack[i].count++
                    }
                }
                this.drawStack.sort((a, b) => (b.count > a.count) ? 1 : (b.count === a.count) ? ((a.color > b.color) ? 1 : -1) : -1)
                this.popit();
            },

            popit() {
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].count == 0) {
                        this.drawStack.splice(i, 1);
                    }
                }
                if (this.drawStack.length == 0) {
                    this.stackHistory.shift();
                    this.drawStack = this.stackHistory[0];
                }
            },

            undo(cityName) {
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
                let total = 0
                for (let i = 0; i < arr.length; i++) {
                    total += arr[i].count
                }
                const percentage = Math.round(100 * (count / total));
                return percentage;
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
            }
        }
    }
</script>