<template>
  <div class="countries-table" v-if="countries.length > 1">
    <v-data-table
      :expanded.sync="expanded"
      :headers="headers"
      :items="countries"
      :items-per-page="250"
      :loading="loading"
      :single-expand="true"
      @item-expanded="toggleExpanded($event)"
      class="elevation-1"
      disable-pagination
      fixed-header
      height="800"
      hide-default-footer
      item-key="country"
      show-expand
    >
      <template v-slot:item.country="{ item }">
        <v-row align="center" justify="center">
          <!--          TODO: Optimize -->
          <!--          <v-avatar size="20">-->
          <!--            <v-img-->
          <!--              :alt="item.country"-->
          <!--              :src="item.countryInfo.flag"-->
          <!--              lazy-src="../assets/image/lazy.jpeg"-->
          <!--              v-if="item.countryInfo.flag"-->
          <!--            ></v-img>-->
          <!--            <v-icon dark v-else>mdi-alert-circle-outline</v-icon>-->
          <!--          </v-avatar>-->
          <div class="mx-2"></div>
          <strong class="title">{{ item.country }}</strong>
        </v-row>
      </template>

      <template v-slot:item.cases="{ item }">
        {{ parseFloat(item.cases).toLocaleString("ru") }}
        <v-chip
          class="ma-2"
          color="red"
          small
          text-color="white"
          v-if="item.todayCases > 0"
        >
          + {{ item.todayCases }}
        </v-chip>
        <v-chip
          class="ma-2"
          color="red"
          small
          text-color="white"
          v-else-if="getYesterdayByKey(item, 'todayCases') > 0"
        >
          + {{ getYesterdayByKey(item, "todayCases") }}
        </v-chip>
        <v-chip class="ma-2" color="lime" small text-color="black" v-else>
          0
        </v-chip>
      </template>

      <template v-slot:item.recovered="{ item }">
        {{ parseFloat(item.recovered).toLocaleString("ru") }}
        <v-chip
          class="ma-2"
          color="lime"
          small
          text-color="black"
          v-if="getTodayRecovered(item)"
        >
          + {{ getTodayRecovered(item) }}
        </v-chip>
        <v-chip class="ma-2" color="red" small text-color="white" v-else>
          {{ getTodayRecovered(item) }}
        </v-chip>
      </template>

      <template v-slot:item.deaths="{ item }">
        {{ parseFloat(item.deaths).toLocaleString("ru") }}
        <v-chip class="ma-2" small v-if="item.todayDeaths > 0">
          + {{ item.todayDeaths }}
        </v-chip>
        <v-chip class="ma-2" small v-else-if="item.todayDeaths === 0">
          + {{ getYesterdayByKey(item, "todayDeaths") }}
        </v-chip>
        <v-chip class="ma-2" color="lime" small text-color="black" v-else>
          0
        </v-chip>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container fluid v-if="!loadingSparkline">
            <v-sparkline
              :auto-line-width="false"
              :fill="false"
              :gradient="['red', 'orange', 'yellow']"
              :gradient-direction="'top'"
              :line-width="2"
              :padding="8"
              :show-labels="false"
              :smooth="10"
              :stroke-linecap="'round'"
              :type="'trend'"
              :value="timeline"
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
    loading: {
      type: Boolean,
      required: true,
    },
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
      // {
      //   text: 'Tests/Million',
      //   align: 'center',
      //   value: 'testsPerOneMillion',
      //   class: 'text-center text-uppercase',
      // },
    ],
    loadingSparkline: false,
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
    async toggleExpanded(event) {
      if (this.expandedCountry.country === event.item.country) {
        this.loadingSparkline = false;

        return;
      }

      this.loadingSparkline = true;

      await this.axios
        .get(
          "https://corona.lmao.ninja/v2/historical/" +
            event.item.country +
            "?lastdays=30"
        )
        .then((response) => {
          this.expandedCountry = response.data;
          this.loadingSparkline = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTodayRecovered(item) {
      if (this.countriesYesterday && this.countriesYesterday.length > 0) {
        const yesterday = this.countriesYesterday.find(
          (element) => element.country === item.country
        );

        if (yesterday && yesterday.recovered) {
          return item.recovered - yesterday.recovered;
        }
      }

      return 0;
    },
    getYesterdayByKey(item, key) {
      if (this.countriesYesterday && this.countriesYesterday.length > 0) {
        const yesterday = this.countriesYesterday.find(
          (element) => element.country === item.country
        );

        if (yesterday && yesterday[key]) {
          return yesterday[key] + item[key];
        }

        return item[key];
      }

      return item[key];
    },
  },
  computed: {
    timeline() {
      const cases = Object.values(this.expandedCountry.timeline.cases);
      const recovered = Object.values(this.expandedCountry.timeline.recovered);
      const result = [];

      for (var i = 0; i <= cases.length - 1; i++)
        result.push(cases[i] - recovered[i]);

      return result;
    },
  },
  mounted: function() {
    //
  },
};
</script>

<style scoped></style>
