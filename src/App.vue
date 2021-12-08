<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">

            <router-link to="/" class="navbar-brand mr-3" >Restaurants Searcher</router-link>
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
                <form id="searching-form" class="mb-2" action="http://localhost:8081/restaurantslist">
                    <div class="search">
                        <fa id="search-icon" icon="search" />
                        <input
                            id="navbar-search-input"
                            type="text"
                            class="form-control"
                            placeholder=""
                        />
                    </div>
                </form>
                <ul class="nav navbar-nav mb-2 mb-lg-0 ">
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
        </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>


</template>

<script>
// import Searching from "./components/Searching.vue";

export default {
    name: "App",
    // components: {
    //     Searching,
    // },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

}

body.searching {
 background-repeat: no-repeat;
    background-attachment: fixed;  
    background-size: cover;
    background-image: url('https://images.unsplash.com/photo-1463797221720-6b07e6426c24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80');
}

.searching-form {
    margin-right: auto;
}
.search {
    position: relative;
    box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.search input {
    height: 60px;
    text-indent: 25px;
    border: 2px solid #d6d4d4;
}

.search #navbar-search-input {
    height: 40px;
    text-indent: 25px;
    margin-top: 6px;
    border: 2px solid #d6d4d4;
}

.search input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
}

.search #navbar-search-input:focus {
    box-shadow: none;
    border: 2px solid #37e2a4;
}

.search .fa-search {
    position: absolute;
    top: 20px;
    left: 16px;
}

.search #search-icon {
    position: absolute;
    top: 12px;
    left: 12px;
}

.search button {
    position: absolute;
    color: white;
    top: 5px;
    right: 5px;
    height: 50px;
    width: 110px;
    background: black;
}

.search button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
}

.search #navbar-search-button:hover {
    box-shadow: none;
    background-color: #37e2a4;
    border: 2px solid #37e2a4;
}


</style>
