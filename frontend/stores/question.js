import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore("question", () => {
	const question = ref([]);

	const setQuestion = questionArray => {
		question.value = questionArray;
	};

	return {
		question,
		setQuestion
	};
});
