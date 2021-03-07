<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Name:" label-for="input-1" description="city name">
                <b-form-input id="input-1" v-model="dataName" type="email" placeholder="city name" required></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Color:" label-for="input-3">
                <b-form-select id="input-3" v-model="dataName" :options="colors" required></b-form-select>
            </b-form-group>


            <b-form-group id="input-group-2" label="special" label-for="input-2">
                <b-form-input id="input-2" v-model="dataSpecial" placeholder="anything special?" required></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    // @ is an alias to /src
    import axios from 'axios';
    
    export default {
        name: 'Form',
        data() {
            return {
                addItem: null,
                dataName: '',
                dataCount: 4,
                dataColor: null,
                dataSpecial: '',
                colors: [{ text: 'Select One', value: null }, 'Blue', 'Gray', 'Yellow', 'Red'],
                show: true
            }
        },
        components: {
            Form
        },

        methods: {
            onSubmit(event) {
                this.upload();
            },

            onReset(event) {
                this.dataName='';
                this.dataColor=null;
                this.dataSpecial='';
                this.show = false
                this.$nextTick(() => {
                this.show = true
                })
            },
            async upload() {
                try {
                    console.log("moving to r2");
                    let r2 = await axios.post('/api/items', {
                        name: this.dataName,
                        count: this.dataCount,
                        color: this.dataColor,
                        special: this.dataSpecial,
                    });
                    console.log("assigned r2");
                    this.addItem = r2.data;
                    console.log("added item");
                    this.getStack();
                } catch (error) {
                    console.log(error);
                }

            },

            async getStack() {
                try {
                    let response = await axios.get("/api/items");
                    this.stack = response.data;
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
                    currentCard.count = 0;
                    this.currentStack.push(currentCard);
                }
                this.stackHistory.push(cloneDeck);
                this.drawStack = this.stackHistory[0];
                //build distinct
                for (let i = 0; i < this.stack.length; i++) {
                    this.distinctNames.push(this.stack.name)
                }
                return true;
            },
        },
    }
</script>