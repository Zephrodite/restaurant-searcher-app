<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand mr-3"
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
                <form
                    id="searching-form"
                    class="d-flex"
                    action="/restaurantslist"
                    @submit="searchRestaurantsSubmit"
                >
                    <div class="search">
                        <fa id="search-icon" icon="search" />
                        <input
                            id="navbar-search-input"
                            type="text"
                            class="form-control"
                            placeholder="City/Town Name"
                            v-model="search_value"
                            ref="autocomplete"
                        />
                    </div>
                </form>
            </div>
        </div>
    </nav>


    <div class="container mt-5">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
// import RestaurantsList from "./components/RestaurantsList.vue";

declare global {
    interface Window {
        google:any;
    }
}

export default defineComponent({
    name: "App",
    components: {
        // RestaurantsList,
    },
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
        searchRestaurantsSubmit(e: Event) {
            this.search_value = "";
            e.preventDefault();

            const URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.lat},${this.lng}&type=restaurant&radius=15000&key=[API KEYS]`;

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
        
        const google = (window as Window).google;
        var autocomplete = new google.maps.places.Autocomplete(
            this.$refs["autocomplete"],
            {
                bounds: new google.maps.LatLngBounds(
                    new google.maps.LatLng(45.4215296, -75.6971931)
                ),
            }
        );

        autocomplete.addListener("place_changed", () => {
            this.search_value = "";
            var place = autocomplete.getPlace();
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.$router.push("/restaurantslist");

            // console.log(this.$router.currentRoute.value);
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
        // currentRouteName() {
        //     return this.$route.name;
        // },
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

/* .navbar .container-fluid {
    margin-left: 180px;
} */

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
    margin-left: 700px;
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
