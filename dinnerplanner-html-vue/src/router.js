import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import SelectDish from '@/components/SelectDish'
import ShowDish from '@/components/ShowDish'
import Overview from '@/components/Overview'
import { modelInstance } from "@/data/DinnerModel";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/search',
      name: 'SelectDish',
      component: SelectDish,
      props: { model: modelInstance }
    },
    {
      path: '/showdish/:id',
      name: 'ShowDish',
      component: ShowDish,
      props: { model: modelInstance }
    },

    {
      path: '/overview',
      name: 'Overview',
      component: Overview,
      props: { model: modelInstance }
    }
  ]
})
