<template>
	<div class="bg-slate-300 mb-4" v-for="user in users">
		<h1 class="underline">{{ user.id }}</h1>
		<p>{{ user.name }}</p>
		<p>{{ user.email }}</p>
		<p>{{ user.password }}</p>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";

const { data, error, pending, refresh } = await useFetch("/api/user", {
	method: "post",
	body: { test: 123 }
});
console.log("====================================");
console.log(data.value);
console.log("====================================");
const users = ref(data.value);
</script>

<style lang="scss" scoped></style>
