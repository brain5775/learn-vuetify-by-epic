<template>
  <v-container class="main-container">
    <ParticleVue />
    <v-card width="400px" height="400px" class="text-center">
      <v-row class="fill-height" align="center">
        <v-col cols="12">
          <v-card-title>
            <h2>Login</h2>
          </v-card-title>
          <v-card-item>
            <v-btn color="deep-purple-darken-3" @click.prevent="signIn()" flat>
              Authorize
            </v-btn>
            {{ exp }}
          </v-card-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import FHIR from "fhirclient";
import store from "@/store";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ParticleVue from "@/components/Particle.vue";

const route = useRoute();

const code = ref();
const exp = computed(() => store.state.tokenExp);

const signIn = () => {
  FHIR.oauth2.authorize({
    clientId: computed(() => store.state.nonProdId).value,
    redirectUri: computed(() => store.state.redirect).value,
    iss: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
    aud: "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4",
  });
};

onMounted(() => {
  code.value = route.query.code;
  if (code.value) {
    store.dispatch("SET_TOKEN", code.value);
  }
});
</script>

<style scoped>
.main-container {
  min-height: 100vh;
  max-height: 100vh;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
::-webkit-scrollbar {
  display: none !important;
}
</style>
