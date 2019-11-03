<template>
  <div :key="update">
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Data',
  data: function () {
    return {
      link: null,
      typePkmn: null,
      typePkmn1: null,
      typePkmn2: null,
      abilities: '',
      update: 0,
    }
  },
  created () {
    this.link = this.$route["params"]["id"];
    axios({
      method: 'get',
      url: 'https://pokeapi.co/api/v2/pokemon/' + this.link,
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
    });
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
</style>
