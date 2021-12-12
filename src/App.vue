<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand"
                >Restaurants Searcher</router-link
            >
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link px-4"
                            >Home</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">About</router-link>
                    </li>
                </ul>
            </div>

            <form
                id="searching-form"
                class=""
                @submit="searchRestaurantsSubmit"
            >
                <div class="search">
                    <fa id="search-icon" icon="search" />
                    <input
                        id="navbar-search-input"
                        type="text"
                        class="form-control"
                        placeholder="City/Town Name"
                        v-model="search_address"
                        ref="autocomplete"
                    />
                </div>
            </form>
        </div>
    </nav>

    <div class="container mt-5">
        <router-view></router-view>
    </div>
    <!-- <div> {{places}}</div> -->
    <!-- <div v-for="(place, index) in places" :key="index">
        <div>{{ index + 1 }}. {{ place.name }} + {{ place.vicinity }}</div>
    </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { SearchResult } from "@/interfaces/SearchResults";
import { createSearchResult } from "@/services/SearchResultsServices";
import { getSearchResults } from "@/services/SearchResultsServices";

declare global {
    interface Window {
        google: any;
    }
}

export default defineComponent({
    name: "App",
    components: {
        // RestaurantsList,
    },
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
            this.search_address = "";
            e.preventDefault();
            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=
            ${this.lat},${this.lng}&type=restaurant&radius=15000&key=[API key]`;

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
        async getAllTasks(
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
            ${latt},${lngg}&type=restaurant&radius=15000&key=[API key]`;

            axios
                .get(URL)
                .then((response) => {
                    this.places = response.data.results;
                    // console.log(response.data.results);
                    this.search_results.places = this.places;
                    this.search_results.search_value = place_name;
                    console.log("SAVING DATA");
                    const res = createSearchResult(this.search_results);
                    this.getCurrentTasksAndRoute();

                    // const resForGet = getSearchResults();
                    // this.search_results_all = resForGet.data;
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
            this.getAllTasks(
                place.name,
                place.geometry.location.lat(),
                place.geometry.location.lng()
            );
            this.search_address = "";

            // this.$router.push(`/restaurantslist`);
            // this.$router.push("/restaurantslist");
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
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}

body.searching {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-image: url("https://images.unsplash.com/photo-1463797221720-6b07e6426c24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80");
}

.search {
    position: relative;
    /* box-shadow: 0 0 40px black; */
}

.search input {
    height: 60px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
}

#searching-form {
    margin-left: auto;
    margin-right: auto;
}

.search #navbar-search-input {
    height: 40px;
    text-indent: 25px;

    border: 2px solid #544646;
}

.search input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
}

.search #navbar-search-input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
}

.search #fa-search {
    position: absolute;
    top: 20px;
    left: 16px;
    color: #212529;
}

.search .fa-search {
    color: #212529;
}

.search #search-icon {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #212529;
}

.search button {
    position: absolute;
    color: white;
    top: 5px;
    right: 5px;
    height: 50px;
    width: 50px;
    background: white;
    border: 2px solid white;
}

.search button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
    color: white;
}

.search #navbar-search-button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
}
.searchbar {
    margin-bottom: auto;
    margin-top: auto;
    height: 30px;
    background-color: #353b48;
    border-radius: 30px;
    padding: 10px;
}
</style>
