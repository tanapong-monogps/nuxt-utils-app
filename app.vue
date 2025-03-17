<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
const { setBaseUrl, onResponse, onResponseError, headers } =
  useApiGlobalConfig();
setBaseUrl("https://fakestoreapi.com");
headers().add("Authorization", "Bearer token");
headers().add("x-auth", "test auth");
</script>
