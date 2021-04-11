<template>
    <div>
        <div>
            <h2>Objectives</h2>
            <p>Add New:</p>
            <input v-model="objective" placeholder="objective">
<span>mandatory</span>
<b-form-select v-model="mandatory" :options="boolOptions"></b-form-select>            
            <button @click="upload()">Add</button>
        </div>
        <p>Edit/Delete:</p>
        <div v-for="o in objectives" :key="o.id" @click="selectItem(o)" @dblclick="resetItems()">
            <button>{{o.objective}}</button>
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
                objective: "",
                mandatory: "",
                boolOptions: ['true', 'false'],
            }
        },
        created() {
            this.getStack();
        },
        computed: {
            objectives() {
                let stack = this.stack.filter(o => o.objective.toLowerCase().startsWith(this.objective.toLowerCase()));
                return stack.sort((a, b) => a.objective > b.objective);
            },
        },
        methods: {
            async getStack() {
                try {
                    let response = await axios.get("/api/objectives");
                    this.stack = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            selectItem(item) {
                // this.findTitle = "";
                this.findItem = item;
                this.mandatory = item.mandatory;
                this.objective = item.objective;
            },
            resetItems() {
                this.findItem = null;
                this.objective = "";
                this.mandatory = false;
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
                    if (this.objective == "") {
                        alert("invalid objective")
                        return
                    } 
                    let r2 = await axios.post('/api/objectives', {
                        objective: this.objective,
                        mandatory: this.mandatory,
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
                    await axios.delete(`/api/objectives/${item._id}`);
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
                    await axios.put("/api/objectives/" + obj._id, {
                        objective: this.objective,
                        mandatory: this.mandatory,
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
    height: 100px;
}
</style>