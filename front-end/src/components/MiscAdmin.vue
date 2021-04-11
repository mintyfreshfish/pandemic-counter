<template>
    <div>
        <div>
            <h2>Other:</h2>
            <p>Month: {{month}}</p>
            <b-form-select v-model="month" :options="typeOptions"></b-form-select>
            <p>Edit/Delete:</p>
            <button @click="editMonth()">Edit</button>
            <button @click="uploadMonth()">Add</button>
            <p>Background Image:</p>
            <img v-if="addItem" :src="addItem.image">
            <div class="form">
                <input type="file" name="photo" @change="fileChanged">
                <button @click="uploadImg">Upload</button>
            </div>
            <div class="upload" v-if="findItem">
                <img :src="findItem.path" />
            </div>
            <button @click="uploadImg()">Add</button>
        </div>
        <p>Edit/Delete:</p>
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'MiscAdmin',
        data() {
            return {
                stack: [],
                month: "",
                imagePath: "",
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
                }, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            totalObjectives() {
                let m = this.month;
                if (m == "January") {
                    return 2
                } else if (m == "February") {
                    return 2
                } else if (m == "March") {
                    return 3
                } else if (m == "April") {
                    return 3
                } else if (m == "May") {
                    return 3
                } else if (m == "June") {
                    return 3
                } else if (m == "July") {
                    return 3
                } else if (m == "August") {
                    return 3
                } else if (m == "September") {
                    return 3
                } else if (m == "October") {
                    return 2
                } else if (m == "November") {
                    return 1
                } else if (m == "December") {
                    return 1
                } else {
                    return 0
                }
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/misc");
                    this.stack = response.data;
                    for (let i = 0; i < response.data.length; i++) {
                        if (response.data[i].title == "month") {
                            this.month = response.data[i].body
                        }
                    }
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
            },
            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async uploadMonth() {
                try {
                    //check for validity: must have name and color and cannot already exist in the stack
                    for (let i = 0; i < this.stack.length; i++) {
                        if (this.stack[i].title == "month") {
                            alert("you have already uploaded a month");
                            return;
                        }
                    }
                    let r2 = await axios.post('/api/misc', {
                        title: "month",
                        body: this.month
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                    //reset variables
                    // this.resetItems();
                    this.getStack();
                } catch (error) {
                    console.log(error);
                }

            },
            async uploadImg() {
                for (let i = 0; i < this.stack.length; i++) {
                    if (this.stack[i].title == "background") {
                        alert("you have already uploaded a background");
                        return;
                    }
                }
                try {
                    const formData = new FormData();
                    formData.append('photo', this.file)
                    let r1 = await axios.post('/api/photos', formData);
                    const path = r1.data.path
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/misc', {
                        title: "background",
                        body: path
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
                    await axios.delete(`/api/misc/${item._id}`);
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(b) {
                try {
                    let photoPath = b.path
                    if (this.file != null) {
                        const formData = new FormData();
                        formData.append('photo', this.file)
                        let r1 = await axios.post('/api/photos', formData);
                        photoPath = r1.data.path
                    }
                    await axios.put("/api/misc/" + b._id, {
                        title: "background",
                        path: photoPath,
                    });
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error)
                }
            },

            async editMonth() {
                try {
                    let m = undefined;
                    for (let i = 0; i < this.stack.length; i++) {
                        if (this.stack[i].title == "month") {
                            m = this.stack[i];
                            break;
                        }
                    }
                    await axios.put("/api/misc/" + m._id, {
                        title: "month",
                        body: this.month,
                    });
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error)
                }
            },
        },
    }
</script>

<style scoped language="scss">
    img {
        width: 100px;
    }
</style>