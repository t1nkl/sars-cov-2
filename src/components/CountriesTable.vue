<template>
  <div class="countries-table" v-if="countries.length > 1">
    <v-data-table
      class="elevation-1"
      :headers="headers"
      :items="countries"
      item-key="country"
      :items-per-page="250"
      fixed-header
      disable-pagination
      hide-default-footer
      height="800"
      :single-expand="true"
      :expanded.sync="expanded"
      show-expand
      @item-expanded="toggleExpanded($event)"
    >
      <template v-slot:item.country="{ item }">
        <v-row align="center" justify="center">
          <v-avatar size="20">
            <v-img
              v-if="item.countryInfo.flag"
              lazy-src="../assets/image/lazy.jpeg"
              :src="item.countryInfo.flag"
              :alt="item.country"
            ></v-img>
            <v-icon v-else dark>mdi-alert-circle-outline</v-icon>
          </v-avatar>
          <div class="mx-2"></div>
          <strong class="title">{{ item.country }}</strong>
        </v-row>
      </template>

      <template v-slot:item.cases="{ item }">
        {{ parseFloat(item.cases).toLocaleString("ru") }}
        <v-chip
          v-if="item.todayCases > 0"
          class="ma-2"
          small
          color="red"
          text-color="white"
        >
          + {{ item.todayCases }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </template>

      <template v-slot:item.recovered="{ item }">
        {{ parseFloat(item.recovered).toLocaleString("ru") }}
        <v-chip
          v-if="
            (item.todayRecovered =
              item.recovered -
              countriesYesterday.find(
                (element) => element.country == item.country
              ).recovered) > 0
          "
          class="ma-2"
          small
          color="lime"
          text-color="black"
        >
          + {{ item.todayRecovered }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="red" text-color="white">
          {{ item.todayRecovered }}
        </v-chip>
      </template>

      <template v-slot:item.deaths="{ item }">
        {{ parseFloat(item.deaths).toLocaleString("ru") }}
        <v-chip v-if="item.todayDeaths > 0" class="ma-2" small>
          + {{ item.todayDeaths }}
        </v-chip>
        <v-chip v-else class="ma-2" small color="lime" text-color="black">
          0
        </v-chip>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container fluid>
            <v-sparkline
              :value="getTimelineCases()"
              :gradient="['red', 'orange', 'yellow']"
              :smooth="10"
              :padding="8"
              :line-width="2"
              :stroke-linecap="'round'"
              :gradient-direction="'top'"
              :fill="false"
              :type="'trend'"
              :auto-line-width="false"
              :show-labels="false"
              auto-draw
            ></v-sparkline>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "CountriesTable",
  props: {
    countries: {
      type: Array,
      required: true,
    },
    countriesYesterday: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    headers: [
      {
        text: "Country",
        align: "center",
        value: "country",
        class: "text-center text-uppercase",
      },
      {
        text: "Cases",
        align: "center",
        value: "cases",
        class: "text-center text-uppercase",
      },
      {
        text: "Active",
        align: "center",
        value: "active",
        class: "text-center text-uppercase",
      },
      {
        text: "Recovered",
        align: "center",
        value: "recovered",
        class: "text-center text-uppercase",
      },
      {
        text: "Critical",
        align: "center",
        value: "critical",
        class: "text-center text-uppercase",
      },
      {
        text: "Deaths",
        align: "center",
        value: "deaths",
        class: "text-center text-uppercase",
      },
      {
        text: "Tests",
        align: "center",
        value: "tests",
        class: "text-center text-uppercase",
      },
      {
        text: "Cases/Million",
        align: "center",
        value: "casesPerOneMillion",
        class: "text-center text-uppercase",
      },
      {
        text: "Deaths/Million",
        align: "center",
        value: "deathsPerOneMillion",
        class: "text-center text-uppercase",
      },
      {
        text: "Tests/Million",
        align: "center",
        value: "testsPerOneMillion",
        class: "text-center text-uppercase",
      },
    ],
    expandedCountry: {
      country: "",
      provinces: [],
      timeline: {
        cases: {},
        deaths: {},
        recovered: {},
      },
    },
  }),
  methods: {
    toggleExpanded(event) {
      if (this.expandedCountry.country === event.item.country) {
        return;
      }

      this.axios
        .get(
          "https://corona.lmao.ninja/v2/historical/" +
            event.item.country +
            "?lastdays=30"
        )
        .then((response) => {
          this.expandedCountry = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTimelineCases() {
      return Object.values(this.expandedCountry.timeline.cases);
    },
  },
  mounted: function() {
    //
  },
};
</script>

<style scoped></style>
