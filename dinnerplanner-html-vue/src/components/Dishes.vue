<template>
  <div class="Dishes col-sm-9">
    <h3>FIND A DISH</h3>
    <hr>
    <form v-on:submit="searchSubmit" class="searchForm row">
      <div class="col-sm-6">
        <div class="input-group">
          <input v-model="inputText" type="text" class="form-control input-sm" placeholder="Enter key words" val="">
          <span class="input-group-btn"> 
            <button class="btn btn-warning" type="submit">Search</button>
          </span>
        </div>
      </div>
      <div class="col-sm-3 dropdown">
        <select id="dropDown" v-model="dropDown">
            <option value="drink" id="dropDownDrink">Drink</option>
            <option value="beverage" id="dropDownBeverage">Beverage</option>
            <option value="soup" id="dropDownSoup">Soup</option>
            <option value="salad" id="dropDownSalad">Salad</option>
            <option value="bread" id="dropDownBread">Bread</option>
            <option value="breakfast" id="dropDownBreakfast">Breakfast</option>
            <option value="appetizer" id="dropDownAppetizer">Appetizer</option>
            <option value="main course" id="dropDownMainCourse">Main Course</option>
            <option value="side dish" id="dropDownSideDish">Side dish</option>
            <option value="sauce" id="dropDownSauce">Sauce</option>
            <option value="dessert" id="dropDownDessert">Dessert</option>  
        </select>
        <br/>
      </div>
    </form>
    <br/><br/><br/>
    <div>
      <em v-if='status === "INITIAL"'>Loading...</em>
      <b v-else-if='status === "ERROR"'>Failed to load data, please try again</b>
      <div class="dishthumbnail col-sm-4" v-for="dish in dishes" :id="dish.id" :key="dish.id">
        
        <img class="img-responsive" :src="'https://spoonacular.com/recipeImages/'+dish.image"/>
        <router-link :to="{ name: 'ShowDish', params: { id: dish.id, img: dish.image, title: dish.title }}">
          <button type="button" class="dishBtn btn btn-default"> {{dish.title}} </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  // Alternative to passing the moderl as the component property, 
  // we can import the model instance directly
  import { modelInstance } from "../data/DinnerModel";

  export default {
    // this methods is called by Vue lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    mounted() {
      // when data is retrieved we update it's properties
      // this will cause the component to re-render
      modelInstance.getAllDishes().then(dishes => {
        this.status = 'LOADED'
        this.dishes = dishes.results
      }).catch(() => {
        this.status = 'ERROR'
      })
    },
    data() {
      return {
        status: 'INITIAL',
        dishes: [],
        inputText: "",
        dropDown: "drink"
        //type: this.modelInstance.getType()
      }
    },
    methods: {
      sendToDetails:function(dish){
        console.log(dish);
        var id = dish.id;
        return '/showdish?id='+id;
        //router.push({ path: 'showdish', query: { id: id }})
      },
      searchSubmit: function(){
        console.log(this.dropDown, this.inputText)
        modelInstance.getAllDishes(this.dropDown, this.inputText).then(dishes => {
        this.status = 'LOADED'
        this.dishes = dishes.results
      }).catch(() => {
        this.status = 'ERROR'
      })
      }

      // onDidChangeType(e) {
      //   this.model.setType(+e.target.value)
      // },

      // update() {
      //   this.type = this.model.getType()
      // }

    }
  }
</script>

<style scoped>
  img {
    margin: auto;
    max-height: 80%;
  }

  .dishthumbnail {
    float: left;
    width: 30%;
    box-sizing: border-box;
    margin: 4px;
    border-radius: 4px;
    text-align: center;
    border: 1px solid black;
    height: 200px;
  }

  .dishBtn {
    max-width: 100%;
    overflow: hidden;
  }
</style>
