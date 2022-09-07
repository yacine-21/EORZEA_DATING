import { defineStore } from "pinia";
import { ref } from "vue";

export const useExtensionStore = defineStore("extension", () => {
	const extension = ref([]);

	const setExtension = extensionArray => {
		extension.value = extensionArray;
	};

	return {
		extension,
		setExtension
	};
});
