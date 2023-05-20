<template>
  <v-card variant="flat">
    <v-card-title> Patient </v-card-title>
    <v-card-text class="text-end">
      <v-form @submit.prevent="getPatient()">
        <v-text-field
          variant="underlined"
          label="Patient ID"
          v-model="patientId"
          placeholder="eAB3mDIBBcyUKviyzrxsnAw3"
        ></v-text-field>
        <v-btn color="primary" type="submit">Get Patient</v-btn>
      </v-form>
    </v-card-text>
    <v-card-item>
      <h3>Response Data</h3>
      <pre class="output">{{ output }}</pre>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import store from "@/store";
const patientId = ref("eAB3mDIBBcyUKviyzrxsnAw3");
const token = localStorage.getItem("token");
const output = ref();

const getPatient = async () => {
  try {
    const response = await axios.get(
      `${store.state.patientURL}/${patientId.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    output.value = JSON.stringify(response.data, undefined, 2);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped></style>
