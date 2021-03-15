<template class="no-margin">
    <div class="home no-margin">

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



    </div>
</template>

<style lang="scss" scoped>
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

    .form {
        margin-bottom: 100px;
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
                infectionRate: 2,
                distinctNames: [{
                    text: 'Select One',
                    value: null
                }],
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
                }, '0', '1', '2', '3', '4','5','6','7','8'],
                kinds: [{
                    text: 'Select One',
                    value: null
                }, 'city', 'haven'],
                showSpecialEvents: false,
                showDiscardPile: false,
            }
        },
        created() {
            this.getStack(); //retrieve from database and assign to itesm[]
        },
        methods: {
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
                    if (this.file != null)
{                    const formData = new FormData();
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
                let total = 0
                for (let i = 0; i < arr.length; i++) {
                    total += arr[i].count
                }
                let percentage = 0;
                for (let i = 0; i < this.infectionRate; i++) {
                    percentage += (count / (total - i))
                    if (percentage > 1) {
                        percentage = 1;
                    }
                }
                return Math.round(100 * percentage);
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