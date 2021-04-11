<template>
    <div>
        <div>
            <h2>Infection Deck</h2>
            <p>Add New:</p>
            <span>name</span>
            <input v-model="cityName" placeholder="City Name">
            <span>count</span>
            <input v-model="cityCount" placeholder="Count">
            <span>color</span>
            <b-form-select v-model="cityColor" :options="colorOptions"></b-form-select>
            <span>tag</span>
            <input v-model="cityTag" placeholder="Tag">
            <span>population</span>
            <input v-model="cityPopulation" placeholder="population">
            <span>xcor</span>
            <input v-model="xcor" placeholder="xcor">
            <span>ycor</span>
            <input v-model="ycor" placeholder="ycor">
            <br>
            <p>special</p>
            <input v-model="special" placeholder="special">
            <span>Supply Center?</span>
            <input type="checkbox" id="checkbox" v-model="supplyCenter">
            <label for="checkbox">{{ supplyCenter }}</label>
            <div class="form">
                <input type="file" name="photo" @change="fileChanged">
                <button @click="upload">Upload</button>
                <span><input type="checkbox" id="picCheck" v-model="picCheck">change image</span>
            </div>
            <div class="upload" v-if="findItem">
                <img :src="findItem.path" />
            </div>
        </div>
        <p>Edit/Delete:</p>
        <div v-for="c in cities" :key="c.id" @click="selectItem(c)" @dblclick="resetItems()">
            <button>{{c.name}} - {{c.tag}}</button>
        </div>
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'InfectionDeckAdmin',
        data() {
            return {
                stack: [],
                cityName: "",
                cityCount: 0,
                cityColor: "",
                cityTag: "",
                cityPopulation: 0,
                supplyCenter: false,
                xcor: 0,
                ycor: 0,
                special: "",
                findItem: null,
                addItem: null,
                colorOptions: [{
                    text: 'Color',
                    value: null
                }, 'yellow', 'blue', 'black', 'red', 'none'],
                picCheck: true,
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            cities() {
                let stack = this.stack.filter(city => city.tag.toLowerCase().startsWith(this.cityTag.toLowerCase()));
                return stack.sort((a, b) => a.tag > b.tag);
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            selectItem(item) {
                // this.findTitle = "";
                this.findItem = item;
                this.cityName = item.name;
                this.cityCount = item.count;
                this.cityColor = item.color;
                this.cityTag = item.tag;
                this.cityPopulation = item.population;
                this.xcor = item.xcor;
                this.ycor = item.ycor;
                this.special = item.special;
            },
            resetItems() {
                this.findItem = null;
                this.cityName = "";
                this.cityCount = 0;
                this.cityColor = "";
                this.cityTag = "";
                this.cityPopulation = 0;
                this.xcor = 0;
                this.ycor = 0;
                this.special = "";
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            formValid() {
                if (
                    this.cityName != "" &&
                    this.cityColor != "" &&
                    this.cityTag != ""
                ) {
                    return true
                }
                alert("invalid form");
                return false
            },
            async upload() {
                try {
                    if (!this.formValid) {
                        return;
                    }
                    console.log(this.stack.indexOf(this.dataName));
                    //check for validity: must have name and color and cannot already exist in the stack
                    if (this.dataName == "" || this.stack.indexOf(this.dataName) != -1) {
                        alert("invalid city")
                        return
                    } else if (this.stack.indexOf(this.dataTag) != -1) {
                        alert("tag taken")
                        return
                    }
                    if (this.special == undefined) {
                        this.special = "";
                    } else {
                        this.special = ": " + this.special
                    }
                    let photoPath = ""
                    if (this.file != null && this.picCheck == true) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/items', {
                        name: this.cityName,
                        count: this.cityCount,
                        color: this.cityColor,
                        tag: this.cityTag,
                        population: this.cityPopulation,
                        supplyCenter: this.supplyCenter,
                        xcor: this.xcor,
                        ycor: this.ycor,
                        special: this.special,
                        path: photoPath
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
                    await axios.delete(`/api/items/${item._id}`);
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(city) {
                try {
                    if (!this.formValid) {
                        return;
                    }
                    if (this.special == undefined || this.special == ": ") {
                        this.special = "";
                    } else if (this.special[0] == ':') {
                        this.special.slice(1)
                        } else {
                        this.special = ": " + this.special
                    }
                    let photoPath = city.path
                    if (this.file != null && this.picCheck == true) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    await axios.put("/api/items/" + city._id, {
                        name: this.cityName,
                        count: this.cityCount,
                        color: this.cityColor,
                        tag: this.cityTag,
                        population: this.cityPopulation,
                        supplyCenter: this.supplyCenter,
                        xcor: this.xcor,
                        ycor: this.ycor,
                        special: this.special,
                        path: photoPath,
                    });
                    this.findItem = null;
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