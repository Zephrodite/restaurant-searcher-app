<template>
    <div
        style="
            max-width: 600px;
            margin-right: auto;
            margin-left: auto;
            margin-top: 0px;
        "
    >
        <h1 v-show="isVisibleKeywordText">
            Restaurants in {{ search_results_current.search_value }}
        </h1>
    </div>

    <h1
        id="notFoundAlert"
        v-show="isVisibleNotFoundText"
        style="text-align: center"
    ></h1>

    <br />
    <div
        class="ui segment"
        style="
            max-width: 600px;
            margin-right: auto;
            margin-left: auto;
            margin-top: 0px;
            text-align: left;
        "
    >
        <div class="ui divided items">
            <div
                class="item"
                v-for="(place, index) in search_results_current.places"
                :key="index"
            >
                <div class="content">
                    <div class="header">{{ place.name }}</div>
                    <div class="meta">{{ place.vicinity }}</div>
                </div>
            </div>
        </div>
    </div>
    <br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SearchResult } from "@/interfaces/SearchResults";
import { getSearchResult } from "@/services/SearchResultsServices";

export default defineComponent({
    name: "RestaurantsList",
    props: {
        msg: String,
    },
    data() {
        return {
            search_results_current: {} as SearchResult,
            isVisibleKeywordText: true,
            isVisibleNotFoundText: false,
        };
    },
    methods: {
        async loadSearchResult(id: string) {
            try {
                const { data } = await getSearchResult(id);
                this.search_results_current = data;

                //Check length of places list If don't found any place from search value It will return some text to tell users.
                if (this.search_results_current.places.length == 0) {
                    this.isVisibleKeywordText = !this.isVisibleKeywordText;
                    this.isVisibleNotFoundText = !this.isVisibleNotFoundText;

                    (
                        document.getElementById("notFoundAlert") as HTMLElement
                    ).innerHTML = `Sorry, we couldn't find restaurants near ${this.search_results_current.search_value}`; //Text to tell user not found any place from search value.
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        (
            document.getElementById("tiny_loader") as HTMLElement
        ).style.visibility = "hidden"; // Set the small loading animation to invisible after save search result

        (
            document.getElementById("make-active-nav-item") as HTMLElement
        ).style.color = "white";

        (
            document.getElementById("make-active-nav-item") as HTMLElement
        ).style.textShadow = "0 0 0";

        var setInteractText = {
            hover: function (event: any) {
                event.target.style.color = "#37e2a4";
                event.target.style.textShadow =
                    "0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor";
            },
            out: function (event: any) {
                event.target.style.color = "white";
                event.target.style.textShadow = "0 0 0";
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

        if (typeof this.$route.params.id === "string") {
            this.loadSearchResult(this.$route.params.id); // Load restaurants from the id parameter.
        }
    },
    beforeCreate: function () {
        document.body.className = "restaurantlist";
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    font-family: "Jost", sans-serif;
    margin-top: -15px;
    font-size: 32px;
    font-weight: bold;
    color: white;
    text-align: left;
    text-shadow: 0 0 5px #000000;
    /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}
</style>
