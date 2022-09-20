export default defineNuxtPlugin(() => {
	return {
		provide: {
			formatDate: date =>
				new Date(`${date}`).toLocaleDateString() +
				" - " +
				new Date(`${date}`).toLocaleTimeString()
		}
	};
});
