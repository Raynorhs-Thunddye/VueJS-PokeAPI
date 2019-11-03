import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Pokemons from '@/components/Pokemons.vue'
import PokemonInfos from '@/components/PokemonInfos.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      alias: '/home'
    },
    {
      path: '/pokemons',
      name: 'Pokemons',
      component: Pokemons
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: PokemonInfos
    }
  ]
})
