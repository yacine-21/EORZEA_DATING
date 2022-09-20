<template>
	<section>
		<div class="px-4 py-8 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
			<div class="mt-8 flex flex-col">
				<blockquote
					class="border-gray-200 border-4 rounded-3xl p-5 hover:bg-gray-100"
				>
					<header class="sm:items-center sm:flex">
						<p class="mt-2 font-medium sm:ml-4 sm:mt-0 underline">
							Question {{ question.id }} : {{ question.title }}
						</p>
					</header>

					<p class="mt-2 text-gray-700 mb-10">
						<span class="underline">Answer</span> :
						{{ question.answer ? question.answer : "no answer yet" }}
					</p>

					<form @submit.prevent>
						<label
							for="search"
							class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
							>Your Email</label
						>
						<div class="relative">
							<div
								class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
							>
								<img src="/images/reply-svgrepo-com.svg" alt="reply" />
							</div>
							<input
								v-model="answerValue.answer"
								type="search"
								id="search"
								class="block p-4 pl-10 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-30 focus:border-gray-30 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-30 dark:focus:border-gray-30"
								placeholder="Reply"
								required
							/>
							<button
								@click="handleSubmit"
								type="submit"
								class="text-white absolute right-2.5 bottom-2.5 bg-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Reply
							</button>
						</div>
					</form>
					<footer class="mt-4">
						<p class="text-gray-500 text-lg text-right">
							<span>
								{{ question.author.name }}
							</span>
							- {{ $formatDate(question.createdAt) }}
						</p>
					</footer>
				</blockquote>
			</div>
		</div>
	</section>
</template>

<script>
import { ref, watch } from "vue";
import * as yup from "yup";

export default {
	props: {
		question: {
			default: []
		}
	},

	setup(props) {
		const route = useRouter();

		const answerValue = ref({
			answer: "",
			id: props.question.id
		});

		const isDataCorrect = ref(false);
		const errorData = ref("");
		const errorServerResponse = ref("");

		let schema = yup.object().shape({
			answer: yup.string().required()
		});

		const clearInput = () => {
			answerValue.value = {
				idAnswer: props.question.id,
				answer: ""
			};
		};

		const senduserInfo = async () => {
			const header = {
				"Content-Type": "application/json"
			};

			const { data, error, pending, refresh } = await useFetch("/api/answer", {
				method: "post",
				body: answerValue.value,
				headers: header
			});

			data.value && clearInput();
			data.value == "WRONG CREDENTIALS PLEASE RETRY !"
				? (errorServerResponse.value = data.value)
				: "";
			data.value.question.id &&
				route.push({ path: "/FAQView", force: true, replace: true });
		};

		watch(isDataCorrect, (NewValue, OldValue) => {
			NewValue == true && senduserInfo();
		});

		watch(errorData, (NewValue, OldValue) => {
			console.log(NewValue);
		});

		const checkInfo = () => {
			schema
				.validate(answerValue.value)
				.then(res => {
					isDataCorrect.value = true;
					answerValue.value.answer = res.answer;
					answerValue.value.id;
				})
				.catch(function (err) {
					errorData.value = err.message;
				});
		};

		const handleSubmit = () => {
			checkInfo();
		};

		return {
			handleSubmit,
			question: props.question,
			answerValue
		};
	}
};
</script>

<style lang="scss" scoped></style>
