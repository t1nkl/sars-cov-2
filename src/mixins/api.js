export default {
  methods: {
    async getTotalCountries(callback) {
      await this.axios
        .get("https://corona.lmao.ninja/v2/all")
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getCountries(callback) {
      await this.axios
        .get("https://corona.lmao.ninja/v2/countries")
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    async getYesterdayCountries(callback) {
      await this.axios
        .get("https://corona.lmao.ninja/v2/countries?yesterday=true")
        .then((response) => {
          callback(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
