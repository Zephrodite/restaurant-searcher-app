<template>
    <h1>Find your favourite restaurants</h1>
    <br />

    <div>
        <section>
            <form @submit="searchRestaurantsSubmit" action="/restaurantlist">
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
                                v-model="search_value"
                                ref="autocomplete"
                            />
                            <button
                                class="btn btn-success"
                                type="submit"

                            >
                    
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </div>
    <!-- <h1>lat:{{ lat }} and lng:{{ lng }}</h1>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Restaurant's name</th>
                <th scope="col">Location</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(place, index) in places" :key="index">
                <th>{{ index + 1 }}</th>
                <td>{{ place.name }}</td>
                <td>{{ place.vicinity }}</td>
            </tr>
        </tbody>
    </table> -->
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
    name: "Searching",
    data() {
        return {
            search_value: "",
            error: "",
            spinner: false,
            lat: 0,
            lng: 0,
            places: [],
        };
    },
    methods: {
        // getLatAndLng(latt, lngg) {
        //     this.lat = latt;
        //     this.lng = lngg
        // },
        searchRestaurantsSubmit(e) {
            e.preventDefault();
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
                this.lat
            },${this.lng}&type=restaurant&radius=15000&key=AIzaSyASfgz6VeOwEg11zaGmqoaTLSuFbGkFWvg`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
    mounted() {
        const google = window.google;
        var autocomplete = new google.maps.places.Autocomplete(
            this.$refs["autocomplete"],
            {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(45.4215296, -75.6971931)
                ),
            }
        );

        autocomplete.addListener("place_changed", () => {
            var place = autocomplete.getPlace();
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.$router.push("/restaurantslist");
            // getLatAndLng(place.geometry.location.lat(), place.geometry.location.lng());

            // findCloseBuyButtonPressed(
            //     place.geometry.location.lat(),
            //     place.geometry.location.lng()
            // );

            // this.showLocationOnTheMap(
            //   place.geometry.location.lat(),
            //   place.geometry.location.lng()
            // );
        });
    },
    computed: {
        coordinates() {
            return `${this.lat}, ${this.lng}`;
        },
    },
    beforeCreate: function () {
        document.body.className = "searching";
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-top: 250px;
    font-size: 29px;
    font-weight: bold;
    color: white;
    /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}

i .fa-search {
    color: black;
}
</style>
