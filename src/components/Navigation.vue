<template>
  <v-list nav>
    <v-list-item
      prepend-icon="mdi-account-injury-outline"
      title="Patient"
      value="patient"
      :to="{ name: 'Patient' }"
    ></v-list-item>
    <v-list-item
      prepend-icon="mdi-doctor"
      title="Clinician/Staff"
      value="observation"
      :to="{ name: 'Observation' }"
    ></v-list-item>
    <v-list-item
      prepend-icon="mdi-logout"
      title="Sign Out"
      value="logout"
      color="red"
      active
      @click.prevent="logout"
    ></v-list-item>
  </v-list>
</template>

<script setup>
import router from "@/router";
const logout = () => {
  localStorage.clear();
  router.push({ name: "SignIn" });
};
</script>

<style lang="scss" scoped></style>
