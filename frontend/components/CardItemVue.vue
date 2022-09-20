<template>
	<div>
		<div v-if="data.length !== 0" v-for="extension in data">
			<div>
				<h3 class="underline italic text-2xl">
					{{ extension.name }}
				</h3>
				<div
					class="gw-full flex justify-center items-center flex-col sm:grid-cols-3 l:grid-cols-4 m-10 border-b-8 border-double"
				>
					<div class="">
						<div
							class="h-auto overflow-hidden flex justify-center items-center shadow-2xl"
						>
							<img
								class="z-20 w-7/12 rounded-2xl"
								:src="'/images/' + extension.cover"
							/>
							<iframe
								width="560"
								height="315"
								:src="'https://www.youtube.com/embed/' + extension.link"
								title="YouTube video player"
								frameborder="0"
								class="rounded-3xl"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
						</div>
						{{ extension.description }}
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<SpinnerVue />
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useExtensionStore } from "../stores/extension";

export default {
	setup() {
		const extension = useExtensionStore();
		const data = ref([]);

		extension.$subscribe((mutation, state) => {
			data.value = state.extension;
		});

		return {
			data
		};
	}
};
</script>

<style lang="scss" scoped></style>
