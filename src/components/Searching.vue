<template>
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

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 180px;
    font-size: 28px;
    font-weight: bold;
}
</style>
