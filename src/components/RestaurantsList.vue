<template>
    <h1>Restaurants in {{ search_results_current.search_value }}</h1>
    <br />
    <div
        class="ui segment"
        style="
            max-height: 540px;
            max-width: 480px;
            overflow: scroll;
            margin-right: auto;
            margin-left: auto;
            margin-top: 0px;
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
    <!-- <button @click="getWindowLocationHref">WTF</button> -->
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
        };
    },
    methods: {
        async loadTask(id: string) {
            try {
                const { data } = await getSearchResult(id);
                this.search_results_current = data;
            } catch (error) {
                console.error(error);
            }
        },
        getWindowLocationHref() {
            console.log(window.location.href);
        },
    },
    mounted() {
        if (typeof this.$route.params.id === "string") {
            this.loadTask(this.$route.params.id);
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
    font-family: "Itim", sans-serif;
    margin-top: -15px;
    font-size: 32px;
    font-weight: bold;
    color: white;
    /* text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black; */
}
#list-of-restaurants {
    margin-left: auto;
    margin-right: auto;
}
.list-group {
    max-height: 300px;
    margin-bottom: 10px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.ui .header {
    color: #37e2a4;
}
</style>
