<template>
  <div class="col-sm-3 sidebar">
    <h3>My dinner</h3>
    <hr/>
    <p>
      People: <input :value="numberOfGuests" @input="onDidChangeNumberOfGuests" @change="onDidChangeNumberOfGuests"/>
      <br/><br/><br/>
    <table class="table">
      <thead>
        <tr>
          <th>Dish name</th>
          <th>Cost</th>
          <th></th>
        </tr>
      </thead> 
      <tbody></tbody>
      <tfoot>
        <tr v-for="dish in menu" :key="dish.title">
          <td>{{dish.title}}</td>
          <td>{{dish.pricePerServing*numberOfGuests}}</td>
          <td><span @click="onRemoveDish(dish.id)" class='glyphicon glyphicon-remove' ></span></td>
        </tr>
      </tfoot>
    </table>
    <br/>
    <div class="text-center">
      <router-link to="/overview">
        <button type="button" class="btn btn-warning">Confirm Dinner</button>
      </router-link>
    </div>
    
  </div>
</template>

<script>
  export default {
    props: ['model'],
    // this methods is called by React lifecycle when the 
    // component is created that's a good place to setup model observer
    created() {
      this.model.addObserver(this)
    },

    // this is called when component is removed destroyed
    // good place to remove observer
    beforeDestroy() {
      this.model.removeObserver(this)
    },

    // we define and initalise the data we want to use and modify in the component
    data() {
      return {
        numberOfGuests: this.model.getNumberOfGuests(),
        menu: this.model.getFullMenu()
        
      }
    },

    methods: {
      // in our update function we modify the the property of 
      // the compoented which will cause the component to re-render
      update() {
        this.numberOfGuests = this.model.getNumberOfGuests(),
        this.menu = this.model.getFullMenu()
      },

      // our handler for the input's on change event
      onDidChangeNumberOfGuests(e) {
        this.model.setNumberOfGuests(+e.target.value)
      },

      onRemoveDish(id) {
        console.log(id)
        this.model.removeDishFromMenu(id)
      }
    }
  }
</script>

<style scoped>
  span.glyphicon :hover{
    cursor: pointer;
  }
</style>
