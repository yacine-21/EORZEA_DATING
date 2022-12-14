<template>
	<section class="relative flex flex-wrap lg:h-screen lg:items-center">
		<div class="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full bg-red-50">
			<img
				class="absolute inset-0 object-contain w-full h-full"
				src="images/Final_Fantasy_XIV_Logo.png"
				alt=""
			/>
		</div>
		<div class="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
			<div class="max-w-lg mx-auto text-center">
				<h1 class="text-2xl font-bold sm:text-3xl">Get started today!</h1>

				<p v-if="errorData.length !== 0" class="mt-4 text-gray-500">
					<h1 class="text-2xl text-red-500 text-center">{{ errorData }}</h1>
				</p>
			</div>

			<form action="" class="max-w-md mx-auto mt-8 mb-0 space-y-4">
				<div>
					<label for="email" class="sr-only">Email</label>

					<div class="relative">
						<input
							ref="mailInput"
							type="email"
							v-model="playerInfo.email"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-red-100" 
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
					<label for="email" class="sr-only">Name</label>

					<div class="relative">
						<input
							type="text"
							v-model="playerInfo.name"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-red-100" 
							placeholder="Enter name"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="sr-only">Password</label>
					<div class="relative">
						<input
							v-model="playerInfo.password"
							:type="type"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-red-100"
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

				<div>
					<label for="password-confirm" class="sr-only">Password Confirm</label>
					<div class="relative">
						<input
							v-model="playerInfo.passwordConfirm"
							id="password-confirm"
							:type="type"
							class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm bg-red-100"
							placeholder="Confirm your password"
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
						Already have an account?
						<a class="underline text-red-500" href="/SignInView">Sign in</a>
					</p>

					<button
						@click.prevent="handleSubmit"
						type="submit"
						class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-red-500 rounded-lg"
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	</section>
</template>

<script>
import { ref,onMounted } from "vue";
import * as yup from "yup";

export default {
	setup() {

		const router = useRouter();

		const playerInfo = ref({
			email: "",
			name:"",
			password: "",
			passwordConfirm: ""
		});

		const isDataCorrect = ref(false);
		const errorData = ref("");
		const type = ref("password")
		const passwordShow = ref(false)
		
		
		let schema = yup.object().shape({
			email: yup.string().email().required(),
			name:yup.string().required(),
			password: yup.string().required().min(7),
			passwordConfirm: yup
			.string()
			.oneOf([yup.ref("password"), null], "Password don't match !")
			.required()
		});

		const clearInput = () =>{
			playerInfo.value = {}
		}
		const sendPlayerInfo = async () =>{

			const header = {
				"Content-Type":"application/json",
			}

			const { data, error, pending, refresh } = await useFetch("/api/register", {
				method: "post",
				body: playerInfo.value,
				headers: header
			});

			data.value.newPlayer.id && router.push({
				path:'SignInView'
			})
			data.value && clearInput()
			refresh()
		}
		
		
		const setPasswordShow = () =>{
			passwordShow.value = !passwordShow.value
		}

		const checkInfo = () => {
			schema
				.validate(playerInfo.value)
				.then(res => {
					isDataCorrect.value = true;
					playerInfo.value = res
				})
				.catch(function (err) {
					errorData.value = err.message;
				});
		};

		watch(isDataCorrect, (NewValue, OldValue) => {
			NewValue == true && sendPlayerInfo()			
		});

		watch(errorData, (NewValue, OldValue) => {
			console.log(NewValue);
		});

		watch(passwordShow, (NewValue, OldValue) =>{
			NewValue == true ? type.value = "text" : type.value = "password"
		})

		const handleSubmit = () => {
			checkInfo();

		};

		return {
			playerInfo: playerInfo,
			handleSubmit,
			errorData,
			type,
			setPasswordShow
		};
	}
};
</script>

<style lang="scss" scoped></style>
