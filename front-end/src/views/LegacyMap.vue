<template>
    <div id="gameboard">
        <div id="adminBar">
            <div class="row">
                <div class="col">
                    <div class="add">
                        <b-button id="modbtnAddChar" class="modalButton bg-success shadow-none border-success rounded-0" v-b-modal.modal-addChar>Add Character!</b-button>
                        <b-modal id="modal-addChar" title="Add Character!" @show="resetModal" @hidden="resetModal">
                            <b-form-group id="input-group-name" label="Name:" label-for="input-name" description="">
                                <b-form-input class="mt-2 mb-3" id="input-name" v-model="dataName" placeholder="" required></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-origin" label="Origin:" label-for="input-origin" description="">
                                <b-form-input class="mt-2 mb-3" id="input-origin" v-model="dataOrigin" placeholder="" required></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-type" label="Pawn Color:" label-for="input-type">
                                <b-form-select class="mt-2 mb-3" id="input-type" v-model="dataColor" :options="colors" required></b-form-select>
                            </b-form-group>
                            <b-form-group id="input-group-player" label="Player:" label-for="input-player">
                                <b-form-input class="mt-2 mb-3" id="input-player" v-model="dataPlayer" required></b-form-input>
                            </b-form-group>
                            <div class="form">
                                <input type="file" name="photo" @change="fileChanged">
                                <button @click="upload">Upload</button>
                            </div>
                            <div class="upload" v-if="addItem">
                                <img :src="addItem.path" />
                            </div>
                            <b-button v-b-modal="'modal-addChar'" @click="upload()" variant="primary">Submit</b-button>
                        </b-modal>
                    </div>
                    <b-button id="modbtn2" class="modalButton bg-primary shadow-none border-primary rounded-0" v-b-modal.modal-2>Card Admin</b-button>

                    <b-modal hide-footer id="modal-2" title="Card Admin">
                        <div class="form">
                            <b-form-group id="input-group-type" label="Type:" label-for="input-type">
                                <b-form-select class="mt-2 mb-3" id="input-type" v-model="dataKind" :options="cardkind" required></b-form-select>
                            </b-form-group>

                            <b-form-group id="input-group-1" label="Name:" label-for="input-1" description="">
                                <b-form-input class="mt-2 mb-3" id="input-1" v-model="dataName" placeholder="" required></b-form-input>
                            </b-form-group>

                            <b-form-group class="" id="input-group-4" label="Amount" label-for="input-4">
                                <b-form-input class="mt-2 mb-3" id="input-4" v-model="dataCount" :options="numbers" required></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-3" label="Color:" label-for="input-3">
                                <b-form-select class="mt-2 mb-3" id="input-3" v-model="dataColor" :options="cityColors" required></b-form-select>
                            </b-form-group>

                            <b-form-group id="input-group-2" label="Special:" label-for="input-2">
                                <b-form-input class="mt-2 mb-3" id="input-2" v-model="dataSpecial" placeholder=""></b-form-input>
                            </b-form-group>

                            <div class="form">
                                <input type="file" name="photo" @change="fileChanged">
                                <button @click="upload">Upload</button>
                            </div>
                            <div class="upload" v-if="addItem">
                                <img :src="addItem.path" />
                            </div>

                            <b-button v-b-modal="'modal-2'" @click="uploadCards()" variant="primary">Submit</b-button>
                        </div>

                        <div class="form">
                            <h2>Delete</h2>

                            <b-form-group class="" id="input-group-7" label="city to delete:" label-for="input-7">
                                <b-form-select class="mt-2 mb-3" id="input-7" v-model="dataName" :options="distinctNames" required></b-form-select>
                            </b-form-group>

                            <b-button class="mr-4" variant="danger" @click="deleteCity()">Delete</b-button>
                        </div>
                    </b-modal>
                    <div class="change">
                        <b-button id="modbtnChangeChar" class="modalButton bg-success shadow-none border-success rounded-0" v-b-modal.modal-changeChar>Change Character!</b-button>
                        <b-modal id="modal-changeChar" title="Change Character!">
                            <div v-for="c in characters" :key="c.id" @click="selectItem(c)">{{c.name}}</div>
                            <b-form-group id="input-group-origin" label="Origin:" label-for="input-origin" description="">
                                <b-form-input class="mt-2 mb-3" id="input-origin" v-model="dataOrigin" placeholder=""></b-form-input>
                            </b-form-group>
                            <b-form-group id="input-group-type" label="Pawn Color:" label-for="input-type">
                                <b-form-select class="mt-2 mb-3" id="input-type" v-model="dataColor" :options="colors"></b-form-select>
                            </b-form-group>
                            <b-form-group id="input-group-player" label="Player:" label-for="input-player">
                                <b-form-input class="mt-2 mb-3" id="input-player" v-model="dataPlayer"></b-form-input>
                            </b-form-group>
                            <b-button v-b-modal="'modal-changeChar'" @click="changeChar()" variant="primary">Submit</b-button>
                        </b-modal>
                    </div>
                </div>
                <div class="charList  col" v-for="c in characters" :key="c.id">
                    <div class="drawList col" v-if="drawShow">
                        <b-form-select v-show="drawShow" v-model="dataCity" :options="drawChoice"></b-form-select>
                        <button @click="draw(c)">Draw!</button>
                    </div>
                    <div class="charImg">
                        <button class="drawBtn" @click="drawShow = true">draw</button>
                        <img id="imgid" class="charImg" :src="c.image">
                        <div class="wrapCards">
                            <div class="cardHand">
                                <div v-for="d in c.hand" :key=d.id>
                                    <button @dblclick="playCard(d,c)" class="playCard"><img class="cardInHand" :src="d.path" /></button>
                                    <button @click="playCard(d,c)">Play!</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>









        <div id="worldmap">
            <button v-touch:tap="setPawns">Reset Pawns</button>
            <button v-touch:tap="showPawns">Show Pawns</button>
            <h2 v-if="activeCity != null">{{activeCity.name}}: Supply
                <b-form-spinbutton id="supplyCubeSpin" v-model="dataSupply" min="1" max="10" inline vertical></b-form-spinbutton>
                Plague
                <b-form-spinbutton id="plagueSpin" v-model="dataPlague" min="1" max="10" inline vertical></b-form-spinbutton>
                Population
                <b-form-spinbutton id="popSpin" v-model="dataPopulation" min="1" max="10" inline vertical></b-form-spinbutton>
                Supply Center
                <b-form-select :value="dataCenter" :options="boolOptions"></b-form-select>
                <b-button variant="primary" @click="editCity(activeCity)">Save</b-button>
                <b-button variant="primary" @click="moveIt()">Move!</b-button>
            </h2>
            <div v-for="city in deck.data" :key="city.id">
                <div class="city" :class="city.tag" v-b-tooltip.hover.right="city.name">
                    <span v-touch:tap="pawnHandler" id="pink" class="pawn hidden unfocus"></span>
                    <span v-touch:tap="pawnHandler" id="white" class="pawn hidden unfocus"></span>
                    <span v-touch:tap="pawnHandler" id="brown" class="pawn hidden unfocus"></span>
                    <span v-touch:tap="pawnHandler" id="blue" class="pawn hidden unfocus"></span>
                    <div class="bk-gray">
                        <p id="supplyCubes" class="quicklook">{{city.supplyCubes}}</p>
                        <p id="plagueCubes" class="quicklook">{{city.plagueCubes}}</p>
                        <p id="population" class="quicklook">{{city.population}}</p>
                    </div>
                    <h2 @click="changeActiveCity(city)" @dblclick="adjust(c)" class="cityName">{{city.tag}}</h2>
                    <span class="supplyCenter hidden"></span>
                </div>
            </div>
            <!-- Havens -->
            <!-- <div id="jibwalter" class="city haven">
                <span v-touch:tap="pawnHandler" id="pinkP" class="pawn show unfocus"></span>
                <span v-touch:tap="pawnHandler" id="whiteP" class="pawn show unfocus"></span>
                <span v-touch:tap="pawnHandler" id="brownP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="blueP" class="pawn hidden unfocus"></span>
                <div class="bk-gray">
                    <p id="supplyCubes" class="quicklook">N</p>
                    <p id="plagueCubes" class="quicklook">N</p>
                    <p id="population" class="quicklook">N</p>
                </div>
                <h2 @click="cityHandler($event)" v-touch:touchhold="supplyHandler" class="cityName havenName">J</h2>
                <span class="supplyCenter hidden"></span>
            </div>

            <div id="crab-shack" class="city haven">
                <span v-touch:tap="pawnHandler" id="pinkP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="whiteP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="brownP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="blueP" class="pawn show unfocus"></span>
                <div class="bk-gray">
                    <p id="supplyCubes" class="quicklook">N</p>
                    <p id="plagueCubes" class="quicklook">N</p>
                    <p id="population" class="quicklook">N</p>
                </div>
                <h2 @click="cityHandler($event)" v-touch:touchhold="supplyHandler" class="cityName havenName">CS</h2>
                <span class="supplyCenter hidden"></span>
            </div>

            <div id="zanzabar" class="city haven">
                <span v-touch:tap="pawnHandler" id="pinkP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="whiteP" class="pawn hidden unfocus"></span>
                <span v-touch:tap="pawnHandler" id="brownP" class="pawn show unfocus"></span>
                <span v-touch:tap="pawnHandler" id="blueP" class="pawn hidden unfocus"></span>
                <div class="bk-gray">
                    <p id="supplyCubes" class="quicklook">N</p>
                    <p id="plagueCubes" class="quicklook">N</p>
                    <p id="population" class="quicklook">N</p>
                </div>
                <h2 @click="cityHandler($event)" v-touch:touchhold="supplyHandler" class="cityName havenName">Z</h2>
                <span class="supplyCenter hidden"></span>
            </div> -->
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'LegacyMap',
        data() {
            return {
                deck: [],
                cards: [],
                activePawn: "",
                activeCity: null,
                activeCharacter: null,
                origin: null,
                characters: [],
                characterChoice: [{
                    text: 'Select One',
                    value: null
                }],
                drawChoice: [{
                    text: 'Select One',
                    value: null
                }],
                dataName: '',
                dataCity: '',
                dataColor: '',
                dataCount: 0,
                dataSpecial: '',
                dataAbilities: [],
                dataOrigin: '',
                dataPlayer: '',
                dataLocation: '',
                dataSupply: '',
                dataPlague: '',
                dataPopulation: '',
                dataCenter: false,
                boolOptions: ['true', 'false'],
                colors: [{
                    text: 'Select One',
                    value: null
                }, 'white', 'brown', 'blue', 'pink'],
                cityColors: [{
                    text: 'Select One',
                    value: null
                }, 'yellow', 'blue', 'black'],
                cardkind: [{
                    text: 'Select One',
                    value: null
                }, 'city', 'event', 'epidemic', 'other'],
                findName: "",
                findChar: null,
                drawShow: false,
                showCubes: false,
            }
        },
        created() {
            this.getStack(); //retrieve from database and assign to items[]
            this.getCharacters();
            this.getCards();
        },
        methods: {

            pawnHandler: function(event) {
                console.log(event)
                // console.log(event.target);

                for (let i = 0; i < 4; i++) {
                    event.path[1].childNodes[i].className = event.path[1].childNodes[i].className.replace("infocus", "unfocus")
                    // event.target.offsetParent.childNodes[i].attributes.class.nodeValue = event.target.offsetParent.childNodes[i].attributes.class.nodeValue.replace("infocus", "unfocus")
                    // console.log(event.target.offsetParent.childNodes[i])
                }
                event.target.className = event.target.className.replace("unfocus", "infocus")
                this.origin = event.target;
                this.activePawn = event.target.id;
                //assign active character
                for (let i = 0; i < this.characters.length; i++) {
                    if (this.activePawn == this.characters[i].color) {
                        this.activeCharacter = this.characters[i]
                    }
                }
            },

            setPawns: function(event) {
                console.log(event);
                let e = event.path[0].nextElementSibling;
                let x = 0;
                let origin = '';
                while (true && x < 50) {
                    if (e.innerHTML.includes("city CS") || e.innerHTML.includes("city JW") || e.innerHTML.includes("city Z")) {
                        if (e.innerHTML.includes("city CS")) {
                            origin = "Crab Shack"
                        } else if (e.innerHTML.includes("city JW")) {
                            origin = "Jib-Walter"
                        } else if (e.innerHTML.includes("city Z")) {
                            origin = "Zanzibar"
                        }
                        for (let i = 0; i < e.childNodes[0].childNodes.length; i++) {
                            for (let j = 0; j < this.characters.length; j++) {
                                if (this.characters[j].origin == origin && e.childNodes[0].childNodes[i].id.includes(this.characters[j].color)) {
                                    e.childNodes[0].childNodes[i].className = e.childNodes[0].childNodes[i].className.replace("hidden", "show");
                                }
                            }
                        }
                    }
                    e = e.nextElementSibling;
                    x++;
                }
            },

            showPawns: function(event) {
                console.log(event);
                const constE = event.path[0].nextElementSibling;
                let e = event.path[0].nextElementSibling;
                let x = 0;
                for (let i = 0; i < this.characters.length; i++) {
                    console.log(e);
                    if (this.characters[i].location == undefined) {
                        let place = this.characters[i].origin;
                        if (place == "Crab Shack") {
                            this.characters[i].location = "CS"
                        } else if (place == "Zanzibar") {
                            this.characters[i].location = "Z"
                        } else {
                            this.characters[i].location = "JW"
                        }
                    }
                        console.log(`finding location for ${this.characters[i].name} who is in ${this.characters[i].location}`)
                    // console.log(`checking ${this.characters[i].location} against ${e.innerHTML}`)
                    while (true && x < 50) {
                        try {
                                console.log(`found ${this.characters[i].location}`)
                                for (let k = 0; k < e.childNodes[0].childNodes.length; k++) {
                                    if (e.childNodes[0].className == (`city ${this.characters[i].location}`))
                                    if (e.childNodes[0].childNodes[k].id.includes(this.characters[i].color)) {
                                        e.childNodes[0].childNodes[k].className = e.childNodes[0].childNodes[k].className.replace("hidden", "show");
                                    }
                            }
                            e = e.nextElementSibling;
                        } catch (error) {
                            console.log(error)
                        }
                            x++;
                    }
                    e = constE;
                    x = 0;
                }
            },

            cityHandler(event) {
                console.log(this.origin)
                for (let i = 0; i < event.path[1].childNodes.length; i++) { // loop through each child pawn
                    if (event.path[1].childNodes[i].id == this.activePawn) { // if we find the active pawn

                        if (event.path[1].childNodes[i].className.includes("hidden")) { // show the pawn
                            event.path[1].childNodes[i].className = event.path[1].childNodes[i].className.replace("hidden", "show");
                            this.origin.attributes.class.nodeValue = this.origin.attributes.class.nodeValue.replace("show", "hidden")
                            this.activePawn = "bubbles";
                            return;

                        } else if (event.path[1].childNodes[i].className.includes("show")) { // hide the pawn
                            event.path[1].childNodes[i].className = event.path[1].childNodes[i].className.replace("show", "hidden");
                        }
                    }
                }
            },

            moveIt() {
                this.activeCharacter.location = this.activeCity.tag;
                this.editChar(this.activeCharacter)
                console.log(`${this.activeCharacter.name} is now in ${this.activeCity.tag}`)
            },

            changeActiveCity(city) {
                this.activeCity = city;
                this.dataSupply = this.activeCity.supplyCubes;
                this.dataPlague = this.activeCity.plagueCubes;
                this.dataCenter = this.activeCity.supplyCenter;
                this.dataPopulation = this.activeCity.population;
            },

            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    this.deck = response;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            async getCharacters() {
                try {
                    console.log("getting characters")
                    let response = await axios.get("/api/characters");
                    for (let i = 0; i < response.data.length; i++) {
                        this.characters.push(response.data[i])
                        this.characterChoice.push(response.data[i].name)
                    }
                    console.log(this.characters);
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            async getCards() {
                try {
                    let response = await axios.get("/api/cards");
                    this.cards = response.data;
                    this.drawChoice = [...new Set(response.data.map(x => x.name))];
                    console.log(this.drawChoice);
                } catch (error) {
                    console.log(error);
                }
                return true;
            },

            fileChanged(event) {
                this.file = event.target.files[0]
            },

            selectItem(character) {
                this.findName = "";
                this.findChar = character;
            },

            async upload() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file)
                    let r1 = await axios.post('/api/photos', formData);
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/characters', {
                        name: this.dataName,
                        exposure: 0,
                        color: this.dataColor,
                        abilities: this.dataAbilities,
                        hand: [],
                        origin: this.dataOrigin,
                        player: this.dataPlayer,
                        image: r1.data.path
                    });
                    console.log("assigned r2");
                    this.addCharacter = r2.data;
                    console.log("added item");
                } catch (error) {
                    console.log(error);
                }
                this.dataName = '';
                this.dataColor = '';
                this.dataOrigin = '';
                this.dataPlayer = '';
            },

            async uploadCards() {
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file)
                    let r1 = await axios.post('/api/photos', formData);
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/cards', {
                        type: this.dataKind,
                        name: this.dataName,
                        count: this.dataCount,
                        color: this.dataColor,
                        path: r1.data.path,
                        special: this.dataSpecial
                    });
                    console.log("assigned r2");
                    this.addCharacter = r2.data;
                    console.log("added item");
                } catch (error) {
                    console.log(error);
                }
                this.dataType = '';
                this.dataName = '';
                this.dataCount = '';
                this.dataSpecial = '';
            },

            async editCharacter(character) {
                try {
                    await axios.put("/api/characters/" + character._id, {
                        name: this.findChar.name,
                        origin: this.findChar.origin,
                        color: this.findChar.color,
                        player: this.findChar.player
                    });
                    this.findItem = null;
                    // this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            async editCity(item) {
                try {
                    await axios.put("/api/items/" + item._id, {
                        name: this.activeCity.name,
                        count: this.activeCity.count,
                        color: this.activeCity.color,
                        tag: this.activeCity.tag,
                        supplyCubes: this.dataSupply,
                        plagueCubes: this.dataPlague,
                        supplyCenter: this.dataCenter,
                        special: this.activeCity.special,
                        position: this.activeCity.position,
                        population: this.dataPopulation,
                        path: this.activeCity.path,
                    });
                    this.findItem = null;
                    // this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            draw(character) {
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.dataCity == this.cards[i].name) {
                        character.hand.push(this.cards[i])
                        this.editChar(character)
                        this.dataCity = '';
                        this.drawShow = false;
                        return
                    }
                }
            },

            async editChar(character) {
                try {
                    await axios.put("/api/characters/" + character._id, {
                        name: character.name,
                        exposure: character.exposure,
                        color: character.color,
                        abilities: character.abilities,
                        hand: character.hand,
                        origin: character.origin,
                        image: character.image,
                        player: character.player,
                        location: character.location,
                    });
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },

            async playCard(card, char) {
                char.hand.splice(char.hand.indexOf(card), 1)
                this.editChar(char);
                return;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .hidden {
        visibility: hidden;
    }

    .show {
        visibility: visible;
    }

    .infocus {
        border: 1px solid yellow;
    }

    .unfocus {
        border: none;
    }

    .city {
        height: 40px;
        width: 40px;
        background-color: black;
        border-radius: 10px;
        display: inline-block;
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .haven {
        background-color: rgb(239, 166, 147);
        color: black;
        border-radius: 50%;
    }

    .quicklook {
        position: absolute;
        right: 0px;
        color: white;
        display: block;
        bottom: 10px;

    }

    .bg-round {
        height: 15px;
        width: 15px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        bottom: 60px;
    }

    .cityName {
        text-align: center;
        font-size: 30px;
        position: absolute;
        left: 5px;
        top: 0px;
    }

    .drawBtn {
        position: absolute;
        right: 320px;
        width: 150px;
        height: 150px;
        bottom: -80px;
        background-color: rgba(0, 0, 0, 0);
        color: rgba(0, 0, 0, 0);
        z-index: 2;
    }

    .drawBtn:hover {
        background-color: rgba(0, 0, 0, 0.2)
    }

    .playCard {
        border: none;
        background-color: rgba(0, 0, 0, 0);
        z-index: 2;
    }

    .playCard:hover {
        background-color: yellow;
    }

    .playCard:focus {
        background-color: yellow;
    }

    @mixin blue {
        background-color: #0C3B65;
        color: white;
    }

    @mixin gray {
        background-color: rgb(237, 241, 253);
        color: black;
    }

    @mixin yellow {
        background-color: #DA9200;
        color: white;
    }

    @mixin pink {
        background-color: rgb(239, 166, 147);
        color: black;
    }

    .pawn {
        height: 10px;
        width: 10px;
        background-color: #bbb;
        border-radius: 50%;
        display: inline-block;
        position: absolute;
        top: -12px;
    }

    .supplyCenter {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid green;
        left: -10px;
    }

    .bk-gray {
        position: absolute;
        right: -10px;
        top: -2px;
        background-color: gray;
        height: 45px;
        width: 13px;
    }

    .drawList {
        z-index: 2;
        // background-color: white;
        color: black;
        position: absolute;
        width: 125px;
        right: 350px;
    }

    .charList {
        position: relative;
        display: inline-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: flex-end;
        align-content: flex-end;
        padding: 0px;
        width: 300px;
    }

    .charImg {
        width: 500px;
        position: fixed;
    }

    .charImg:hover {
        z-index: 1;
    }

    .wrapCards {
        position: absolute;
        top: 200px;
    }

    .cardHand {
        position: relative;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: flex-end;
        align-content: flex-end;
        z-index: 2;
    }

    .cardInHand {
        width: 100px;
        z-index: 2;
    }

    .cardInHand:hover {
        background-color: rgba(255, 255, 255, 0.2)
    }

    #supplyCubes {
        top: -8px;
    }

    #plagueCubes {
        top: 7px;
    }

    #population {
        top: 22px;
    }

    #worldmap {
        background-image: url('../assets/map.jpg');
        height: 1500px;
        width: 2300px;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 100px;
        left: 0px;
    }

    .W {
        left: 410px;
        top: 350px;
        @include blue;
    }

    .C {
        left: 1150px;
        top: 370px;
        @include gray
    }

    .L {
        left: 980px;
        top: 570px;
        @include yellow;
    }

    .Lo {
        left: 920px;
        top: 220px;
        @include blue;
    }

    .Jk {
        left: 360px;
        top: 400px;
        @include yellow;
    }

    .Tr {
        left: 1000px;
        top: 360px;
        @include gray
    }

    .SP {
        left: 600px;
        top: 810px;
        @include yellow;
    }

    .I {
        left: 1080px;
        top: 300px;
        @include gray
    }

    .NY {
        left: 480px;
        top: 280px;
        @include blue;
    }

    .Ch {
        left: 350px;
        top: 280px;
        @include blue;
    }

    .SF {
        left: 120px;
        top: 290px;
        @include blue;
    }

    .LA {
        left: 160px;
        top: 360px;
        @include yellow;
    }

    .A {
        left: 300px;
        top: 350px;
        @include blue;
    }

    .D {
        left: 230px;
        top: 300px;
        @include blue;
    }

    .Z {
        left: 700px;
        top: 600px;
        @include pink;
        border-radius: 50%;
        border: 1px solid black
    }

    .CS {
        left: 730px;
        top: 250px;
        @include pink;
        border-radius: 50%;
        border: 1px solid black
    }

    .JW {
        left: 920px;
        top: 320px;
        @include pink;
        border-radius: 50%;
        border: 1px solid black
    }

    .haven {
        left: 10px;
        top: 10px;
        border: 1px solid black;
    }

    #pink {
        left: 0px;
        background-color: rgb(213, 147, 131);
    }

    #blue {
        left: 10px;
        background-color: rgb(08, 201, 193);
    }

    #white {
        left: 20px;
        background-color: white;
    }

    #brown {
        left: 30px;
        background-color: rgb(146, 57, 25);
    }

    #imgid {
        position: fixed;
        top: 0px;
    }
</style>