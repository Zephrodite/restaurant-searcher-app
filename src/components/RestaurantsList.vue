<template>

    <div class="ui segment" style="max-height: 500px; overflow: scroll">
        <div class="ui divided items">
            <div class="item">
                <div class="content">
                    <div class="header">AA</div>
                    <div class="meta">bb</div>
                </div>
            </div>
            <div class="item">
                <div class="content">
                    <div class="header">AA</div>
                    <div class="meta">bb</div>
                </div>
            </div>
            <div class="item">
                <div class="content">
                    <div class="header">AA</div>
                    <div class="meta">bb</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "RestaurantsList",
    props: {
        msg: String,
    },
    data() {
        return {
            search_value: "",
        };
    },
    beforeCreate: function () {
        document.body.className = "restaurantlist";
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
