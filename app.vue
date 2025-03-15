<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
const { setBaseUrl, onResponse, onResponseError } = useApiGlobleConfig();
setBaseUrl("https://fakestoreapi.com");
onResponse((res) => {
  console.log(res);
});
onResponseError((error) => {
  console.log(error.response);
});
await useApi("/products");
</script>
