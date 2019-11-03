<template>
  <div class="search-bar-component">
    <input v-model="query" type="text" name="search" placeholder="Ex: Miltank" />
    <button v-on:click="searchPkmn" class="search-btn">Search</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SearchBar',
    data: function () {
      return {
        query: '',
        dataPkmn: null,
      }
    },
    methods: {
      searchPkmn: function () {
        axios({
          method: 'get',
          url: 'https://pokeapi.co/api/v2/pokemon/' + this.query.toLowerCase(),
        })
        .then(response => {
          this.dataPkmn = response["data"]["id"];
          if (this.dataPkmn != null)
            this.$router.push("/pokemon/" + this.dataPkmn);
        });
      }
    },
  };
</script>

<style>
  .search-bar-component {
    display: inline;
    margin-left: 50px;
  }

  .search-bar-component input {
    border: 1px solid grey;
    height: 30px;
    background-color: white;
  }

  .search-btn {
    background-color: #888;
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
    width: 60px;
    text-align: center;
  }
</style>
