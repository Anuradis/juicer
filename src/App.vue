<template>
  <div id="app">
    <Navbar />
    <router-link to="/about">About</router-link>
    <router-link to="/">Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    Navbar
  }
};
</script>
<style></style>
