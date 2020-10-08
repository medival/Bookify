if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then(function () {
				console.log("success");
			})
			.catch(function () {
				console.log("Failed");
			});
	});
} else {
	console.log("Not Supported");
}
