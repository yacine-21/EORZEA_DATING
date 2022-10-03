<template>
	<details class="p-6 border-l-4 bg-gray-50 group" :class="borderColor">
		<summary class="flex items-center justify-between cursor-pointer">
			<h5 class="text-lg font-medium text-gray-900">
				{{ questionText.title }}
			</h5>
			<span
				class="flex-shrink-0 ml-1.5 p-1.5 text-gray-900 bg-white rounded-full sm:p-3"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="flex-shrink-0 w-5 h-5 duration-300 group-open:-rotate-45"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</summary>
		<p class="mt-4 leading-relaxed text-gray-700">{{ questionText.answer }}</p>
	</details>
</template>

<script>
export default {
	props: {
		questionText: {},
		borderColor: {
			default: "border-white"
		}
	},
	setup(props) {
		return {
			questionText: props.questionText,
			borderColor: props.borderColor
		};
	}
};
</script>

<style lang="scss" scoped></style>
