<template>
  <v-container class="main-container">
    <ParticleVue />
    <v-card width="400px" height="400px" class="text-center">
      <v-row class="fill-height" align="center">
        <v-col cols="12">
          <v-card-title>
            <h2>Page Doesn't Exist</h2>
          </v-card-title>
          <v-card-text> Please go back to SignIn! </v-card-text>
          <v-card-item>
            <v-btn color="deep-purple-darken-3" :to="{ name: 'SignIn' }" flat>
              Go To Home
            </v-btn>
          </v-card-item>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import ParticleVue from "@/components/Particle.vue";
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
