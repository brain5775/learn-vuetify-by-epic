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
                    <v-list-item v-for="cat in category" :key="cat">
                      <v-list v-for="(CTC, idx) in cat.coding" :key="CTC">
                        <v-list-group :value="`CategoryCoding-${idx}`">
                          <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props">
                              <h3>Coding</h3>
                            </v-list-item>
                          </template>
                          <v-list-item>
                            <v-text-field
                              variant="underlined"
                              label="System"
                              v-model="CTC.system"
                            />
                            <v-text-field
                              variant="underlined"
                              label="Code"
                              v-model="CTC.code"
                            />
                            <v-text-field
                              variant="underlined"
                              label="Display"
                              v-model="CTC.display"
                            />
                          </v-list-item>
                        </v-list-group>
                      </v-list>
                      <v-list>
                        <v-list-item>
                          <v-text-field
                            variant="underlined"
                            label="Text"
                            v-model="cat.text"
                          />
                        </v-list-item>
                      </v-list>
                    </v-list-item>
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
                    <v-list-item>
                      <v-list v-for="(CDG, idx) in codeData.coding" :key="CDG">
                        <v-list-group :value="`CodingData-${idx}`">
                          <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props">
                              <h3>Coding</h3>
                            </v-list-item>
                          </template>
                          <v-list-item>
                            <v-text-field
                              variant="underlined"
                              label="System"
                              v-model="CDG.system"
                            />
                            <v-text-field
                              variant="underlined"
                              label="Code"
                              v-model="CDG.code"
                            />
                            <v-text-field
                              variant="underlined"
                              label="Display"
                              v-model="CDG.display"
                            />
                          </v-list-item>
                        </v-list-group>
                      </v-list>
                      <v-list>
                        <v-list-item>
                          <v-text-field
                            variant="underlined"
                            label="Text"
                            v-model="codeData.text"
                          />
                        </v-list-item>
                      </v-list>
                    </v-list-item>
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
                    <v-list-item>
                      <v-text-field
                        variant="underlined"
                        label="Reference"
                        v-model="encounterReference.reference"
                      />
                    </v-list-item>
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
                    <v-list-item>
                      <v-text-field
                        variant="underlined"
                        label="Reference"
                        v-model="subject.reference"
                      />
                      <v-text-field
                        variant="underlined"
                        label="Display"
                        v-model="subject.display"
                      />
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
                    <v-list-item>
                      <v-text-field
                        variant="underlined"
                        label="Value"
                        v-model="valueQuantity.value"
                      />
                      <v-text-field
                        variant="underlined"
                        label="Unit"
                        v-model="valueQuantity.unit"
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
import { uid } from "uid";
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const open = ref([
  "categoryModal",
  "codeModal",
  "encounterModal",
  "subjectModal",
  "valueQuantityModal",
  "noteModal",
]);

const code = ref();
const accessToken = ref();
const patient = ref();
const patientData = ref({});
const prodId = ref("ef2a542f-6bc4-4cbf-85f7-e4a1e667cf75");
const nonProdId = ref("75b02f74-0533-46a9-8f2c-54793e00b522");

const redirect = ref(
  import.meta.env.PROD
    ? "https://learn-vuetify-by-epic-brain5775.vercel.app/"
    : "http://localhost:3000"
);

const clientId = ref(import.meta.env.PROD ? prodId.value : nonProdId.value);
// const clientId = ref(nonProdId.value);

const authorize = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize"
);
const tokenUrl = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
);

const state = ref();
// state.value = uid(10);
state.value = "Asdfa1321231";

const authorizeLink = computed(
  () =>
    `${authorize.value}?response_type=code&client_id=${clientId.value}&state=${state.value}&redirect_uri=${redirect.value}`
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
    params.append("state", state.value);

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

/* DATA */
const resourceType = ref("Observation");
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
const codeData = reactive({
  coding: [
    {
      system: "urn:oid:1.2.840.114350.1.13.0.1.7.2.707679",
      code: 14,
      display: "Weight",
    },
  ],
  text: "Weight",
});
const encounterReference = reactive({
  reference: "Encounter/es09oReoYsZk20hcbnd7r4A3",
});
const subject = reactive({
  reference: "Patient/eAB3mDIBBcyUKviyzrxsnAw3",
  display: "Desiree Powell",
});
const valueQuantity = reactive({ value: 65, unit: "KG" });
const effectiveDateTime = ref("2019-07-29T12:30:00Z");
const note = reactive([{ text: "Filed via FHIR" }]);
/* Functions */
const submit = async () => {
  try {
    await axios.post(
      urlTemplate,
      {
        resourceType: resourceType.value,
        category: category,
        code: codeData,
        encounter: encounterReference,
        subject: subject,
        effectiveDateTime: effectiveDateTime.value,
        valueQuantity: valueQuantity,
        note: note,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
  } catch (err) {
    console.log(err.code);
  }
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
