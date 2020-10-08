document.addEventListener("DOMContentLoaded", function () {
	function loadNav() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				if (this.status != 200) return;

				// Menu Sidebar load
				document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
					elm.innerHTML = xhttp.responseText;
				});

				document
					.querySelectorAll(".sidenav a, .topnav a")
					.forEach(function (elm) {
						elm.addEventListener("click", function (event) {
							var sidenav = document.querySelector(".sidenav");
							M.Sidenav.getInstance(sidenav).close();

							page = event.target.getAttribute("href").substr(1);
							loadPage(page);
						});
					});
			}
		};
		xhttp.open("GET", "nav.html", true);
		xhttp.send();
	}

	var page = window.location.hash.substr(1);
	if (page == "") page = "home";
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4) {
				var content = document.querySelector("#body-content");
				if (this.status === 200) {
					content.innerHTML = xhttp.responseText;
				} else if (this.status == 404) {
					content.innerHTML = "<p> Page not found <p>";
				} else {
					content.innerHTML = "<p> Oops! Pages cant accessible <p>";
				}
			}
		};
		// Sidenav
		const elems = document.querySelector(".sidenav");
		M.Sidenav.init(elems);
		loadNav();

		// Material Boxed
		const mb = document.querySelectorAll(".materialboxed");
		M.Materialbox.init(mb, {});

		// ScrollSpy
		const ss = document.querySelectorAll(".scrollspy");
		M.ScrollSpy.init(ss, {});

		xhttp.open("GET", "pages/" + page + ".html", true);
		xhttp.send();
	}
});
