<template>
  <div id="tsparticles"></div>
</template>

<script setup>
import { tsParticles } from "tsparticles-engine";

tsParticles
  .loadJSON("tsparticles", "presets/default.json")
  .then((container) => {
    console.log("callback - tsparticles config loaded");
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<style lang="scss" scoped></style>
