<template>
  <div class="mx-auto">
    <v-row align="center" justify="center">
        Last Update:
        <div class="mx-2"></div>
        <h2 class="text-uppercase text-center font-weight-bold">{{ formatDate(countriesTotal.updated) }}</h2>
      </v-row>
    </h2>
  </div>
</template>

<script>
export default {
  name: "Header",
  data: () => ({
    date: "",
  }),
  methods: {
    formatDate(value) {
      var date = new Date();
      date.setTime(value).toLocaleString();

      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();

      return hours + ":" + minutes.substr(-2);
    },
  },
  computed: {
    countriesTotal() {
      return this.$store.state.countries.countriesTotal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
