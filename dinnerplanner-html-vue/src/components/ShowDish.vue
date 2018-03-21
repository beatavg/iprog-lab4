<template>
  <div class="row select-dish">
    
    <!-- We pass the model as property to the Sidebar component -->
    <sidebar class="col-sm-3" :model="this.model"/>
    <div class="col-sm-9">
        <div class="row">
            <div class="col-sm-9"><h3>{{$route.params.title}}</h3></div>
            <br/>
            <div class="col-sm-3">
                <router-link to="/search">
                    <button class="btn btn-warning" type="button">Back to select dish</button>
                </router-link>
            </div>
        </div>
        <br/>
        <div class = "col-sm-5">
            <img class="img-responsive" :src="'https://spoonacular.com/recipeImages/'+$route.params.img"/>
            <br/>
        </div>
        <div class="col-sm-6" id="ingredientsBox">
          <h3>Ingredients for {{numberOfGuests}} people</h3>
          <table class="table borderless" id="ingredientsTable">
            <thead></thead>
            <tbody>
              <tr v-for="ingredient in dish.extendedIngredients" :key="ingredient.id">
                <td>{{ingredient.amount*numberOfGuests}} {{ingredient.unit}}</td>
                <td>{{ingredient.name}}</td>
              </tr>
            </tbody>
            <tfoot>
              <td colspan="2">
                <router-link to="/search">
                  <button @click="onConfirmDish" type="button" class="btn btn-warning" id="confirmButton">Confirm Dish</button>
                </router-link>
              </td>
              <td>Total: {{dish.pricePerServing*numberOfGuests}}<span id="totalPrice"></span></td>
            </tfoot>
          </table>
        </div>
        <div class="col-sm-11">
          <h3>Preparation:</h3>
          {{dish.instructions}}
        </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar';
  import { modelInstance } from "../data/DinnerModel";

  export default {
    props: ['model'],
    components: {
      'sidebar': Sidebar,
    },
    methods: {
      onConfirmDish: function() {
        this.model.addDishToMenu(this.dish.id)
      
      }
    },
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
        dish: {},
      }
    },


  }


  
</script>


