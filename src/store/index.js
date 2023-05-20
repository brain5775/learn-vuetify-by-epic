import { createStore } from "vuex";
import axios from "axios";
import { Buffer } from "buffer";
import router from "@/router";

export default createStore({
  state: {
    prodId: "dfd822bb-358a-4b32-bc9f-641d91fec5b4",
    nonProdId: "99d47a03-76c7-4d15-87e1-93994e9cb4d5",
    redirect: import.meta.env.PROD
      ? "https://learn-vuetify-by-epic.vercel.app/"
      : "http://localhost:3000",
    tokenURL: "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
    clientSecret:
      "F1FCl5iaMXDbj3ioavuwU7BmZAJTyZUSkKTe5tRPGi6K6omcTEACJZc3xqN9hMdNzl7GSbChagbXunlSTUKMVA==",
    patientURL:
      "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/",
    observationURL:
      "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation",
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async SET_TOKEN({ commit, state }, code) {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", state.redirect);
      const config = {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${state.nonProdId}:${state.clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      try {
        const response = await axios.post(state.tokenURL, params, config);
        const token = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refreshToken);
        router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
