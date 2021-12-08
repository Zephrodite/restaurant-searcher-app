<template>
     <!-- <img src="https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt=""> -->
    <h1>Let's find your favourite restaurants</h1>
    <br />
    <form action="http://localhost:8081/restaurantslist">
        <div
            class="row height d-flex justify-content-center align-items-center"
        >
            <div class="col-md-8">
                <div class="search">
                    <fa id="fa-search" icon="search" />
                    <input
                        type="text"
                        class="form-control"
                        placeholder=" Please Enter A City/Town Name"
                        v-model="search_result"
                    />
                    <button class="btn btn-success">Search</button>
                </div>
            </div>
        </div>
    </form> 
    <br /><br />
</template>

<script>
// import axios from "axios";

export default {
    name: "Searching",
    data() {
        return {
            search_result: ""
        }
    },
    method: {
        handleSubmitForm() {}
    },
    props: {
        msg: String,
    },
    beforeCreate: function() {
        document.body.className = 'searching';
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
    margin-top: 220px;
    font-size: 28px;
    font-weight: bold;
    color: white;
}
</style>
