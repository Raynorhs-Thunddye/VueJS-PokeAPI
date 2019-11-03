<template>
  <div class="pkmn-component" v-if="exist">
    <div class="card-warper">
      <router-link :to="{path: '/pokemon/' + this.link}">
        <div class="card">
          <div style="height:100px;">
            <p class="name-pkmn" v-if="namePkmn">
              {{ namePkmn }}
            </p>
            <p class="id-pkmn" v-if="idPkmn">
              ID: {{ idPkmn }}
            </p>
          </div>
          <div class="types-pkmn" v-bind:style="{background: color}">
            <img v-bind:src="image"/>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Pokemon',
    data: function () {
      return {
        exist: true,
        urlparam: null,
        color: null,
        namePkmn: null,
        typePkmn: null,
        typePkmn1: null,
        typePkmn2: null,
        idPkmn: null,
        image: null,
        link: null,
        test: "pokemon/3/"
      }
    },
    created () {
      if (this.$route["params"]["id"] != null)
        this.link = this.$route["params"]["id"];
      else
        this.link = this.$attrs['idCard'];
      axios({
        method: 'get',
        url: 'https://pokeapi.co/api/v2/pokemon/' + this.link,
      })
       .then(response => {
        if (response["data"]["name"] != null) {
          this.namePkmn = response["data"]["name"];
          this.idPkmn = response["data"]["id"];
          this.typePkmn = response["data"]["types"];
          this.typePkmn1 = this.typePkmn[0]["type"]["name"];
          if (this.typePkmn.length == 2)
            this.typePkmn2 = this.typePkmn[1]["type"]["name"];
          else
            this.typePkmn2 = this.typePkmn[0]["type"]["name"];
        }

        var types = ["steel", "fighting", "dragon", "water", "electric", "fairy", "fire", "ice", "bug", "normal", "grass", "poison", "psychic", "rock", "ground", "ghost", "dark", "flying"];
        var colors = ["#6E6E6E", "#B07541", "#16345C", "#2F83F5", "#D7D962", "#E887CE", "#EB5726", "#A1FCFF", "#8C9E78", "#E6E6E6", "#0F9919", "#9E189A", "#F53DFF", "#C7A65F", "#D1BD90", "#321763", "#0F0424", "#84BAB8"];
        for (var i = 0 ; i < types.length ; i++) {
          if (this.typePkmn1 == types[i])
            this.typePkmn1 = colors[i];
          if (this.typePkmn2 == types[i])
            this.typePkmn2 = colors[i];
        }
        this.color = "linear-gradient(45deg, " + this.typePkmn1 + " 60%, " + this.typePkmn2 + " 60%)";
        this.image = response["data"]["sprites"]["front_default"];
      })
    },
  };
</script>

<style>
  .pkmn-component {
    display: inline-block;
    vertical-align: top;

    width: 33%;
    min-width: 300px;

    text-align: center;
    margin: 0 auto;
  }
  .pkmn-component a { text-decoration: none !important; }

  .card-warper {
    width: 300px;
    height: 420px;

    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 50px;
  }

  .card {
    border: 5px solid black;
    box-shadow: 10px 5px 5px black;
  }

  .name-pkmn, .id-pkmn, .types-pkmn {
    margin: 0;
    padding: 0;

    text-align: center;

    color: black !important;
  }

  .name-pkmn {
    font-size: 1.5em;
    text-transform: capitalize;
  }

  .types-pkmn {
    height: 311px;
    line-height: 311px;

    background-clip: border-box;
  }
  .types-pkmn img { vertical-align: middle; }

</style>
