        
        
        
        <template>
            <div>
                <input v-model="dataName" placeholder="Name">
                <input v-model="dataCount" placeholder="Count">
                <input v-model="dataColor" placeholder="Color">
                <input v-model="dataSpecial" placeholder="Special">
                <b-button @click="upload()">upload</b-button>
            </div>
        </template>