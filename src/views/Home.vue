<template>
  <div class="home">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-simple-table
      dark
      fixed-header
      height="800px"
      v-if="countriesTotal && Object.keys(countries).length > 1"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center text-uppercase">Country</th>
            <th class="text-center text-uppercase">Cases</th>
            <th class="text-center text-uppercase">Active</th>
            <th class="text-center text-uppercase">Recovered</th>
            <th class="text-center text-uppercase">Critical</th>
            <th class="text-center text-uppercase">Deaths</th>
            <th class="text-center text-uppercase">Cases per<br />Million</th>
            <th class="text-center text-uppercase">Deaths per<br />Million</th>
            <th class="text-center text-uppercase">Tests per<br />Million</th>
            <th class="text-center text-uppercase">Total<br />Tests</th>
          </tr>
        </thead>
        <tbody>
          <CountriesTotal :countriesTotal="countriesTotal"></CountriesTotal>
          <Country
            v-for="country in countries"
            :key="country.countryInfo._id"
            :country="country"
          ></Country>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import CountriesTotal from "../components/CountriesTotal";
import Country from "../components/Country";

export default {
  name: "Home",
  components: {
    CountriesTotal,
    Country,
  },
  data: () => ({
    loading: false,
    countriesTotal: {},
    countries: {},
  }),
  methods: {
    fetchData() {
      this.loading = true;

      this.axios
        .get("https://corona.lmao.ninja/all")
        .then((response) => {
          this.countriesTotal = response.data;
          //TODO: Add to vuex
          // this.$store.dispatch("getCountriesTotal", this.countriesTotal);
        })
        .catch((error) => {
          console.log(error);
        });

      this.axios
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
