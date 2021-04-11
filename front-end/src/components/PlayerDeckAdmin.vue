<template>
    <div>
        <div>
            <h2>Player Deck</h2>
            <p>Add New:</p>
            <span>name</span>
            <input v-model="cardName" placeholder="Name">
            <span>type</span>
            <b-form-select v-model="cardType" :options="typeOptions"></b-form-select>
            <span>count</span>
            <input v-model="cardCount" placeholder="Count">
            <span>color</span>
            <b-form-select v-model="cardColor" :options="colorOptions"></b-form-select>
            <span>Special</span>
            <input type="textarea" v-model="cardSpecial" placeholder="Other">
            <img v-if="addItem" :src="addItem.image">
            <div class="form">
                <input type="file" name="photo" @change="fileChanged">
                <button @click="upload">Upload</button>
            <span><input type="checkbox" v-model="changeImage">change image</span>
            </div>
            <div class="upload" v-if="findItem">
                <img :src="findItem.path" />
            </div>
            <button @click="upload()">Add</button>
        </div>
        <p>Edit/Delete:</p>
        <div v-for="c in cards" :key="c.id" @click="selectItem(c)" @dblclick="resetItems()">
            <button>{{c.name}} - {{c.type}}<span v-if="c.special != '' && c.type == 'city'">*</span></button>
        </div>
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'PlayerDeckAdmin',
        data() {
            return {
                stack: [],
                cardName: "",
                cardCount: 0,
                cardColor: "",
                cardType: "",
                cardSpecial: "",
                findItem: null,
                addItem: null,
                typeOptions: [{
                    text: 'Select One',
                    value: null
                }, 'city', 'event', 'epidemic', 'other'],
                colorOptions: [{
                    text: 'Select One',
                    value: null
                }, 'yellow', 'blue', 'black', 'red', 'other'],
                changeImage: false,
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            cards() {
                let stack = this.stack.filter(card => card.name.toLowerCase().startsWith(this.cardName.toLowerCase()));
                return stack.sort((a, b) => a.name > b.name);
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/cards");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            selectItem(item) {
                // this.findTitle = "";
                this.findItem = item;
                this.cardName = item.name;
                this.cardCount = item.count;
                this.cardColor = item.color;
                this.cardType = item.type;
                this.cardSpecial = item.special;
            },
            resetItems() {
                this.findItem = null;
                this.cardName = "";
                this.cardCount = 0;
                this.cardColor = "";
                this.cardType = "";
                this.cardSpecial = "";
                this.addItem = null;
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async upload() {
                try {
                    console.log(this.stack.indexOf(this.dataName));
                    //check for validity: must have name and color and cannot already exist in the stack
                    if (this.dataName == "" || this.stack.indexOf(this.dataName) != -1) {
                        alert("invalid city")
                        return;
                    }
                    let photoPath = ""
                    if (this.file != null) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    console.log("moving to r2");
                    if (this.type == 'city' && this.special != "") {
                        this.type = "city*";
                    }
                    let r2 = await axios.post('/api/cards', {
                        type: this.cardType,
                        name: this.cardName,
                        count: this.cardCount,
                        path: photoPath,
                        special: this.cardSpecial,
                        color: this.cardColor
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                    //reset variables
                    this.resetItems();
                    this.getStack();
                } catch (error) {
                    console.log(error);
                }

            },
            async deleteItem(item) {
                try {
                    await axios.delete(`/api/cards/${item._id}`);
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(card) {
                try {
                    if (this.type == 'city' && this.special != "") {
                        this.type = "city*";
                    }
                    let photoPath = card.path
                    if (this.file != null && this.changeImage==true) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    await axios.put("/api/cards/" + card._id, {
                        type: this.cardType,
                        name: this.cardName,
                        count: this.cardCount,
                        special: this.cardSpecial,
                        color: this.cardColor,
                        path: photoPath
                    });
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error)
                }
            }
        },
    }
</script>

<style scoped language="scss">
    img {
        width: 100px;
    }
</style>