<template>
  <v-card variant="flat">
    <v-card-title> Observation </v-card-title>
    <v-card-item>
      <v-tabs v-model="tab" color="deep-purple-accent-4">
        <v-tab :value="1">Observation Search</v-tab>
        <v-tab :value="2">Observation Create</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1">
          <searchVue />
        </v-window-item>
        <v-window-item :value="2">
          <createVue />
        </v-window-item>
      </v-window>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import searchVue from "@/components/observation/search.vue";
import createVue from "@/components/observation/create.vue";
const tab = ref();
</script>

<style lang="scss" scoped></style>
