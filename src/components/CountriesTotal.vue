<template>
  <v-simple-table
    dark
    v-if="countriesTotal && Object.keys(countriesTotal).length > 1"
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
        <th class="text-center text-uppercase">Tests</th>
      </tr>
      </thead>
      <tbody>
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
                countriesTotal.cases
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
              <v-chip
                class="ma-2"
                color="red"
                small
                text-color="white"
                v-if="countriesTotal.todayCases > 0"
              >
                + {{ countriesTotal.todayCases }}
              </v-chip>
              <v-chip
                class="ma-2"
                color="lime"
                small
                text-color="black"
                v-else
              >
                0
              </v-chip>
            </v-row>
          </td>
          <!-- Active -->
          <td>
            <v-row align="center" justify="center">
              <strong class="title">{{
                countriesTotal.active
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
            </v-row>
          </td>
          <!-- Recovered -->
          <td>
            <v-row align="center" justify="center">
              <strong class="title">{{
                countriesTotal.recovered
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
            </v-row>
          </td>
          <!-- Critical -->
          <td>
            <v-row align="center" justify="center">
              <strong class="title">{{
                countriesTotal.critical
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
            </v-row>
          </td>
          <!-- Deaths -->
          <td>
            <v-row align="center" justify="center">
              <strong class="title">{{
                countriesTotal.deaths
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
              <v-chip
                class="ma-2"
                small
                v-if="countriesTotal.todayDeaths > 0"
              >
                + {{ countriesTotal.todayDeaths }}
              </v-chip>
              <v-chip
                class="ma-2"
                color="lime"
                small
                text-color="black"
                v-else
              >
                0
              </v-chip>
            </v-row>
          </td>
          <!-- Total Tests -->
          <td>
            <v-row align="center" justify="center">
              <strong class="title">{{
                countriesTotal.tests
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                }}</strong>
            </v-row>
          </td>
        </tr>
      </template>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    name: 'CountriesTotal',
    props: {
      countriesTotal: {
        type: Object,
        required: true,
        validator: (value) => {
          return value.cases > 0
        },
      },
    },
    data: () => ({
      //
    }),
  }
</script>
