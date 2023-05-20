<template>
  <v-container>
    <v-card variant="plain">
      <v-card-item class="text-center" v-if="!accessToken">
        <v-btn color="deep-purple-darken-3" @click="goAuthorize" flat>
          Authorize
        </v-btn>
      </v-card-item>
      <v-card-item v-else>
        <v-row>
          <v-col>
            <v-btn @click="showPatient" color="light-blue-darken-2" flat>
              Show Patient
            </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="showObservation" color="light-blue-darken-2" flat>
              Show Observation
            </v-btn>
          </v-col>
          <v-col>
            <v-btn @click="showToday" color="light-blue-darken2" flat>
              Today
            </v-btn>
          </v-col>
        </v-row>
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
import FHIR from "fhirclient";
import Swal from "sweetalert2";

const route = useRoute();

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

// const clientId = ref(import.meta.env.PROD ? prodId.value : nonProdId.value);
const clientId = ref(nonProdId.value);

const authorize = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize"
);
const tokenUrl = ref(
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
);

const authorizeLink = computed(
  () =>
    `${authorize.value}?response_type=code&client_id=${clientId.value}&state=${state.value}&redirect_uri=${redirect.value}`
);

const patient = ref("eAB3mDIBBcyUKviyzrxsnAw3");
const observationCategory = ref("vital-signs");
const patientData = ref({});
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
    console.log("PATIENT DATA: ", patientData.value);
  } catch (error) {
    console.log(error);
  }
};

const showToday = () => {
  console.log(new Date());
};

const showObservation = async () => {
  try {
    const response = await axios.get(
      `https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Observation?patient=${patient.value}&category=${observationCategory.value}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );
    console.log(response);
    console.log(response.data);
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
    const response = await axios.post(
      urlTemplate.value,
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
    if (response) {
      let timerInterval;
      Swal.fire({
        title: "Data Send Successfully",
        timer: 2000,
        timerProgressBar: true,
        icon: "success",
        didOpen: () => {
          // Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      console.log(response);
      console.log(response.headers.location);
    }
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
