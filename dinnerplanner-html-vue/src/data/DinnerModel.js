const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 4;
  let observers = [];
  let activeType  = "starter";
  let menu = [];

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.addDishToMenu = function(id) {
    this.getDish(id).then(dish => {
    menu.push(dish);
    notifyObservers();
  });

  this.getFullMenu = function() {
    return menu;
  };

  this.removeDishFromMenu = function(id) {
    for(var i = menu.length - 1; i >= 0; i--) {
      if(menu[i].id == id) {
        console.log("nu ryker den")
        menu.splice(i, 1);
      }
    }
  
    notifyObservers();
  }
}

  // API Calls

  this.getAllDishes = function (type, filter) {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?type='+type
    
    url = url+'&query='+filter

    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  this.getDish = function (id) {
    console.log(id);
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }


  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();
