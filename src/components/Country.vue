<template>
  <tr>
    <!-- Country -->
    <td>
      <v-row align="center" justify="center">
        <v-avatar size="20">
          <v-img
            v-if="countryData.countryInfo.flag"
            lazy-src="../assets/image/lazy.jpeg"
            :src="countryData.countryInfo.flag"
            :alt="countryData.country"
          ></v-img>
          <v-icon v-else dark>mdi-alert-circle-outline</v-icon>
        </v-avatar>
        <div class="mx-2"></div>
        <strong class="title">{{ countryData.country }}</strong>
      </v-row>
    </td>
    <!-- Cases -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.cases).toLocaleString("ru") }}
        <v-chip
          v-if="countryData.todayCases > 0"
          class="ma-2"
          small
          color="red"
          text-color="white"
        >
          + {{ countryData.todayCases }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </v-row>
    </td>
    <!-- Active -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.active).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Recovered -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.recovered).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Critical -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.critical).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Deaths -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.deaths).toLocaleString("ru") }}
        <v-chip v-if="countryData.todayDeaths > 0" class="ma-2" small>
          + {{ countryData.todayDeaths }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </v-row>
    </td>
    <!-- Cases per Million -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.casesPerOneMillion).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Deaths per Million -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.deathsPerOneMillion).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Tests per Million -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.testsPerOneMillion).toLocaleString("ru") }}
      </v-row>
    </td>
    <!-- Total Tests -->
    <td>
      <v-row align="center" justify="center">
        {{ parseFloat(countryData.tests).toLocaleString("ru") }}
      </v-row>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Country",
  props: {
    country: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.cases > 0;
      },
    },
  },
  data: () => ({
    countryData: {
      country: "",
      countryInfo: {
        iso2: "",
        iso3: "",
        lat: 0,
        long: 0,
        flag: "",
      },
      updated: 0,
      cases: 0,
      todayCases: 0,
      deaths: 0,
      todayDeaths: 0,
      recovered: 0,
      active: 0,
      critical: 0,
      casesPerOneMillion: 0,
      deathsPerOneMillion: 0,
      tests: 0,
      testsPerOneMillion: 0,
    },
  }),
  mounted: function() {
    this.countryData = this.country;
  },
};
</script>
