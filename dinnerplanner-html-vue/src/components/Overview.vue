<template>
    <div class="col-sm-12">
        <div class="col-sm-10"><h3 class="padding">My dinner: {{numberOfGuests}} people</h3>
            <h3>Total: {{dish.pricePerServing*numberOfGuests}}</h3>
        </div>
        <br>
        <div class="col-sm-2">
            <router-link to="/search">
                <button type="button" class="btn btn-warning">Go back and edit your dinner</button>
            </router-link>
        </div>
        <br><br><br>
        <div class="row col-sm-3"></div>
        <div class="row col-sm-6"></div>
        <div class="row col-sm-3"></div>
        <footer class="col-sm-12 text-center">
            <hr>
            <div class="col-sm-12">
                <button type="button" class="btn btn-warning">Print full recipe</button>
            </div>
        </footer>


    </div>

</template>

<script>
  import { modelInstance } from "../data/DinnerModel";

  export default {
    props: ['model'],
    mounted() {
      modelInstance.getDish(this.$route.params.id).then(dish => {
        this.status = 'LOADED'
        this.dish = dish
      }).catch(() => {
        this.status = 'ERROR'
      })
    },
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        dish: {}

      }
    }
}
</script>
