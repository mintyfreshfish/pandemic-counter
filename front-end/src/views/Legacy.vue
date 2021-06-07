<!--
ToDo:
Make cities stay on screen when reach 0, but fade out. Same with cities that have populations of 0, or no longer have cards in the deck.
Make admin page easier to access (button) and allows to remove cities from discard pile and remove indefinitely (and an option to undo this action)
Check discard pile and make sure it is accessible.
-->

<template class="no-margin">
    <div class="home">
        <div class="banner">
            <h1 class="bannertitle">Pandemic Counter</h1>
        </div>
        <div class="column sidebar">
                <h2 class="piletitle">Menu</h2>
            <div class="menu">
                <button v-b-modal="'epidemicModal'" class="epibutton menubtn">
                    <h4>Epidemic!</h4>
                </button>
                <div>
                <!-- <b-modal hide-footer hide-header id="epidemicModal"> -->
                    <b-form-group id="input-group-e" label="City:" label-for="input-e">
                        <b-form-select class="mt-2 mb-3" id="input-e" v-model="dataCity" :options="distinctNames" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-i" label="Rate:" label-for="input-i">
                        <b-form-select class="mt-2 mb-3" id="input-i" v-model="infectionRate" :options="numbers" required></b-form-select>
                    </b-form-group>

                    <b-button variant="success" @click="epidemic()">Epidemic!</b-button>

                <!-- </b-modal> -->
                </div>
                <button v-b-modal="'adminModal'" class="adminbutton menubtn">
                    <h4>Admin</h4>
                </button>
                <div>
                <!-- <b-modal hide-footer hide-header id="adminModal"> -->
                    <b-form-group id="input-group-e" label="City:" label-for="input-e">
                        <b-form-select class="mt-2 mb-3" id="input-e" v-model="dataCity" :options="distinctNames" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-i" label="Amount:" label-for="input-i">
                        <b-form-select class="mt-2 mb-3" id="input-i" v-model="toRemove" :options="numbers" required></b-form-select>
                    </b-form-group>

                    <b-button variant="primary" @click="removecard()">Remove!</b-button>
                    <b-button variant="dark left-margin" @click="replaceCard()">Replace!</b-button>

                <!-- </b-modal> -->
                </div>
            </div>
            <div>
                <div class="menubtn oogbanner">
                    <h4 class="oogtitle">Out of Game</h4>
                </div>
                <div v-for="card in stack" :key="card.id" class="ooglist">
                    <p v-if="card.outOfGame>=1">{{card.name}}: {{card.outOfGame}}</p>
                </div>
            </div>
        </div>
        <div class="column piles">
            <div class="drawpile">
                <h2 class="piletitle">Draw Pile</h2>
                <div v-for="card in drawStack" :key="card.id">
                    <div class="city" :class="determineColor(card, 'drawpile')">
                        <div class="cityname">
                            <h4>{{card.name}}</h4>
                        </div>
                        <div class="citypercent">
                            <h4>{{percent(card.inDrawPile, drawStack)}}%</h4>
                        </div>
                        <div class="cityamount">
                            <p>{{card.inDrawPile}} / {{card.count}}</p>
                        </div>
                        <button @click="update(card.name)" class="cityicon h3 mb-2">
                            <b-icon-arrow-right-circle></b-icon-arrow-right-circle>
                        </button>
                    </div>
                </div>
            </div>
            <div class="discardpile">
                <h2 class=piletitle>Discard Pile</h2>
                <div v-for="card in currentStack" :key="card.id">
                    <div class="city" :class="determineColor(card, 'discardpile')">
                        <button @click="undo(card.name)" class="left-margin cityicon h3 mb-2">
                            <b-icon-arrow-left-circle></b-icon-arrow-left-circle>
                        </button>
                        <div class="cityname">
                            <h4>{{card.name}}</h4>
                        </div>
                        <div class="cityamount">
                            <p>{{card.inDiscardPile}} / {{card.count}}</p>
                        </div>
                        <!-- <button @click="showDropdown($event)" class="cityexclamation cityicon h3 mb-2">
                            <b-icon-exclamation-circle></b-icon-exclamation-circle>
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="no-margin">
            <b-button id="modbtn1" class="modalButton bg-success shadow-none border-success rounded-0" v-b-modal.modal-1>What We Know</b-button>

            <b-modal hide-footer id="modal-1" title="What We Know" @show="resetModal" @hidden="resetModal">
                <b-button @click="bump('discard')">Discard Pile</b-button>
                <div v-show="showDiscardPile">
                    <div v-for="card in currentStack" :key="card.id">
                        <p v-show="card.count>0">{{card.name}}: {{card.count}}</p>
                    </div>
                </div>

                <div v-for="card in stackHistory" :key="card.id">
                    <h4>{{stackHistory.indexOf(card)}}: </h4>
                    <div v-for="c in card" :key="c.id">
                        <p>{{c.name}}: {{percent(c.count, card)}}% ({{c.count}} cards)</p>
                    </div>
                </div>
            </b-modal>
            <b-button id="modbtn2" class="modalButton bg-primary shadow-none border-primary rounded-0" v-b-modal.modal-2>Cities</b-button>

            <b-modal hide-footer id="modal-2" title="New City!">
                <div class="form">
                    <b-form-group id="input-group-type" label="Type:" label-for="input-type">
                        <b-form-select class="mt-2 mb-3" id="input-type" v-model="dataKind" :options="kinds" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="Name:" label-for="input-1" description="">
                        <b-form-input class="mt-2 mb-3" id="input-1" v-model="dataName" placeholder="" required></b-form-input>
                    </b-form-group>

                    <b-form-group class="" id="input-group-4" label="Amount" label-for="input-4">
                        <b-form-select class="mt-2 mb-3" id="input-4" v-model="dataCount" :options="numbers" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="Color:" label-for="input-3">
                        <b-form-select class="mt-2 mb-3" id="input-3" v-model="dataColor" :options="colors" required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Tag:" label-for="input-2">
                        <b-form-input class="mt-2 mb-3" id="input-2" v-model="dataTag" placeholder=""></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-pop" label="Population:" label-for="input-pop">
                        <b-form-select :options="numbers" class="mt-2 mb-3" id="input-pop" v-model="dataPopulation" placeholder=""></b-form-select>
                    </b-form-group>

                    <div class="form">
                        <input type="file" name="photo" @change="fileChanged">
                        <button @click="upload">Upload</button>
                    </div>
                    <div class="upload" v-if="addItem">
                        <img :src="addItem.path" />
                    </div>

                    <b-button v-b-modal="'modal-2'" @click="upload()" variant="primary">Submit</b-button>
                </div>

                <div class="form">
                    <h2>Delete</h2>

                    <b-form-group class="" id="input-group-7" label="city to delete:" label-for="input-7">
                        <b-form-select class="mt-2 mb-3" id="input-7" v-model="dataName" :options="distinctNames" required></b-form-select>
                    </b-form-group>

                    <b-button class="mr-4" variant="danger" @click="deleteCity()">Delete</b-button>
                </div>
            </b-modal>
        </div>

        <div v-if="showSpecialEvents == false" class="cityList">
            <div v-for="card in drawStack" :key="card.id">
                <div class="city" :class="card.color">
                    <div class="wide">
                        <h4>{{card.name}}</h4>
                        <p>amount left: {{card.count}}</p>
                    </div>
                    <div class="counter">
                        <div class="plus">
                            <button @click="undo(card.name)" class="counterBtn">
                                <b-icon-plus style="color: white"></b-icon-plus>
                            </button>
                        </div>
                        <div class="minus">
                            <button @click="update(card.name)" class="counterBtn">
                                <b-icon-dash style="color: white"></b-icon-dash>
                            </button>
                        </div>
                        <div class="percent">
                            <h2>{{percent(card.count, drawStack)}}%</h2>
                        </div>
                    </div>
                </div>
            </div>

            <b-button v-b-modal="'epidemicModal'" class="city bg-success shadow-none border-success rounded-0" id="epidemic" v-touch:touchhold="epiHold">
                <h2>Epidemic!</h2>
            </b-button>

            <b-modal hide-footer hide-header id="epidemicModal">
                <b-form-group id="input-group-e" label="City:" label-for="input-e">
                    <b-form-select class="mt-2 mb-3" id="input-e" v-model="dataCity" :options="distinctNames" required></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-i" label="Rate:" label-for="input-i">
                    <b-form-select class="mt-2 mb-3" id="input-i" v-model="infectionRate" :options="numbers" required></b-form-select>
                </b-form-group>

                <b-button variant="success" v-touch:tap="epiTap">Epidemic!</b-button>

            </b-modal>
        </div>

        <div id="specialEvents" v-show="showSpecialEvents">
            <h1>Override Discard Pile</h1>
            <br>
            <b-form>

                <b-form-group id="input-group-o" label="City:" label-for="input-o">
                    <b-form-select class="mt-2 mb-3" id="input-o" v-model="dataName" :options="currentStackNames()" required></b-form-select>
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
-->


    </div>
