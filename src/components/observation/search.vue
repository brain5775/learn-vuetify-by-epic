<template>
  <v-card>
    <v-card-item class="text-end">
      <v-form @submit.prevent="searchObservation()">
        <v-text-field
          variant="underlined"
          label="Patient"
          v-model="patient"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="Subject"
          v-model="subject"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="Code"
          v-model="code"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="Date"
          v-model="date"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="Category"
          v-model="category"
        ></v-text-field>
        <v-text-field
          variant="underlined"
          label="_id"
          v-model="id"
        ></v-text-field>
        <v-btn color="secondary" @click.prevent="download">Download</v-btn
        >&nbsp;&nbsp;&nbsp;
        <v-btn color="primary" type="submit"> Search Observation </v-btn>
      </v-form>
    </v-card-item>
    <v-card-item>
      <pre class="output">{{ output }}</pre>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import store from "@/store";
import FileDownload from "js-file-download";

const patient = ref("e63wRTbPfr1p8UW81d8Seiw3");
const subject = ref("");
const code = ref("");
const date = ref("");
const category = ref("vital-signs");
const id = ref("");

const output = ref();
const token = localStorage.getItem("token");

const searchObservation = async () => {
  let newObservationURL = new URL(`${store.state.observationURL}`);
  if (patient.value) {
    newObservationURL.searchParams.append("patient", patient.value);
  }
  if (subject.value) {
    newObservationURL.searchParams.append("subject", subject.value);
  }
  if (code.value) {
    newObservationURL.searchParams.append("code", code.value);
  }
  if (date.value) {
    newObservationURL.searchParams.append("date", date.value);
  }
  if (category.value) {
    newObservationURL.searchParams.append("category", category.value);
  }
  //   if(id.value){
  //     newObservationURL = new URL(newObservationURL)
  //   }
  try {
    const response = await axios.get(`${newObservationURL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    output.value = JSON.stringify(response.data, undefined, 2);
  } catch (error) {
    console.log(error);
  }
};
const download = async () => {
  let newObservationURL = new URL(`${store.state.observationURL}`);
  if (patient.value) {
    newObservationURL.searchParams.append("patient", patient.value);
  }
  if (subject.value) {
    newObservationURL.searchParams.append("subject", subject.value);
  }
  if (code.value) {
    newObservationURL.searchParams.append("code", code.value);
  }
  if (date.value) {
    newObservationURL.searchParams.append("date", date.value);
  }
  if (category.value) {
    newObservationURL.searchParams.append("category", category.value);
  }
  //   if(id.value){
  //     newObservationURL = new URL(newObservationURL)
  //   }
  try {
    const response = await axios({
      url: `${newObservationURL}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "observation.json");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
