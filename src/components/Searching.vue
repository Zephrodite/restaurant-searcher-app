<template>
    <svg
        id="loader"
        v-show="loader_visible"
        viewBox="0 0 90 90"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle
            id="c"
            fill="none"
            stroke-width="6px"
            stroke-linecap="round"
            stroke="#37e2a4"
            cx="45"
            cy="45"
            r="35"
        />
    </svg>

    <h1 id="welcome_text">Find your favourite restaurant</h1>
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
                            placeholder="Enter A City/Town Name"
                            ref="autocomplete"
                        />
                    </div>
                </div>
            </div>
        </form>
    </div>
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
            search_result: {} as SearchResult,
            search_results_all: [] as SearchResult[],
            search_result_current: {} as SearchResult,
            search_result_found: {} as SearchResult,
            places: [],
            lat: 0,
            lng: 0,
            loader_visible: false,
        };
    },
    methods: {
        searchRestaurantsSubmit(e: any) {
            e.preventDefault(); // Prevent loss search value when submit search input

            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${this.lat},${this.lng}&type=restaurant&radius=20000&key=${process.env.VUE_APP_API_KEY}`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
        async getCurrentSearchResultAndRoute() {
            const res = await getSearchResults();

            this.search_result_current = res.data[res.data.length - 1];

            if (
                this.search_result.search_value ==
                this.search_result_current.search_value
            ) {
                this.$router.push(
                    `/restaurantslist/${this.search_result_current._id}`
                );
            }
        },
        async searchResultsExistCheck(
            place_name: string,
            lat_value: number,
            lng_value: number
        ) {
            const res = await getSearchResults();
            this.search_results_all = res.data;

            let search_result_exist = false;

            for (let i = 0; i < this.search_results_all.length; i++) {
                if (
                    this.search_results_all[i].search_value.toString() ==
                    place_name.toString()
                ) {
                    console.log("FIND DATA!!");

                    this.search_result_found = this.search_results_all[i];
                    search_result_exist = true;
                    break;
                }
            }

            if (search_result_exist == true) {
                this.$router.push(
                    `/restaurantslist/${this.search_result_found._id}`
                );
            } else {
                this.loader_visible = !this.loader_visible; // Set the big loading animation to visible when have search value that does not exist in database.

                (
                    document.getElementById("welcome_text") as HTMLElement
                ).style.marginTop = "-21px";

                this.searchRestaurantsAndSavingData(
                    lat_value,
                    lng_value,
                    place_name
                );
            }
        },
        searchRestaurantsAndSavingData(
            latitude: number,
            longitude: number,
            place_name: string
        ) {
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${latitude},${longitude}&type=restaurant&radius=20000&key=${process.env.VUE_APP_API_KEY}`;

            axios
                .get(URL)
                .then((response) => {
                    this.search_result.places = response.data.results;
                    this.search_result.search_value = place_name;
                    console.log("SAVING DATA");
                    createSearchResult(this.search_result)
                        .then(() => {
                            this.getCurrentSearchResultAndRoute();
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                })
                .catch((error) => {
                    console.log(error.message);
                });
        },
    },
    mounted() {
        const google = window.google;
        var autocomplete = new google.maps.places.Autocomplete(
            this.$refs["autocomplete"]
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
    font-family: "Jost", sans-serif;
    font-size: 44px;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 5px #000000;
}

input,
input::-webkit-input-placeholder {
    font-size: 20px;
}

#loader {
    width: 100px;
    margin-top: -190px;
    stroke-dasharray: 269.7405090332031px;
    stroke-dashoffset: 0;
    animation: heartBeat 10s linear reverse infinite;
    transform: rotate(-90deg);
    filter: drop-shadow(0 0 5px #37e2a4);
}

@keyframes heartBeat {
    50% {
        stroke-dashoffset: 2200px;
    }
    50.01% {
        stroke-dashoffset: -2200px;
    }
}
</style>
