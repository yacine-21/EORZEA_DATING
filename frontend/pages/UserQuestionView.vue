<template>
	<div>
		<HeaderVue BgHeader="bg-gray-50" />

		<div v-if="!pending">
			<div v-if="AllQuestions.length !== 0">
				<h2 class="text-xl font-bold sm:text-2xl text-center mt-10">
					All Questions asked by players
				</h2>
				<UserQuestionVue :question="question" v-for="question in AllQuestions" />
			</div>
			<div v-else class="min-h-screen flex justify-center items-center">
				<h2 class="text-xl font-bold sm:text-2xl text-center">NO QUESTIONS NOW</h2>
			</div>
		</div>
		<div v-else>
			<SpinnerVue />
		</div>
		<FooterVue BgFooter="bg-gray-50" />
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuestionStore } from "../stores/question";

export default {
	setup() {
		const AllQuestions = ref([]);

		const questionStore = useQuestionStore();

		const header = {
			"Content-Type": "application/json"
		};

		const senduserInfo = async () => {
			const { data, error, pending, refresh } = await useFetch("/api/questions", {
				method: "get",
				headers: header
			});
			AllQuestions.value = data.value;
			// refresh();
		};

		senduserInfo();

		questionStore.setQuestion(AllQuestions);

		return {
			AllQuestions
		};
	}
};
</script>

<style lang="scss" scoped></style>
