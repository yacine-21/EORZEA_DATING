<template>
	<section class="relative flex flex-wrap lg:h-screen lg:items-center">
		<div class="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
			<div class="max-w-lg mx-auto text-center">
				<h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

				<p v-if="errorData.length !== 0" class="mt-4 text-gray-500">
					<h1 class="text-2xl text-red-500 text-center">{{ errorData }}</h1>
				</p>
			</div>

			<div v-if="errorServerResponse" class="max-w-lg mx-auto text-center">
				<h1 class="text-2xl text-red-500 text-center">{{errorServerResponse}}</h1>

			</div>

			<form  id="form" class="max-w-md mx-auto mt-8 mb-0 space-y-4" @submit.prevent>
				<div>
					<label for="email" class="sr-only">Email</label>

					<div class="relative">
						<input
							autocomplete="email"
							type="email"
							v-model="PlayerInfo.email"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-blue-100"
							placeholder="Enter email"
						/>

						<span class="absolute inset-y-0 inline-flex items-center right-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
								/>
							</svg>
						</span>
					</div>
				</div>

				<div>
					<label for="password" class="sr-only">Password</label>
					<div class="relative">
						<input
							autocomplete="current-password"
							v-model="PlayerInfo.password"
							:type="type"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-blue-100"
							placeholder="Enter password"
						/>

						<span @click.prevent="setPasswordShow" class="absolute inset-y-0 inline-flex items-center right-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-5 h-5 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
						</span>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<p class="text-sm text-gray-500">
						No account?
						<a class="underline text-blue-500" href="/SignUpView">Sign up</a>
					</p>

					<button
						@click="handleSubmit"
						type="submit"
						class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
		<div class="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full bg-blue-50">
			<img
				class="absolute inset-0 object-contain w-full h-full"
				src="images/finalfantasy2.png"
				alt="logo"
			/>
		</div>
	</section>
</template>

<script>
import { ref, watch } from "vue";
import * as yup from "yup";
export default {
	
	async setup() {

		const router = useRouter();

		const PlayerInfo = ref({
			email: "",
			password: ""
		});
		const type = ref("password");
		const passwordShow = ref(false);
		const isDataCorrect = ref(false);
		const errorData = ref("");
		const errorServerResponse = ref("")

		let schema = yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required().min(7)
		});

		const clearInput = () =>{
			PlayerInfo.value = {}
		}

		const sendPlayerInfo = async () =>{
			console.log("step 1");
			const header = {
				"Content-Type":"application/json",
			}
			const { data, error, pending, refresh } = await useFetch("/api/login", {
				method: "post",
				body: PlayerInfo.value,
				headers: header
			});
			data.value && clearInput()
			data.value == "WRONG CREDENTIALS PLEASE RETRY !" ? errorServerResponse.value = data.value : ""
			data.value.player && router.push({path:"/"})
			refresh()
		}

		const setPasswordShow = () =>{
			passwordShow.value = !passwordShow.value
		}

		const checkInfo = () => {
			
			schema
				.validate(PlayerInfo.value)
				.then(res => {
					isDataCorrect.value = true;
					PlayerInfo.value = res
					sendPlayerInfo()

				})
				.catch(function (err) {
					errorData.value = err.message;
				});
		};

		// watch(isDataCorrect, (NewValue, OldValue) => {
		// 	// console.log("here");
		// 	// NewValue == true && senduserInfo()
		// });

		watch(errorData, (NewValue, OldValue) => {
			console.log(NewValue);
		});


		watch(passwordShow, (NewValue, OldValue) =>{
			NewValue == true ? type.value = "text" : type.value = "password"
		})


		const cookie = useCookie('name',{
			maxAge:10,
		})

		cookie.value = PlayerInfo.value.email || 'yacine'


		const handleSubmit = () => {
			checkInfo();
		};

		return {
			PlayerInfo: PlayerInfo,
			handleSubmit,
			type,
			errorData,
			setPasswordShow,
			errorServerResponse
		};
	}
};
</script>

<style lang="scss" scoped></style>
