<template>
  <v-app>
    <v-row>
      <v-col cols="3" v-if="route.meta.requiresAuth" class="border">
        <Navigation />
      </v-col>
      <v-col>
        <router-view />
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<style>
html,
body,
.app {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.output {
  height: 500px;
  border: 1px solid gray;
  background-color: antiquewhite;
  overflow: scroll;
  display: block;
  font-family: Consolas, monaco, monospace;
  white-space: pre;
}

::-webkit-scrollbar {
  display: none;
}
</style>
