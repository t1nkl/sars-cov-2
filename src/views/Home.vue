<template>
  <div class="home">
    <CountriesTotal
      :countriesTotal="countriesTotal"
      v-if="!loading"
    ></CountriesTotal>

    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <CountriesTable
      :countries="countries"
      :countriesYesterday="countriesYesterday"
      :loading="loading"
    ></CountriesTable>
  </div>
</template>

<script>
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import CountriesTable from "../components/CountriesTable";
import CountriesTotal from "../components/CountriesTotal";

export default {
  name: "Home",
  components: {
    CountriesTable,
    CountriesTotal,
  },
  data: () => ({
    loading: false,
    countriesTotal: {},
    countries: {},
    countriesYesterday: {},
  }),
  methods: {
    async fetchData() {
      this.loading = true;

      await this.axios
        .get("https://corona.lmao.ninja/all")
        .then((response) => {
          this.countriesTotal = response.data;
          this.$store.dispatch("countries/storeCountriesTotal", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      await this.axios
        .get("https://corona.lmao.ninja/yesterday")
        .then((response) => {
          this.countriesYesterday = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      await this.axios
        .get("https://corona.lmao.ninja/countries")
        .then((response) => {
          var responseData = filter(response.data, function(data) {
            return data && data.country && data.cases > 0;
          });

          this.countries = orderBy(responseData, ["cases"], ["desc"]);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created: function() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
