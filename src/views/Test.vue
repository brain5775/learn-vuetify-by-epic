<template>
  <div></div>
</template>

<script setup>
import { reactive } from "vue";

const test = reactive({
  resourceType: "Observation",
  category: [
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
  ],
  code: {
    coding: [
      {
        system: "urn:oid:1.2.840.114350.1.13.0.1.7.2.707679",
        code: "14",
        display: "Weight",
      },
    ],
    text: "Weight",
  },
  encounter: { reference: "Encounter/es09oReoYsZk20hcbnd7r4A3" },
  subject: {
    reference: "Patient/eAB3mDIBBcyUKviyzrxsnAw3",
    display: "Desiree Powell",
  },
  effectiveDateTime: "2019-07-29T12:30:00Z",
  valueQuantity: { value: "65", unit: "kg" },
  note: [{ text: "Filed via FHIR" }],
});
</script>

<style lang="scss" scoped></style>
