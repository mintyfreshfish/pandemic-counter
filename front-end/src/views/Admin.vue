<template>
    <div>
        <InfectionDeckAdmin />
        <!--infection deck-->
        <!-- <div>
            <h2>Infection Deck</h2>
            <p>Add New:</p>
            <input v-model="cityName" placeholder="City Name">
            <input v-model="cityCount" placeholder="Count">
            <input v-model="cityColor" placeholder="Color">
            <input v-model="cityTag" placeholder="Tag">
            <input v-model="cityPopulation" placeholder="population">
            <button @click="addCity">Add</button> -->
        <!-- </div>
        <div v-for="c in cities" :key="c.id">
            <p>{{c.name}} - {{c.tag}}</p>
        </div> -->
<PlayerDeckAdmin />
        <!--player deck-->
        <!-- <div>
            <h2>Player Deck</h2>
            <div v-for="p in playerDeck" :key="p.id">
                <p>{{p.name}}</p>
            </div>
        </div> -->

        <!--characters-->
<CharAdmin />

<!--Actions-->
<ActionAdmin />

        <!--objectives-->
<ObjectiveAdmin />

<MiscAdmin />

<!-- <ActionAdmin /> -->


    </div>
</template>

<script>
    // import axios from 'axios'
    import InfectionDeckAdmin from '../components/InfectionDeckAdmin.vue'
    import PlayerDeckAdmin from '../components/PlayerDeckAdmin.vue'
    import CharAdmin from '../components/CharAdmin.vue'
    import ObjectiveAdmin from '../components/ObjectiveAdmin.vue'
    import ActionAdmin from '../components/ActionAdmin.vue'
    import MiscAdmin from '../components/MiscAdmin.vue'
    export default {
        name: 'Admin',
        components: {
            InfectionDeckAdmin,
            PlayerDeckAdmin,
            CharAdmin,
            ObjectiveAdmin,
            ActionAdmin,
            MiscAdmin,
        },
        // data() {
        //     return {
        //         // activeCity: null,
        //         // activeCard: null,
        //         // activeObjective: null,
        //         stack: [],
        //         characters: [],
        //         playerDeck: [],
        //         objectiveList: [],
        //         cityName: "",
        //         cityCount: 0,
        //         cityColor: "",
        //         cityTag: "",
        //         cityPopulation: 0,
        //         characterName: "",
        //         cardName: "",
        //         objectiveName: "",
        //         findItem: null,
        //         findTitle: "",
        //     }
        // },
        // created() {
        //     this.getStack();
        //     this.getCharacters();
        //     this.getCards();
        // },
        // computed: {
        //     cities() {
        //         let stack = this.stack.filter(city => city.tag.toLowerCase().startsWith(this.cityTag.toLowerCase()));
        //         return stack.sort((a, b) => a.tag > b.tag);
        //     },
        //     // chars() {
        //     //     let characters = this.characters.filter(char => characters.name.toLowerCase().startsWith(this.characterName.toLowerCase()));
        //     //     return characters.sort((a, b) => a.name > b.name);
        //     // },
        //     // cards() {
        //     //     let playerDeck = this.playerDeck.filter(card => playerDeck.name.toLowerCase().startsWith(this.cardName.toLowerCase()));
        //     //     return playerDeck.sort((a, b) => a.name > b.name);
        //     // },
        //     // objectives() {
        //     //     let objectiveList = this.objectiveList.filter(objective => objectiveList.name.toLowerCase().startsWith(this.objectiveName.toLowerCase()));
        //     //     return objectiveList.sort((a, b) => a.name > b.name);
        //     // }
        // },
        // methods: {
        //     //ANCHOR Gets
        //     async getStack() {
        //         try {
        //             let response = await axios.get("/api/items");
        //             this.stack = response.data;
        //         } catch (error) {
        //             console.log(error);
        //         }
        //         return true;
        //     },

        //     async getCharacters() {
        //         try {
        //             // console.log("getting characters")
        //             let response = await axios.get("/api/characters");
        //             this.characters = response.data;
        //         } catch (error) {
        //             console.log(error);
        //         }
        //         return true;
        //     },

        //     async getCards() {
        //         try {
        //             let response = await axios.get("/api/cards");
        //             this.playerDeck = response.data;
        //         } catch (error) {
        //             console.log(error);
        //         }
        //         return true;
        //     },

        //     fileChanged(event) {
        //         this.file = event.target.files[0];
        //     },

        //     selectItem(item) {
        //         this.findTitle = "";
        //         this.findItem = item;
        //     },

        //     async deleteItem(item, db) {
        //         try {
        //             await axios.delete(`/api/${db}/${item._id}`);
        //             this.findItem = null;
        //             //refresh database
        //             if (db == 'items') {
        //                 this.getStack();
        //             } else if (db == "characters") {
        //                 this.getCharacters()
        //             } else if (db == "cards") {
        //                 this.getCards()
        //             }
        //             return true;
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     },

        //     async editCity(city) {
        //         try {
        //             await axios.put("/api/items/" + city._id, {
        //                 name: this.findItem.name,
        //                 count: this.findItem.count,
        //                 color: this.findItem.color,
        //                 tag: this.findItem.tag,
        //                 population: this.findItem.population,
        //             });
        //             this.findItem = null;
        //             this.getStack();
        //             return true;
        //         } catch(error) {
        //             console.log(error)
        //         }
        //     }
        // }
    }
</script>

<style scoped language="scss">

</style>