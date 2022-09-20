<template>
	<div>
		<HeaderVue BgHeader="bg-gray-50" />

		<div v-if="!pending">
			<div v-if="data.length !== 0">
				<h2 class="text-xl font-bold sm:text-2xl text-center mt-10">
					All Questions asked by players
				</h2>
				<UserQuestionVue :question="question" v-for="question in data" />
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
import { ref } from "vue";
import { useQuestionStore } from "../stores/question";

export default {
	setup() {
		const questionStore = useQuestionStore();

		const { pending, data } = useLazyAsyncData("question", () =>
			$fetch("/api/questions")
		);

		questionStore.setQuestion(data);

		return {
			data,
			pending
		};
	}
};
</script>

<style lang="scss" scoped></style>
