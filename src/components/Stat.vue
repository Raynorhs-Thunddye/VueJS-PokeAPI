<template>
  <div class="stat-component">
    <div class="stat-name">
      {{ stats[$attrs["index"]] }}
    </div>
    <div class="stat-outer">
      <div class="stat-inner" v-bind:style="{width: bs, backgroundColor: statsCol}">
        {{ bs.substr(0, bs.length - 2) }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Stat',
    data: function () {
      return {
        bs: 0,
        statsCol: '',
        stats: ["HP", "Atk", "Def", "SpA", "SpD", "Spe"]
      }
    },
    methods: {
      getHexCol: function (color) {
        var res = Number(color).toString(16);
        return (res.length < 2) ? ("0" + res) : res;
      }
    },
    created () {
      this.bs = this.$attrs['val'];
      this.statsCol = "#A6" + this.getHexCol(this.bs) + "29";
      this.bs += "px";
    },
  };
</script>

<style>
  .stat-name, .stat-outer {
    display: inline-block;
    vertical-align: middle;
  }

  .stat-name {
    height: 13px;
    line-height: 25px;
    width: 20px;
  }

  .stat-outer {
    border: 1px solid black;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 20px;
    width: 260px;
    height: 25px;
  }

  .stat-inner {
    padding: 0px 10px;
    border-radius: 3px;
    height: 100%;
  }
</style>
