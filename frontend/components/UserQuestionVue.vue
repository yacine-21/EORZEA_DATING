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

					<div v-if="showMessage">
						<div class="mt-2 text-gray-700 mb-10">
							<span class="underline">Answer</span> :
							<!-- {{ answers ? answers[0].answer.content : "no answer yet" }} -->
							<div v-if="answers.lenght == 0">
								<h1>no answer yet</h1>
							</div>
							<div v-else v-for="answer in answers">
								- {{ answer.answer.content }}
								<br />
							</div>
							<br />
							<button
								@click="toggleShowMessage"
								class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded-2xl"
							>
								Hide answers
							</button>
						</div>
					</div>
					<div v-else>
						<button
							@click="toggleShowMessage(question.id)"
							class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 mt-5 mb-5 rounded-2xl"
						>
							Show the answers
						</button>
					</div>

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
								{{ question.player.name }}
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
		const router = useRouter();

		const answerValue = ref({
			answer: "",
			id: props.question.id
		});

		const toggleShowMessage = id => {
			if (typeof id == "number") {
				fetchAnswer(id);
			}
			showMessage.value = !showMessage.value;
		};

		const isDataCorrect = ref(false);
		const errorData = ref("");
		const errorServerResponse = ref("");
		const showMessage = ref(false);
		const answers = ref([]);

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
			data.value.question.id && router.push({ path: "/FAQView" });
			refresh();
		};

		const fetchAnswer = async id => {
			const header = {
				"Content-Type": "application/json"
			};

			const { data, error, pending, refresh } = await useFetch(
				`/api/answer?idQuestion=${id}`,
				{
					method: "get",
					headers: header
				}
			);

			refresh();
			data.value && (answers.value = data.value);
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
			answerValue,
			fetchAnswer,
			toggleShowMessage,
			showMessage,
			answers
		};
	}
};
</script>

<style lang="scss" scoped></style>
