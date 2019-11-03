<template>
  <div>
    <nav>
      <router-link to="/home">Home</router-link>
      <router-link to="/pokemons">Pokemons List</router-link>
      <SearchBar />
    </nav>
  </div>
</template>

<script>
  import SearchBar from '@/components/SearchBar.vue';

  export default {
    name: 'NavBar',
    components: {
      SearchBar,
    }
  };
</script>

<style>
  nav {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #7682CC;
    margin-bottom: 70px;
  }

  nav a {
    color: white !important;
    text-decoration: none;
    font-size: 1.2em;
    margin-left: 50px;
  }

  nav a:hover {
    color: #333 !important;
    -webkit-transition: color 0.3s ease-out;
    -moz-transition: color 0.3s ease-out;
    -o-transition: color 0.3s ease-out;
    transition: color 0.3s ease-out;
  }
</style>
