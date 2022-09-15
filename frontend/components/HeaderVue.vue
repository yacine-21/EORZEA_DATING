<template>
	<section class="w-full px-8 text-gray-700" :class="BgHeader">
		<div
			class="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl"
		>
			<div class="relative flex flex-col md:flex-row">
				<a
					href="/"
					class="mx-auto text-xl font-black leading-none text-gray-900 select-none"
				>
					Eorzea Dating<span class="text-red-700">.</span>
				</a>
				<nav
					class="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200"
				>
					<NuxtLink
						class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
						to="/"
						>Home</NuxtLink
					>
					<NuxtLink
						class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
						to="/SignUpView"
						>Register</NuxtLink
					>
					<NuxtLink
						class="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900"
						to="/SignInView"
						>Login</NuxtLink
					>
				</nav>
			</div>

			<div class="inline-flex items-center ml-5 space-x-6 lg:justify-end">
				<a
					class="text-base leading-6 text-gray-500 hover:text-gray-900"
					href="/SignInView"
					>Sign in</a
				>
				<a
					class="text-base leading-6 text-gray-500 hover:text-gray-900"
					href="/SignUpView"
					>Sign Up</a
				>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: {
		BgHeader: {
			default: "bg-white"
		}
	},
	setup(props) {
		return {
			BgHeader: props.BgHeader
		};
	}
};
</script>

<style lang="scss" scoped></style>
