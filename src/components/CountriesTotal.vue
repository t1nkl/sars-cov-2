<template>
  <tr>
    <!-- Country -->
    <td>
      <v-row align="center" justify="center">
        <v-avatar size="20">
          <v-icon dark>mdi-alert-circle-outline</v-icon>
        </v-avatar>
        <div class="mx-2"></div>
        <strong class="title">World</strong>
      </v-row>
    </td>
    <!-- Cases -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
        <v-chip
          v-if="countriesTotal.todayCases > 0"
          class="ma-2"
          small
          color="red"
          text-color="white"
        >
          + {{ countriesTotal.todayCases }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </v-row>
    </td>
    <!-- Active -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Recovered -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.recovered
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Critical -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.critical
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Deaths -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
        <v-chip v-if="countriesTotal.todayDeaths > 0" class="ma-2" small>
          + {{ countriesTotal.todayDeaths }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </v-row>
    </td>
    <!-- Cases per Million -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.casesPerOneMillion
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Deaths per Million -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.deathsPerOneMillion
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Tests per Million -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.testsPerOneMillion
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
    <!-- Total Tests -->
    <td>
      <v-row align="center" justify="center">
        <strong class="title">{{
          countriesTotal.tests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        }}</strong>
      </v-row>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CountriesTotal",
  props: {
    countriesTotal: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.cases > 0;
      },
    },
  },
  data: () => ({
    //
  }),
};
</script>
