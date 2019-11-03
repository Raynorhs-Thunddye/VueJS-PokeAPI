<template>
  <div v-scroll="bottomVisible()">
    <p v-if="items">
      <Pokemon
        v-for="(item, index) in items"
        v-bind:item="item"
        v-bind:index="index"
        v-bind:key="item.idCard"
        v-bind:idCard="item.idCard"
      />
    </p>
  </div>
</template>

<script>
  import axios from 'axios';
  import Pokemon from './Pokemon';

  export default {
    name: 'Pokemons',
    components: {
      Pokemon,
    },
    data: function () {
      return {
        test: 0,
        amount: 9,
        currAmount: 0,
        isEndOfPage: true,
        items: [],
      }
    },
    methods: {
      bottomVisible() {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        if (bottomOfPage || pageHeight < visible) {
          this.addCards();
          this.$forceUpdate();
        }
      },
      addCards() {
        for (var i = this.currAmount ; i < this.currAmount + 3 ; i++)
          if (i < this.amount && i < 807)
            this.items[i] = {idCard: i + 1};
        this.currAmount += 3;
        this.$forceUpdate();
      },
      handleScroll () {
        const scrollY = window.scrollY;
        const visible = document.documentElement.clientHeight;
        const pageHeight = document.documentElement.scrollHeight;
        const bottomOfPage = visible + scrollY >= pageHeight;
        if (bottomOfPage || pageHeight < visible) {
          this.addCards();
        } else {
          this.isEndOfPage = false;
        }
      }
    },
    created() {
      window.addEventListener('scroll', this.handleScroll);
      this.addCards();
      axios({
        method: 'get',
        url: 'https://pokeapi.co/api/v2/pokemon/'
      })
      .then(response => {
       (this.amount = response["data"]["count"])
      });
      window.scrollTo(0,0);
      if (this.bottomVisible())
        this.addCards();
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>
