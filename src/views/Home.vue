<template>
  <v-container>
    <v-card variant="plain">
      <v-card-item class="text-center">
        <v-btn
          v-bind:href="authorizeLink"
          target="_blank"
          v-if="!accessToken"
          color="deep-purple-darken-3"
        >
          Authorize
        </v-btn>
        <v-btn @click="showPatient" color="light-blue-darken-2" v-else
          >Show Patient</v-btn
        >
      </v-card-item>
    </v-card>
    <v-card theme="light">
      <v-card-title>
        <h3>Patient Form</h3>
      </v-card-title>
      <v-card-item>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <label><h4>URL Template</h4></label>
                <p>{{ urlTemplate }}</p>
              </v-col>
              <v-col cols="12">
                <v-card variant="plain">
                  <v-card-title> Request </v-card-title>
                  <v-card-text>
                    <v-text-field
                      variant="underlined"
                      label="resourceType"
                      v-model="resourceType"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="categoryModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Category</h3>
                      </v-list-item>
                    </template>

                    <v-list-item>test</v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="codeModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Code</h3>
                      </v-list-item>
                    </template>
                    <v-list-item>test</v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="encounterModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Encounter</h3>
                      </v-list-item>
                    </template>
                    <v-list-item>Reference</v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="subjectModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Subject</h3>
                      </v-list-item>
                    </template>
                    <v-list-item v-for="sub in subject" :key="sub">
                      <v-text-field />
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list>
                  <v-list-item>
                    <v-text-field
                      variant="underlined"
                      label="effectiveDateTime"
                      v-model="effectiveDateTime"
                    />
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="valueQuantityModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Value Quantity</h3>
                      </v-list-item>
                    </template>
                    <v-list-item v-for="VQ in valueQuantity" :key="VQ">
                      <v-text-field
                        variant="underlined"
                        label="Value"
                        v-model="VQ.value"
                      />
                      <v-text-field
                        variant="underlined"
                        label="Unit"
                        v-model="VQ.unit"
                      />
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-list v-model:opened="open">
                  <v-list-group value="noteModal">
                    <template v-slot:activator="{ props }">
                      <v-list-item v-bind="props">
                        <h3>Note</h3>
                      </v-list-item>
                    </template>
                    <v-list-item v-for="noteText in note" :key="noteText">
                      <v-text-field
                        variant="underlined"
                        label="Text"
                        v-model="noteText.text"
                      />
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-col>
              <v-col cols="12" align="end">
                <v-btn color="primary" flat @click="submit"> Submit </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const open = ref();

const cruds = ref([
  ["Create", "mdi-plus-outline"],
  ["Read", "mdi-file-outline"],
  ["Update", "mdi-update"],
  ["Delete", "mdi-delete"],
]);

const code = ref();
const accessToken = ref();
const patient = ref();
const patientData = ref({});
const clientId = ref("5105c355-5e30-4435-9d8c-e6ddbe8fe2fe");
const redirect = ref("http://localhost:3000");
const authorize = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize"
);
const tokenUrl = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
);

const authorizeLink = computed(
  () =>
    `${authorize.value}?response_type=code&client_id=${clientId.value}&state=abc123&redirect_uri=${redirect.value}`
);

onMounted(async () => {
  localStorage.clear();
  code.value = route.query.code;
  accessToken.value = localStorage.getItem("token");
  patient.value = localStorage.getItem("patient");
  if (code.value) {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("redirect_uri", redirect.value);
    params.append("code", code.value);
    params.append("client_id", clientId.value);
    params.append("state", "abc123");

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    await axios
      .post(
        "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
        params,
        config
      )
      .then((response) => {
        accessToken.value = response.data.access_token;
        patient.value = response.data.patient;
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("patient", response.data.patient);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const showPatient = async () => {
  try {
    const response = await axios.get(
      `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/${patient.value}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    const data = response.data;
    patientData.value = data;
    console.log(patientData.value);
  } catch (error) {
    console.log(error);
  }
};

const formatDate = async (val) => {
  const yyyy = val.getFullYear();
  const mm = val.getMonth();
  const dd = val.getDate();
  const hh = val.getHours();
  const min = val.getMinutes();
  const sec = val.getSeconds();
  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${sec}Z`;
};

/* SEND DATA */
const urlTemplate = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation"
);
/* RESOURCE TYPE */
const resourceType = ref("Observation");
/* CATEGORY DATA */
const category = reactive([
  {
    coding: [
      {
        system: "http://hl7.org/fhir/observation-category",
        code: "vital-signs",
        display: "Vital Signs",
      },
    ],
    text: "Vital Signs",
  },
]);

const categoryData = ref();
const encounterData = ref();
const codeData = ref();

const subject = reactive([
  { reference: "Patient/eAB3mDIBBcyUKviyzrxsnAw3", display: "Desiree Powell" },
]);
const valueQuantity = reactive([{ value: 65, unit: "KG" }]);
const effectiveDateTime = ref("2019-07-29T12:30:00Z");
const note = reactive([{ text: "Filed via FHIR" }]);

const submit = () => {
  console.log(codeData.value);
};
</script>

<style scoped>
.card {
  display: flex;
  place-content: center;
}

.blue {
  color: blue;
}

.pointer {
  cursor: pointer;
}
</style>
