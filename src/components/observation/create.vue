<template>
  <v-card>
    <v-card-item>
      <v-form @submit.prevent="sendData()">
        <v-row>
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
            <v-btn color="primary" flat type="submit"> Submit </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-item>
    <v-card-item>
      <h3>Response Header</h3>
      <pre class="output">{{ output }}</pre>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import store from "@/store";
const open = ref([
  "categoryModal",
  "codeModal",
  "encounterModal",
  "subjectModal",
  "valueQuantityModal",
  "noteModal",
]);
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
const token = localStorage.getItem("token");
const output = ref();

const sendData = async () => {
  try {
    const response = await axios.post(
      store.state.observationURL,
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
          Authorization: `Bearer ${token}`,
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
      output.value = JSON.stringify(response, undefined, 2);
    }
  } catch (err) {
    console.log(err.code);
  }
};
</script>

<style lang="scss" scoped></style>