</template>

<style lang="scss" scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Mate+SC&display=swap');

    .showing {
        display: block;
    }

    .hidden {
        display: none;
    }

    .left-margin {
        margin-left: 15px;
    }

    h1,
    h2,
    h4 {
        color: white;
        font-family: 'Montserrat', sans-serif;
    }

    .home {
        width: 1200px;
        height: 100%;
        margin: auto;
    }

    .banner {
        height: 100px;
        text-align: center;
        padding: 20px 0px;
        background-color: darkslategray;
    }

    .bannertitle {
        font-family: 'Mate SC', serif;
    }

    .column {
        position: absolute;
    }

    .sidebar {
        background-color: lightgray;
        width: 200px;
    }

    .menubtn {
        display: inline-block;
        width: 100%;
        padding: 0.46em 1.6em;
        border:solid 1px black;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        color: #000000;
        text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
        background-color: #000000;
        text-align: center;
        transition: all 0.15s;
    }

    .menubtn:hover {
        text-shadow: 0 0 2em rgba(255, 255, 255, 1);
        color: #FFFFFF;
        border-color: black;
    }

    .epibutton {
        background-color: green;
        margin-top: 10px;
    }

    .epibutton:hover {
        background-color: darkgreen;
    }

    .adminbutton {
        background-color: green;
    }

    .adminbutton:hover {
        background-color: darkblue;
    }

    .oogbanner {
        background-color: black;
        text-align: center;
    }

    .oogtitle {
        font-family: 'Montserrat', sans-serif;
    }

    .ooglist {
        margin-left: 30px;
    }

    .piles {
        background-color: lightpink;
        margin-left: 200px;
        width: 1000px;
    }

    .drawpile {
        background-color: slategray;
        width: 50%;
        float: left;
    }

    .discardpile {
        background-color: lightslategray;
        width: 50%;
        float: right;
    }

    .piletitle {
        text-align: center;
        padding: 5px 0px;
    }

    .city {
        height: 60px;
        text-align: center;
        color: white;
        display: flex;
        flex-wrap: wrap;
        font-family: 'Montserrat', sans-serif;
        border: none;
    }

    .cityname {
        width: 210px;
        padding-top: 15px;
        padding-bottom: 7px;
    }

    .citypercent {
        width: 50px;
        margin-left: 40px;
        padding-top: 15px;
        padding-bottom: 7px;
    }

    .cityamount {
        width: 100px;
        margin-left: 50px;
        padding-top: 17px;
        // padding-bottom: 15px;
    }

    .cityicon {
        padding-top: 12px;
        padding-bottom: 5px;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        color: white;
    }

    .cityexclamation {
        padding-top: 5px;
        padding-bottom: 5px;
        width: 50px;
        margin-left: 100px;
    }

    .exclamationmenu {
        align-self: center;
    }

    .toremove {
        display: inline;
        margin: 0px 20px 0px 60px;
    }

    .removenmbtn {
        margin: 0px 5px;
        border: 1px solid black;
        border-radius: 50%;
        background-color: red;
        color: white;
    }

    .removebtn {
        border-radius: 10px;
        border: none;
        color: white;
        background-color: blue;
    }

    .blue {
        background-color: #0F4C82;
        outline: 1px solid rgba(212, 214, 227, 0.5);
        border: 1px;
    }

    .yellow {
        background-color: #F7A400;
        outline: 1px solid rgba(255, 255, 255, 0.59);
        border: 1px;
    }

    .black {
        background-color: #838087;
        outline: 1px solid rgba(212, 214, 227, 0.5);
        border: 1px;
    }

    .red {
        background-color: #BB1C21;
        outline: none;
        border: 1px;
    }

    .faded {
        background-color: lightgray;
        color: white;
        border: 1px;
    }

    // template {
    //     padding: 0%;
    // }

    // .city p {
    //     margin: 0px;
    // }

    // .city h4 {
    //     margin: 0px;
    // }


    // .city {
    //     width: 100%;
    //     height: 60px;
    //     position: relative;
    // }

    // .cityList {
    //     background-color: rgba(255, 255, 255, 0);
    //     color: white;
    //     transform: translateY(60px);
    // }

    // .counter {
    //     display: flex;
    //     margin: 0;
    //     position: absolute;
    //     top: 50%;
    //     left: 75%;
    //     transform: translate(-50%, -50%);
    // }

    // .counterBtn {
    //     height: 50px;
    //     width: 50px;
    //     border-radius: 20%;
    //     border: none;
    //     background-color: rgba(0, 0, 0, 0.4);
    //     color: rgba(255, 255, 255, 1);
    //     margin: 0px 5px;
    // }

    // .percent {
    //     position: absolute;
    //     margin: 0;
    //     position: absolute;
    //     top: 50%;
    //     right: 80%;
    //     transform: translate(-50%, -50%);
    // }


    // .wide {
    //     width: 50%;
    //     float: left;
    //     position: absolute;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     text-align: center;
    // }

    // .narrow {
    //     width: 20%;
    //     float: right;
    //     margin: 0px 5px;
    // }

    // .undo {
    //     height: 50px;
    //     margin: 0px;
    // }

    // .equation {
    //     margin-right: 10px;
    //     padding-top: 10px;
    // }

    // .no-margin {
    //     margin: 0px;
    //     padding: 0px;
    // }

    // .form {
    //     margin-bottom: 100px;
    // }

    // #modbtn1 {
    //     float: left;
    //     margin-bottom: 5px;
    //     width: 70%;
    //     height: 60px;
    // }

    // #modbtn2 {
    //     float: right;
    //     margin-bottom: 5px;
    //     width: 30%;
    //     height: 60px;
    // }

    // #epidemic {
    //     height: 70px;
    //     margin-top: 5px;
    // }

    // #specialEvents {
    //     height: 100%;
    //     width: 100%;
    //     position: absolute;
    //     top: 0;
    //     background-color: white;
    //     padding: 15px;
    // }
