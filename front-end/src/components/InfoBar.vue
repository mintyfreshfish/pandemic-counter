<template>
    <div class="infoBar">
        <b-row class="title">
            <b-col cols="3">
                <h1>OBJECTIVES: {{totalObjectives}}</h1>
            </b-col>
            <b-col cols="2">
                <p><span>Supply Cubes: </span><span class="gray bold">{{totalSupplyCubes - supplySpent}}/{{totalSupplyCubes}}</span></p>
            </b-col>
            <b-col cols="2">
                <p><span>Plague Cubes: </span><span class="green bold">{{totalPlague - plagueSpent}}/{{totalPlague}}</span></p>
            </b-col>
            <b-col>
                <p><span>Month: </span><span>{{thisMonth}}</span></p>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <div class="objectiveList">
                    <div v-for="obj in objectives" :key=obj.id>
                        <span v-if="obj.objective.includes(2)"><input type="checkbox" :id="obj.objective"></span>
                        <span v-if="obj.objective.includes(3)"><input type="checkbox" :id="obj.objective"><input type="checkbox" :id="obj.objective"></span>
                        <span v-if="obj.objective.includes(4)"><input type="checkbox" :id="obj.objective"><input type="checkbox" :id="obj.objective"><input type="checkbox" :id="obj.objective"></span>
                        <span v-else><input type="checkbox" :id="obj.objective"></span>
                        <label class="objectiveLabel" :for="obj.objective">{{obj.objective}}</label>
                        <span v-if="obj.mandatory == true"> - MANDATORY</span>
                    </div>
                </div>
            </b-col>
            <b-col>
                <div class="objectiveList">
                    <div v-for="obj in objectives2" :key=obj.id>
                        <input type="checkbox" :id="obj.objective">
                        <label class="objectiveLabel" :for="obj.objective">{{obj.objective}}</label>
                        <span v-if="obj.mandatory == true"> - MANDATORY</span>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">
                <h2 class="incidents">Remaining Incidents: {{remainingIncidents}}(ish)</h2>
            </b-col>
            <b-col>
                <button class="actionBtn" @click="toggleShowActions()"><h2>Actions <b-icon-chevron-double-down class="h3 mb-0"></b-icon-chevron-double-down></h2></button>
                
            </b-col>
        </b-row>
        <b-row v-if="showActions">
            <b-col>
                    <div class="actionList">
                        <div v-for="a in actions" :key="a.id">
                            <p><strong>{{a.title.toUpperCase()}}:</strong> {{a.action}}</p>
                        </div>
                    </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios'
import { BIconChevronDoubleDown } from 'bootstrap-vue'
    export default {
        name: 'InfoBar',
        props: ['remainingPlagueCubes', 'spentSupplyCubes', 'thisMonth'],
        components: {
            BIconChevronDoubleDown
        },
        data() {
            return {
                objectives: [],
                objectives2: [],
                totalPlague: 10,
                actions: [],
                showActions: false,
            }
        },
        created() {
            this.getObjectives()
            this.getActions()
        },
        computed: {
            remainingIncidents() {
                return 7 - this.plagueSpent
            },
            supplySpent() {
                return this.spentSupplyCubes
            },
            plagueSpent() {
                return this.remainingPlagueCubes
            },
            totalSupplyCubes() {
                let m = this.thisMonth;
                if(m == "January") {
                    return 36
                }
                else if (m == "February") {
                    return 33
                }
                else if (m == "March") {
                    return 30
                }
                else if (m == "April") {
                    return 27
                }
                else if (m == "May") {
                    return 24
                }
                else if (m == "June") {
                    return 21
                }
                else if (m == "July") {
                    return 18
                }
                else if (m == "August") {
                    return 15
                }
                else if (m == "September") {
                    return 12
                }
                else if (m == "October") {
                    return 8
                }
                else if (m == "November") {
                    return 4
                }
                else if (m == "December") {
                    return 0
                }
                else {
                    return 0
                }
            },
            totalObjectives() {
                let m = this.thisMonth;
                if(m == "January") {
                    return 2
                }
                else if (m == "February") {
                    return 2
                }
                else if (m == "March") {
                    return 3
                }
                else if (m == "April") {
                    return 3
                }
                else if (m == "May") {
                    return 3
                }
                else if (m == "June") {
                    return 3
                }
                else if (m == "July") {
                    return 3
                }
                else if (m == "August") {
                    return 3
                }
                else if (m == "September") {
                    return 3
                }
                else if (m == "October") {
                    return 2
                }
                else if (m == "November") {
                    return 1
                }
                else if (m == "December") {
                    return 1
                }
                else {
                    return 0
                }
            },
        },
        methods: {
            async getObjectives() {
                try {
                    let response = await axios.get("/api/objectives");
                    this.objectives = response.data.slice(0, 4);
                    this.objectives2 = response.data.splice(4)
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            async getActions() {
                try {
                    let response = await axios.get("/api/actions");
                    console.log(response.data);
                    this.actions = response.data;
                } catch (error) {
                    console.log(error);
                }
                return true;
            },
            toggleShowActions() {
                if(this.showActions == true) {
                    this.showActions = false;
                }
                else {
                    this.showActions = true;
                }
            }
        },
        watch: {
            showActions: function() {
                this.$emit("showAction", this.showActions);
            }
        }
    }
</script>

<style scoped lang="scss">
$height: 200;

div {
    font-family: 'Quicksand', sans-serif;
}

    h1 {
        color: gold;
    }

    p {
        margin-top: 5px;
    }

    .green {
        color: green;
    }

    .gray {
        color: gray;
        background-color: transparent;
    }

    .bold {
        font-weight: 600;
    }

    .danger {
        color: red;
    }

    .infoBar {
        margin-left: 1000px;
        margin-top: -45px;
        background-color: rgba(0,0,0,0.8);
        color: white;
        overflow: hidden;
        // height: 200px;
        width: 1400px;
    }

    .title {
        border: none;
        outline: none;
        padding: 0px 40px;
        margin-left: 0px;
        background-color: black;
        height: 46px;
    }

    .objectiveList {
        color: white;
        margin-left: 60px;
        margin-top: 10px;
    }

    .objectiveLabel {
        margin-left: 10px;
    }

    .incidents{
        margin-left: 60px;
        color: red;
    }

    .actionList {
        background-color: black;
        padding: 10px;
        padding-left: 30px;
        position: absolute;
    }

    .actionBtn {
        background-color: transparent;
        border: none;
        color: white;
    }

    .actionBtn:focus {
        outline: none;
    }

</style>