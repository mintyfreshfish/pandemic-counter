<template>
    <div>
        <div>
            <h2>Actions</h2>
            <p>Add New:</p>
            <input v-model="title" placeholder="title">
<span>action</span>
            <input v-model="action" placeholder="action">
            <button @click="upload()">Add</button>
        </div>
        <p>Edit/Delete:</p>
        <div v-for="a in actions" :key="a.id" @click="selectItem(a)" @dblclick="resetItems()">
            <button>{{a.title}}</button>
        </div>
        <button @click="editItem(findItem)">Edit</button>
        <button @click="deleteItem(findItem)">Delete</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'ActionAdmin',
        data() {
            return {
                stack: [],
                title: "",
                action: "",
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            actions() {
                let stack = this.stack.filter(ac => ac.title.toLowerCase().startsWith(this.title.toLowerCase()));
                return stack.sort((a, b) => a.title > b.title);
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/actions");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            selectItem(item) {
                // this.findTitle = "";
                this.findItem = item;
                this.title = item.title;
                this.action = item.action;
            },
            resetItems() {
                this.findItem = null;
                this.title = "";
                this.action = "";
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
                    // console.log(this.stack.indexOf(this.dataName));
                    //check for validity: must have name and color and cannot already exist in the stack
                    if (this.action == "" || this.action == undefined || this.title == "" || this.title == undefined) {
                        alert("invalid action")
                        return
                    } 
                    let r2 = await axios.post('/api/actions', {
                        title: this.title,
                        action: this.action,
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
                    await axios.delete(`/api/actions/${item._id}`);
                    this.findItem = null;
                    this.resetItems();
                    this.getStack();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(obj) {
                try {
                    // if (!this.formValid)  {
                    //     return;
                    // }
                    await axios.put("/api/actions/" + obj._id, {
                        title: this.title,
                        action: this.action,
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