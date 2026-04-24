/**
 * Shared script to load navbar and footer components
 */
(function () {
  function init() {
    console.log("Include.js: Starting...");

    // Load Navbar
    loadComponent("navbar-placeholder", "./components/navbar.htm", function () {
      console.log("Include.js: Navbar callback triggered.");
      highlightActiveLink();
      if (typeof initFlowbite === "function") {
        initFlowbite();
      }
    });

    // Load Footer
    loadComponent("footer-placeholder", "./components/footer.htm", function () {
      console.log("Include.js: Footer callback triggered.");
      var yearSpan = document.getElementById("current-year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
  }

  function loadComponent(id, url, callback) {
    var placeholder = document.getElementById(id);
    if (!placeholder) {
      console.error("Include.js: Could not find element with id: " + id);
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          placeholder.innerHTML = xhr.responseText;
          if (callback) callback();
        } else {
          console.error(
            "Include.js: Failed to load " +
              url +
              " (Status: " +
              xhr.status +
              ")",
          );
          placeholder.innerHTML =
            '<div style="color:red; padding:20px; border:1px solid red;">Error loading ' +
            url +
            ". Check console for details.</div>";
        }
      }
    };
    xhr.send();
  }

  function highlightActiveLink() {
    var path = window.location.pathname;
    var page = path.split("/").pop() || "index.htm";
    var links = document.querySelectorAll(".nav-link");

    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute("href");

      if (href === page || (page === "" && href === "index.htm")) {
        link.classList.add(
          "text-white",
          "bg-[#0395DA]",
          "rounded",
          "md:bg-transparent",
          "md:text-[#0395DA]",
        );
        link.classList.remove(
          "text-gray-900",
          "hover:bg-gray-100",
          "md:hover:bg-transparent",
          "md:border-0",
          "md:hover:text-blue-700",
        );
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.add(
          "text-gray-900",
          "rounded",
          "hover:bg-gray-100",
          "md:hover:bg-transparent",
          "md:border-0",
          "md:hover:text-blue-700",
        );
        link.classList.remove(
          "text-white",
          "bg-[#0395DA]",
          "rounded",
          "md:bg-transparent",
          "md:text-[#0395DA]",
        );
        link.removeAttribute("aria-current");
      }
    }
  }

  // Run on DOMContentLoaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
