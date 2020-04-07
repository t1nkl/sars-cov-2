<template>
  <div>
    <v-app-bar app>
      <header-layout></header-layout>
    </v-app-bar>

    <transition mode="out-in" name="page">
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </transition>

    <v-footer app>
      <footer-layout></footer-layout>
    </v-footer>
  </div>
</template>

<script>
import headerLayout from "./Header";
import footerLayout from "./Footer";

export default {
  name: "Elementor",
  components: {
    "header-layout": headerLayout,
    "footer-layout": footerLayout,
  },
  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped></style>
