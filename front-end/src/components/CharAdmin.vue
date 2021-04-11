<template>
    <div>
        <div>
            <h2>Characters</h2>
            <p>Add New:</p>
            <span>name</span>
            <input v-model="charName" placeholder="Name">
            <span>origin</span>
            <input v-model="charOrigin" placeholder="Origin">
            <div class="abilities">
                <p>abilities:</p>
                <input v-model="abilities[0]">
                <input v-model="abilities[1]">
                <input v-model="abilities[2]">
                <input v-model="abilities[3]">
                <input v-model="abilities[4]">
            </div>
            <div class="form">
                <input type="file" name="photo" @change="fileChanged">
                <button @click="upload">Upload</button>
                <span><input type="checkbox" v-model="changeImage">change image</span>
            </div>
            <div class="upload" v-if="findItem">
                <img :src="findItem.image" />
            </div>
            <button @click="upload()">Add</button>
        </div>
        <p>Edit/Delete:</p>
        <div v-for="c in chars" :key="c.id" @click="selectItem(c)" @dblclick="resetItems()">
            <button>{{c.name}}</button>
        </div>
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'CharAdmin',
        data() {
            return {
                stack: [],
                charName: "",
                charOrigin: "",
                charImage: "",
                exposure: [],
                abilities: [],
                changeImage: false,
                findItem: null,
                addItem: null,
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            chars() {
                let stack = this.stack.filter(char => char.name.toLowerCase().startsWith(this.charName.toLowerCase()));
                return stack.sort((a, b) => a.name > b.name);
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/characters");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            selectItem(item) {
                // this.findTitle = "";
                this.findItem = item;
                this.charName = item.name;
                this.charOrigin = item.origin;
                this.abilities = item.abilities;
            },
            resetItems() {
                this.findItem = null;
                this.charName = "";
                this.charOrigin = "";
                this.abilities = [];
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            // formValid() {
            //     if (
            //         this.cityName != "" &&
            //         this.cityColor != "" &&
            //         this.cityTag != ""
            //     ) {
            //         return true
            //     }
            //     alert("invalid form");
            //     return false
            // },
            async upload() {
                try {
                    // if (!this.formValid) {
                    //     return;
                    // }
                    console.log(this.stack.indexOf(this.dataName));
                    //check for validity: must have name and color and cannot already exist in the stack
                    if (this.dataName == "" || this.stack.indexOf(this.charName) != -1) {
                        alert("invalid character")
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
                    let r2 = await axios.post('/api/characters', {
                        name: this.charName,
                        origin: this.charOrigin,
                        abilities: this.abilities,
                        image: photoPath
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
                    await axios.delete(`/api/characters/${item._id}`);
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(char) {
                try {
                    // if (!this.formValid)  {
                    //     return;
                    // }
                    let photoPath = char.image
                    if (this.file != null && this.changeImage == true) {
                        console.log("file is not null");
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    console.log(`file is null\nphotopath is ${photoPath}\nabilities size is ${this.abilities.length} \nfile is ${this.file}`)
                    await axios.put("/api/characters/" + char._id, {
                        name: this.charName,
                        origin: this.charOrigin,
                        abilities: this.abilities,
                        image: photoPath
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
        height: 100px;
    }
</style>