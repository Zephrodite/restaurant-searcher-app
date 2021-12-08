<template>
    
    <table class="table" id="list-of-restaurants">
        <thead class="thead-dark">
            <tr>
                <th scope="col">Number</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>WTF</td>
                <td>Otto</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
            </tr>
        </tbody>
    </table>

</template>

<script>
export default {
  name: 'RestaurantsList',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#list-of-restaurants {
    margin-left: auto;
    margin-right: auto;
}

</style>
