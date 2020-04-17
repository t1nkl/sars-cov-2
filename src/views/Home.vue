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
    fetchData() {
      this.loading = true;

      this.getTotalCountries((response) => {
        this.countriesTotal = response;
        this.$store.dispatch("countries/storeCountriesTotal", response);
      });

      this.getCountries((response) => {
        var responseData = filter(response, function(data) {
          return data && data.country && data.cases > 0;
        });

        this.countries = orderBy(responseData, ["cases"], ["desc"]);
        this.loading = false;
      });

      this.getYesterdayCountries((response) => {
        this.countriesYesterday = response;
      });
    },
  },
  created: function() {
    this.fetchData();
  },
};
</script>

<style scoped></style>