</style>

<script>
    import axios from 'axios';
    import {
        // BIconPlus,
        // BIconDash
        BIconArrowRightCircle,
        BIconArrowLeftCircle,
        // BIconExclamationCircle
    } from 'bootstrap-vue'
    export default {
        name: 'Home',
        components: {
            // BIconPlus,
            // BIconDash,
            BIconArrowRightCircle,
            BIconArrowLeftCircle,
            // BIconExclamationCircle
        },
        data() {
            return {
                stack: [],
                stackHistory: [],
                drawStack: [],
                infectionRate: 2,
                distinctNames: [{
                    text: 'Select One',
                    value: null
                }, ],
                currentStack: [],
                addItem: null,
                dataName: '',
                dataCount: 1,
                dataColor: '',
                dataTag: '',
                dataAbilities: '',
                dataSupply: 0,
                dataPlague: 0,
                dataSpecial: '',
                dataPopulation: 0,
                dataKind: '',
                dataOrigin: '',
                dataExposure: 0,
                colors: [{
                    text: 'Select One',
                    value: null
                }, 'blue', 'gray', 'yellow', 'red'],
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
                toRemove: 0,
                undoEpidemicTracker: "",
            }
        },
        created() {
            this.getStack(); //retrieve from database and assign to itesm[]
        },
        computed: {
            options() {
                return this.distinctNames
            }
        },
        methods: {

            removecard() {
                for (let i = 0; i < this.currentStack.length; i++) {
                    var thisCard = this.currentStack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.count -= this.toRemove;
                        thisCard.inDiscardPile -= this.toRemove;
                    }
                }
                for (let i = 0; i < this.drawStack.length; i++) {
                    thisCard = this.drawStack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.count -= this.toRemove;
                        // thisCard.inDrawPile -= this.toRemove;
                    }
                }
                for (let i = 0; i < this.stack.length; i++) {
                    thisCard = this.stack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.outOfGame += Number(this.toRemove);
                    }
                }
                this.toRemove = 0;
                this.dataCity = "";
                return
            },

            replaceCard() {
                for (let i = 0; i < this.currentStack.length; i++) {
                    var thisCard = this.currentStack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.count += Number(this.toRemove);
                        thisCard.inDiscardPile += Number(this.toRemove);
                    }
                }
                for (let i = 0; i < this.drawStack.length; i++) {
                    thisCard = this.drawStack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.count += Number(this.toRemove);
                        // thisCard.inDrawPile -= this.toRemove;
                    }
                }
                for (let i = 0; i < this.stack.length; i++) {
                    thisCard = this.stack[i]
                    if (thisCard.name == this.dataCity) {
                        thisCard.outOfGame -= Number(this.toRemove);
                    }
                }
                this.toRemove = 0;
                this.dataCity = "";
                return
            },

            determineColor(card, pile) {
                let color = ""
                if (card.inDrawPile == 0 && pile == "drawpile") {
                    color = "faded"
                } else if (card.inDiscardPile == 0 && pile == "discardpile") {
                    color = "faded"
                } else if (card.color == "blue") {
                    color = "blue"
                } else if (card.color == "black") {
                    color = "black"
                } else if (card.color == "yellow") {
                    color = "yellow"
                } else if (card.color == "red") {
                    color = "red"
                }
                return color
            },

            bump(att) {
                if (att == "discard") {
                    if (this.showDiscardPile == true) {
                        this.showDiscardPile = false;
                    } else {
                        this.showDiscardPile = true;
                    }
                }
            },

            resetModal() {
                this.showDiscardPile = false;
            },

            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    // this.stack = response.data;
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].count != 0 && response.data[i].kind != 'haven') {
                            this.stack.push(response.data[i])
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
                //build decks
                let cloneDeck = []
                for (let i = 0; i < this.stack.length; i++) {
                    const card = this.stack[i]
                    //add non-server properties
                    card.inDrawPile = card.count - card.box6;
                    card.inDiscardPile = 0;
                    card.outOfGame = card.box6;
                    if (card.color == "blue" || card.color == "black" || card.color == "yellow" || card.color == "red") {
                        const currentCard = Object.assign({}, card);
                        const drawCard = Object.assign({}, card);
                        cloneDeck.push(drawCard);
                        this.distinctNames.push({
                            text: card.name,
                            value: card.name
                        });
                        // currentCard.count = 0;
                        this.currentStack.push(currentCard);
                    }
                }
                this.stackHistory.push(cloneDeck);
                this.drawStack = this.stackHistory[0];
                this.drawStack.sort((a, b) => (a.name > b.name) ? 1 : -1)
                this.currentStack.sort((a, b) => (a.name > b.name) ? 1 : -1)
                return true;
            },

            async upload() {
                try {
                    console.log(this.stack.indexOf(this.dataName));
                    //check for validity: must have name and color and cannot already exist in the stack
                    if (this.dataName == "" || this.stack.indexOf(this.dataName) != -1) {
                        alert("invalid city")
                        return
                    } else if (this.stack.indexOf(this.dataTag) != -1) {
                        alert("tag taken")
                        return
                    }
                    let photoPath = ""
                    if (this.file != null) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/items', {
                        name: this.dataName,
                        count: this.dataCount,
                        color: this.dataColor,
                        tag: this.dataTag,
                        supplyCubes: 0,
                        plagueCubes: 0,
                        supplyCenter: false,
                        special: '',
                        position: [],
                        inDrawPile: this.amount,
                        inDiscardPile: 0,
                        kind: this.dataKind,
                        population: this.dataPopulation,
                        path: photoPath
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                    //reset variables
                    this.dataName = "";
                    this.dataCount = 4;
                    this.dataColor = "";
                    this.dataTag = "";
                    this.dataKind = "";
                    this.dataPopulation = "";
                } catch (error) {
                    console.log(error);
                }

            },

            fileChanged(event) {
                this.file = event.target.files[0]
            },

            async uploadCharacter() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file)
                    let r1 = await axios.post('/api/photos', formData);
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/characters', {
                        name: this.dataName,
                        exposure: this.dataExposure,
                        color: this.dataColor,
                        abilities: this.dataAbilities,
                        hand: [],
                        origin: this.dataOrigin,
                        image: r1.data.path
                    });
                    console.log("assigned r2");
                    this.addCharacter = r2.data;
                    console.log("added item");
                } catch (error) {
                    console.log(error);
                }

            },

            async deleteCity() {
                try {
                    let item;
                    for (let i = 0; i < this.stack.length; i++) {
                        if (this.stack[i].name == this.dataName) {
                            item = this.stack[i]
                            console.log("found item")
                        }
                    }
                    await axios.delete("/api/items/" + item._id);
                    this.getStack();
                    //reset variables
                    this.dataName = "";
                    this.dataCount = 4;
                    this.dataTag = ""
                    console.log("deleted")
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            update(cityName) {
                //delete card from stack
                for (let i = 0; i < this.drawStack.length; i++) {
                    if (this.drawStack[i].name == cityName) {
                        this.drawStack[i].inDrawPile--;
                    }
                }
                //add the card to the currentStack
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].name == cityName) {
                        this.currentStack[i].inDiscardPile++
                    }
                }
                // this.popit();
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
                        this.drawStack[i].inDrawPile++;
                    }
                }
                //delete card from currentStack
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].name == cityName) {
                        this.currentStack[i].inDiscardPile--
                    }
                }
                // this.popit();
            },

            epidemic() {
                this.update(this.dataCity)
                // let stackClone = []
                // for (let i = 0; i < this.currentStack.length; i++) {
                //     const card = this.currentStack[i]
                //     const currentCard = Object.assign({}, card);
                //     if (currentCard.count > 0) {
                //         stackClone.push(currentCard);
                //     }
                //     this.currentStack[i].count = 0;
                // }
                // this.stackHistory.unshift(stackClone);
                // this.drawStack = this.stackHistory[0];
                for (let i = 0; i < this.drawStack.length; i++) {
                    this.drawStack[i].inDrawPile = this.currentStack[i].inDiscardPile;
                    this.currentStack[i].inDiscardPile = 0;
                }
                this.undoEpidemicTracker = this.dataCity
                this.dataCity = "";
            },

            // undoEpidemic() {
            //     // this.currentStack = [];
            //     // let previousStack = this.stackHistory[1];
            //     // for (let i = 0; i < this.drawStack.length; i++) {
            //     //     //take each card from the drawStack and put it into the currentStack (discard pile)
            //     //     const card = this.drawStack[i]
            //     //     const currentCard = Object.assign({}, card);
            //     //     this.currentStack.push(currentCard);
            //     //     //for each of these cards, go to stackHistory and update the numbers
            //     //     for (let j = 0; j < previousStack.length; j++) {
            //     //         if (currentCard.name == previousStack[j].name) {
            //     //             previousStack[j].count++;
            //     //         }
            //     //     }
            //     // }
            //     // this.stackHistory.shift();
            //     // this.drawStack = this.stackHistory[0]
            //     for (let i = 0; i < this.drawStack.length; i++) {
            //         if (this.drawStack[i].name == this.undoEpidemicTracker) {

            //         }
            //         this.drawStack[i].inDrawPile = this.currentStack[i].inDiscardPile;
            //         this.currentStack[i].inDiscardPile = 0;
            //     }
            //     return
            // },

            percent(count, arr) {
                let amount = 0;
                for (let i = 0; i < arr.length; i++) {
                    amount += this.drawStack[i].inDrawPile
                }

                function orPercent(c, n, a) {
                    if (n === 0) {
                        return 0
                    } else {
                        return ((c / (a - (n - 1))) + orPercent(c, (n - 1), a))
                    }
                }

                function andPercent(c, n, a) {
                    if (n === 0) {
                        return 1
                    } else {
                        return (((c - (n - 1)) / (a - (n - 1))) * andPercent(c, n - 1, a))
                    }
                }


                return Math.round(100 * (andPercent(count, this.infectionRate, amount) + orPercent(count, this.infectionRate, amount)))
            },

            currentStackNames() {
                let stackNames = [];
                for (let i = 0; i < this.currentStack.length; i++) {
                    if (this.currentStack[i].count >= 1) {
                        stackNames.push(this.currentStack[i].name);
                    }
                }
                return stackNames;
            }
        }
    }
</script>