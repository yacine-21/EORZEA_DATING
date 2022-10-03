<template>
	<HeaderVue BgHeader="bg-gray-50" />

	<div class="space-y-4 min-h-full">
		<h1 class="text-6xl text-center mb-10 mt-10">
			<span class="text-violet-500">Frequently</span>
			Asked Questions
		</h1>
		<p
			class="text-gray-600 max-w-lg mx-auto text-2xl text-center justify-center mt-10 mb-5"
		>
			Answered all frequently asked questions, Still confused ? feel free to
			contact us bellow.
		</p>
		<hr />
	</div>

	<div class="space-y-4 min-h-full">
		<h1 class="text-6xl text-center mb-10 mt-10">
			<span class="text-violet-500">Or</span>
			you can view
			<span class="text-violet-500 underline">
				<a href="/UserQuestionView">questions</a>
			</span>
			<br />
			asked by other players
		</h1>
	</div>

	<div
		v-for="frenquentlyAskedQuestion in frenquentlyAskedQuestions"
		class="space-y-4 min-h-full"
	>
		<QuestionVue
			borderColor="border-green-500"
			:questionText="frenquentlyAskedQuestion"
		/>
	</div>

	<section class="relative flex flex-wrap lg:h-screen lg:items-center">
		<div class="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
			<div class="max-w-lg mx-auto text-center">
				<h1 class="text-2xl font-bold sm:text-3xl">
					Feel free to ask your <span class="text-violet-500">question</span> !
				</h1>

				<p class="mt-4 text-gray-500 mb-5">
					*your question will be answerd within 2 weeks
				</p>
				<div v-if="errorData.length !== 0" class="mt-4 text-gray-500">
					<h1 class="text-2xl text-red-500 text-center">{{ errorData }}</h1>
				</div>
			</div>

			<form @submit.prevent class="space-y-4">
				<div>
					<label class="sr-only" for="name">Name</label>
					<input
						v-model="questionInfo.name"
						class="w-full p-3 text-sm border-violet-500 border-2 outline-none rounded-lg"
						placeholder="Name"
						type="text"
						id="name"
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label class="sr-only" for="email">Email</label>
						<input
							v-model="questionInfo.email"
							class="w-full p-3 text-sm border-violet-500 border-2 outline-none rounded-lg"
							placeholder="Email address"
							type="email"
							id="email"
						/>
					</div>
				</div>
				<div>
					<label class="sr-only" for="title">title</label>
					<textarea
						v-model="questionInfo.title"
						class="w-full p-3 text-sm border-violet-500 border-2 outline-none rounded-lg"
						placeholder="title"
						rows="8"
						id="title"
					></textarea>
				</div>

				<div class="mt-4">
					<button
						@click="handleSubmit"
						type="submit"
						class="inline-flex items-center justify-center w-full px-5 py-3 text-white bg-violet-500 rounded-lg sm:w-auto"
					>
						<span class="font-medium"> Send Question </span>

						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-5 h-5 ml-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>

		<div class="relative w-full h-30 sm:h-96 lg:w-1/2 lg:h-full">
			<img
				alt="Question Mark"
				src="/images/questionMark.png"
				class="absolute inset-0 object-cover w-full h-full rounded-xl"
			/>
		</div>
	</section>

	<FooterVue BgFooter="bg-gray-50" />
</template>

<script>
import * as yup from "yup";
import { ref, watch } from "vue";
import { da } from "@formkit/i18n";

export default {
	setup() {
		const questionInfo = ref({
			name: "",
			email: "",
			title: ""
		});
		const isDataCorrect = ref(false);
		const errorData = ref("");
		const errorServerResponse = ref();
		const frenquentlyAskedQuestions = ref([]);

		let schema = yup.object().shape({
			email: yup.string().email().required(),
			name: yup.string().required(),
			title: yup.string().required()
		});

		const clearInput = () => {
			questionInfo.value = {};
		};

		const senduserInfo = async () => {
			const header = {
				"Content-Type": "application/json"
			};

			const { data, error, pending, refresh } = await useFetch("/api/question", {
				method: "post",
				body: questionInfo.value,
				headers: header
			});

			data.value && clearInput();
			// data.value.id && sendToast(2000);
			errorServerResponse.value = data.value;
		};

		const fetchFrequentlyAskedQuestions = async () => {
			const header = {
				"Content-Type": "application/json"
			};

			const { data, error, pending, refresh } = await useFetch(
				"/api/questionFrequentlyAsked",
				{
					method: "get",
					headers: header
				}
			);
			frenquentlyAskedQuestions.value = data.value;
		};
		fetchFrequentlyAskedQuestions();

		const checkInfo = () => {
			schema
				.validate(questionInfo.value)
				.then(res => {
					isDataCorrect.value = true;
					questionInfo.value = res;
				})
				.catch(function (err) {
					errorData.value = err.message;
				});
		};

		const handleSubmit = () => {
			checkInfo();
		};

		watch(isDataCorrect, (NewValue, OldValue) => {
			NewValue == true && senduserInfo();
		});

		watch(errorData, (NewValue, OldValue) => {});

		return {
			questionInfo,
			handleSubmit,
			errorServerResponse,
			errorData,
			frenquentlyAskedQuestions
		};
	}
};
</script>

<style lang="scss" scoped></style>
