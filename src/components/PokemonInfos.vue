<template>
  <div :key="update">
    <Pokemon v-bind:idCard=idPkmnInfo />
    <div style="width:66%;display:inline-block;vertical-align:top;">
      <table>
        <tr style="text-align:left;">
          <th>Data</th>
          <th>Values</th>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ dataPkmn["id"] }}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{ dataPkmn["name"] }}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{{ dataPkmn["height"] }}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{{ dataPkmn["weight"] }}</td>
        </tr>
        <tr>
          <td>Abilities</td>
          <td>{{ abilities }}</td>
        </tr>
        <tr>
          <td>Base experience</td>
          <td>{{ dataPkmn["base_experience"] }}</td>
        </tr>
        <tr v-if="typePkmn2">
          <td>Types</td>
          <td>{{ typePkmn1 }}, {{ typePkmn2 }}</td>
        </tr>
        <tr v-else>
          <td>Type</td>
          <td>{{ typePkmn1 }}</td>
        </tr>
      </table>
      <div class="stats">
        <h3>Stats</h3>
        <Stat
          v-for="(item, index) in bs"
          v-bind:item="item"
          v-bind:index="index"
          v-bind:key="index"
          v-bind:val="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Pokemon from './Pokemon.vue';
  import Stat from './Stat.vue';

  export default {
    name: 'PokemonInfos',
    data: function () {
      return {
        idPkmnInfo: this.$route["params"]["id"],
        dataPkmn: null,
        typePkmn: null,
        typePkmn1: null,
        typePkmn2: null,
        abilities: '',
        bs: [],
        update: 0,
      }
    },
    components: {
      Pokemon,
      Stat,
    },
    created () {
      axios({
        method: 'get',
        url: 'https://pokeapi.co/api/v2/pokemon/' + this.idPkmnInfo,
      })
      .then(response => {
        this.dataPkmn = response["data"];
        for (var i = 0 ; i < response["data"]["abilities"].length ; i++) {
          var str = response["data"]["abilities"][i]["ability"]["name"] + ", ";
          str = str.charAt(0).toUpperCase() + str.slice(1);
          this.abilities += str;
        }
        this.abilities = this.abilities.substring(0, this.abilities.length - 2);

        this.typePkmn = response["data"]["types"];
        this.typePkmn1 = this.typePkmn[0]["type"]["name"];
        if (this.typePkmn.length == 2)
          this.typePkmn2 = this.typePkmn[1]["type"]["name"];

        for (var j = 0 ; j < this.dataPkmn["stats"].length ; j++) {
          this.bs[j] = this.dataPkmn["stats"][j]["base_stat"];
        }
        this.bs = this.bs.reverse();
      });
    },
    beforeRouteUpdate (to, from, next) {
      this.$forceUpdate();
      next();
    },
  };
</script>

<style>
  table {
    border-collapse: collapse;
    width: 50%;
  }

  table td, table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-transform: capitalize;
  }

  table tr:nth-child(even){background-color: #f2f2f2;}

  table tr:hover {background-color: #ddd;}

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #7682CC;
    color: white;
  }

  .stats { margin-top: 20px; }
</style>
