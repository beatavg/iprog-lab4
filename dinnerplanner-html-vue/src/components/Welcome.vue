<template>
  <div class="row welcome">
    <br><br><br><br><br>
    <div class="col-sm-3"></div>
    <div class="col-sm-6 container text-center">
      <introduction>
        {{ msg }}
      </introduction>
      <br><br><br>
      <router-link to="/search">
        <button type="button" class="btn btn-warning">Start planning</button>
      </router-link>
    </div>
    <div class="col-sm-3"></div>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>
  button {
    color: white;
  }

</style>