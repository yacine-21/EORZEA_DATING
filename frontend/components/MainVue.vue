<script>
import { onBeforeMount } from "vue";
import { useExtensionStore } from "../stores/extension";

export default {
	setup() {
		const extensionStore = useExtensionStore();

		const fetchData = async () => {
			const reponse = await fetch("./extension.json");
			const data = await reponse.json();
			extensionStore.setExtension(data);
		};
		onBeforeMount(() => {
			fetchData();
		});

		return {};
	}
};
</script>

<template>
	<div>
		<HeaderVue />
		<section class="px-2 py-32 bg-white md:px-0">
			<div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
				<div class="flex flex-wrap items-center sm:-mx-3">
					<div class="w-full md:w-1/2 md:px-3">
						<div
							class="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
						>
							<h1
								class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
							>
								<span class="block xl:inline">Final Fantasy XIV</span>
								<span class="text-red-700">The Best Mmorpg</span>
							</h1>
							<p
								class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl"
							>
								a massively multiplayer online role-playing game developed and published
								by
								<a
									class="underline text-red-400 hover:text-red-700"
									href="https://www.square-enix-games.com/en_GB/home"
									>Square Enix.</a
								>
							</p>
							<div class="relative flex flex-col sm:flex-row sm:space-x-4">
								<a
									href="https://freetrial.finalfantasyxiv.com/na/"
									class="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-red-700 sm:mb-0 hover:bg-red-800 sm:w-auto rounded-full"
								>
									Try It Free
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="w-5 h-5 ml-1"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line x1="5" y1="12" x2="19" y2="12"></line>
										<polyline points="12 5 19 12 12 19"></polyline>
									</svg>
								</a>
								<a
									href="https://www.square-enix-games.com/en_GB/home"
									class="flex items-center px-6 py-3 text-gray-500 bg-gray-100 hover:bg-gray-200 hover:text-gray-600 rounded-full"
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
					<div class="w-full md:w-1/2">
						<a href="https://eu.finalfantasyxiv.com/" class="blur-sm hover:blur-none">
							<div class="w-full h-auto overflow-hidden shadow-xl rounded-3xl">
								<img src="/images/finalfantasy.png" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
		<section class="px-2 py-32 bg-white md:px-0">
			<div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
				<div class="flex flex-wrap items-center sm:-mx-3">
					<div class="w-full md:w-1/2">
						<div
							class="w-full flex justify-center items-center flex-col pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0"
						>
							<h2 class="text-5xl font-bold text-gray-900 xl:text-6xl">
								Meet your <span class="text-red-600">dream</span> partner here in
								<br />
								<span class="italic underline">Eorzea Dating</span>
							</h2>
							<p class="text-2xl text-gray-700">
								Talk, discover et exchange with other final fantasy xiv gamers
							</p>
							<a
								href="/SignInView"
								class="inline-block px-8 py-5 text-xl font-medium text-center text-white duration-200 bg-red-600 rounded-lg hover:bg-red-700 ease"
							>
								Get Started Today<span class="text-red-700">.</span>
							</a>
						</div>
					</div>
					<div class="w-full md:w-1/2">
						<a href="https://eu.finalfantasyxiv.com/" class="blur-sm hover:blur-none">
							<div class="w-full h-auto overflow-hidden shadow-xl rounded-3xl">
								<img src="images/finalfantasy2.png" />
							</div>
						</a>
					</div>
				</div>
			</div>
		</section>
		<section class="py-20 bg-white">
			<div
				class="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8 justify-center"
			>
				<h2
					class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl"
				>
					There are no less than <span class="text-red-700">5</span> extensions
				</h2>

				<div class="flex justify-center flex-col mt-8 space-x-3">
					<CardItemVue />
				</div>
			</div>
		</section>
		<FooterVue />
	</div>
</template>
