<template>
    <h1>Find your favourite restaurant</h1>
    <br />

    <div>
        <form @submit="searchRestaurantsSubmit">
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
                            v-model="search_address"
                            ref="autocomplete"
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { SearchResult } from "@/interfaces/SearchResults";
import { createSearchResult } from "@/services/SearchResultsServices";
import { getSearchResults } from "@/services/SearchResultsServices";

export default defineComponent({
    name: "Searching",
    data() {
        return {
            search_results: {} as SearchResult,
            search_results_all: [] as SearchResult[],
            search_results_current: {} as SearchResult,
            search_results_found: {} as SearchResult,
            id: "",
            places: [],
            lat: 0,
            lng: 0,
            search_address: "",
        };
    },
    methods: {
        searchRestaurantsSubmit(e: any) {
            e.preventDefault();
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${this.lat},${this.lng}&type=restaurant&radius=20000&key=[API KEY]`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        async getCurrentTasksAndRoute() {
            const res = await getSearchResults();
            this.search_results_all = res.data;
            this.search_results_current =
                this.search_results_all[this.search_results_all.length - 1];
            this.$router.push(
                `/restaurantslist/${this.search_results_current._id}`
            );
        },
        async searchResultsExistCheck(
            place_name: string,
            lat_value: number,
            lng_value: number
        ) {
            const res = await getSearchResults();
            this.search_results_all = res.data;

            let search_results_exist = false;

            for (let i = 0; i < this.search_results_all.length; i++) {
                if (
                    this.search_results_all[i].search_value.toString() ==
                    place_name.toString()
                ) {
                    console.log("FIND DATA!!");
                    this.search_results_found = this.search_results_all[i];
                    search_results_exist = true;
                    break;
                }
            }

            if (search_results_exist == true) {
                this.$router.push(
                    `/restaurantslist/${this.search_results_found._id}`
                );
            } else if (search_results_exist == false) {
                this.searchRestaurants(lat_value, lng_value, place_name);
            }
        },
        searchRestaurants(latt: number, lngg: number, place_name: string) {
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${latt},${lngg}&type=restaurant&radius=20000&key=[API KEY]`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                    this.search_results.places = this.places;
                    this.search_results.search_value = place_name;
                    console.log("SAVING DATA");
                    const res = createSearchResult(this.search_results);
                    this.getCurrentTasksAndRoute();
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
            this.searchResultsExistCheck(
                place.name,
                place.geometry.location.lat(),
                place.geometry.location.lng()
            );
        });
    },
    beforeCreate: function () {
        document.body.className = "searching";
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
        font-family: "Itim", sans-serif;
    margin-top: 240px;
    font-size: 36px;
    font-weight: bold;
    color: white;
    /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}

i .fa-search {
    color: black;
}
</style>
