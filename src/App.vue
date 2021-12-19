<template>
    <nav class="navbar navbar-expand-lg navbar-custom bg-dark">
        <div class="container">
            <router-link
                to="/"
                class="navbar-brand"
                id="make-active-nav-item"
                @click="changeActiveNavItem"
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
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link"
                            >Support</router-link
                        >
                    </li>
                    <li class="nav-item mx-3">
                        <router-link to="/" class="nav-link"
                            >Contact</router-link
                        >
                    </li>
                </ul>
            </div>

            <form
                id="searching-form"
                class=""
                @submit="searchRestaurantsSubmit"
            >
                <div class="search">
                    <svg
                        id="tiny_loader"
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
                            r="20"
                        />
                    </svg>
                    <fa id="search-icon" icon="search" />
                    <input
                        id="navbar-search-input"
                        type="text"
                        class="form-control"
                        placeholder="City/Town Name"
                        v-model="search_value_in_navbar_search_input"
                        ref="autocomplete"
                    />
                </div>
            </form>
        </div>
    </nav>

    <div class="container mt-5">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { SearchResult } from "@/interfaces/SearchResults";
import { createSearchResult } from "@/services/SearchResultsServices";
import { getSearchResults } from "@/services/SearchResultsServices";
import * as dotenv from "dotenv";
dotenv.config();

declare global {
    interface Window {
        google: any;
    }
}

export default defineComponent({
    name: "App",
    components: {},
    data() {
        return {
            search_result: {} as SearchResult,
            search_results_all: [] as SearchResult[],
            search_result_current: {} as SearchResult,
            search_result_found: {} as SearchResult,
            places: [],
            lat: 0,
            lng: 0,
            search_value_in_navbar_search_input: "",
        };
    },
    methods: {
        // - Check the current link for switch to another link when users enter/press some new search value.
        // I'm having a problem when searching for new values. The link has been changed. But the list of restaurants on the page doesn't change.
        switchLink(id_of_Current_search_result: string) {
            if (
                window.location.href.toString().substring(
                    0,
                    window.location.href.toString().length - 24 // - To this line of code --> window.location.href.toString().length - 24 <-- use minus 24 to delete the ObjectID in currentlink.
                    // There are 24 character in ObjectID e.g. 61b6e299dd64c45ca711d94e
                ) ===
                `http://${window.location.hostname}:${location.port}/restaurantslist/sw/`
            ) {
                this.$router.push(
                    `/restaurantslist/${id_of_Current_search_result}`
                );
            } else {
                this.$router.push(
                    `/restaurantslist/sw/${id_of_Current_search_result}`
                );
            }
        },
        changeActiveNavItem() {
            if (
                window.location.href.toString() !==
                `http://${window.location.hostname}:${location.port}/`
            ) {
                this.search_value_in_navbar_search_input = "";

                (
                    document.getElementById(
                        "make-active-nav-item"
                    ) as HTMLElement
                ).style.color = "#37e2a4";

                (
                    document.getElementById(
                        "make-active-nav-item"
                    ) as HTMLElement
                ).style.textShadow =
                    "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";

                var setInteractText = {
                    hover: function (event: any) {
                        event.target.style.color = "#37e2a4";
                        event.target.style.textShadow =
                            "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";
                    },
                    out: function (event: any) {
                        event.target.style.color = "#37e2a4";
                        event.target.style.textShadow =
                            "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";
                    },
                };

                var setInteractTextElement = document.getElementById(
                    "make-active-nav-item"
                );
                (setInteractTextElement as HTMLElement).addEventListener(
                    "mouseover",
                    setInteractText.hover,
                    false
                );
                (setInteractTextElement as HTMLElement).addEventListener(
                    "mouseout",
                    setInteractText.out,
                    false
                );
            }
        },
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
                this.switchLink(this.search_result_current._id);
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
                    this.search_results_all[i].search_value.toString() ===
                    place_name.toString()
                ) {
                    console.log("FIND DATA!!");

                    this.search_result_found = this.search_results_all[i];
                    search_result_exist = true;
                    break;
                }
            }

            if (search_result_exist === true) {
                this.switchLink(this.search_result_found._id);
            } else {
                (
                    document.getElementById("tiny_loader") as HTMLElement
                ).style.visibility = "visible"; // Set the small loading animation to visible when have search value that does not exist in database.

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
});
</script>

<style>
#app {
    font-family: "Jost", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
}

nav {
    border: #212529 0.125em solid;
}

.navbar-custom .navbar-toggler {
    margin-right: 5px;
    background-color: white;
    color: #37e2a4;
}

.navbar-custom .navbar-toggler .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

nav .navbar-nav .nav-item .nav-link {
    margin-top: 4.5px;
    margin-left: 10px;
    color: white !important;
    font-size: 16px;
}

nav .navbar-nav .nav-item .nav-link:hover {
    color: #37e2a4 !important;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

.navbar-custom .navbar-brand {
    font-size: 20px;
    color: #37e2a4;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

.navbar-custom .navbar-brand:hover {
    color: #37e2a4;
    text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;
}

body.searching {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2.jpg");
}

body.restaurantlist {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2-blur.jpg");
}

body.restaurantlistswitch {
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #212529;
    background-image: url("./assets/background-res-app-nice-2-blur.jpg");
}

.search {
    position: relative;
}

.search input {
    height: 60px;
    text-indent: 25px;
    border: 3px solid #d6d4d4;
}

#searching-form {
    margin-left: auto;
    margin-right: auto;
}

.search #navbar-search-input {
    height: 40px;
    width: 300px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
}

.search input:focus {
    box-shadow: none;
    border: 3px solid #37e2a4;
    box-shadow: inset 0 0 0.5em 0 #37e2a4, 0 0 0.5em 0 #37e2a4;
}

.search #navbar-search-input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
    box-shadow: inset 0 0 0.2em 0 #37e2a4, 0 0 0.5em 0 #37e2a4;
}

.search #fa-search {
    position: absolute;
    top: 23.5px;
    left: 16px;
    color: #212529;
}

.search #search-icon {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #212529;
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

input,
input::-webkit-input-placeholder {
    font-size: 16px;
}

#tiny_loader {
    position: absolute;
    visibility: hidden;
    margin-left: 105px;
    width: 50px;
    height: 40px;
    stroke-dasharray: 269.7405090332031px;
    stroke-dashoffset: 0;
    animation: tiny_heartBeat 10s linear reverse infinite;
    transform: rotate(-90deg);
    filter: drop-shadow(0 0 5px #37e2a4);
}

@keyframes tiny_heartBeat {
    50% {
        stroke-dashoffset: 2200px;
    }
    50.01% {
        stroke-dashoffset: -2200px;
    }
}
</style>
