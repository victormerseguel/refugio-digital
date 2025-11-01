const links = document.querySelectorAll("nav a");
const main = document.querySelector("main");

function loadAndSwap(href, pushState = true) {
  fetch(href)
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar página: " + res.status);
      return res.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newMain = doc.querySelector("main");

      if (!newMain) return;

      main.innerHTML = newMain.innerHTML;
      main.className = newMain.className || "";

      if (main.classList.contains("cadastro")) {
        setTimeout(() => {
          if (window.initCadastroForm) window.initCadastroForm();
        }, 50);
      }

      if (window.initPage && typeof window.initPage === "function") {
        try {
          window.initPage(main.className);
        } catch (err) {
          console.error("Erro em initPage:", err);
        }
      }

      if (pushState) {
        history.pushState({ href }, "", href);
      }
    })
    .catch((err) => {
      window.location.href = href;
    });
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    e.preventDefault();
    loadAndSwap(href, true);
  });
});

window.addEventListener("popstate", (event) => {
  const href = (event.state && event.state.href) || location.pathname;
  loadAndSwap(href, false);
});

document.addEventListener("DOMContentLoaded", () => {
  if (main.classList.contains("cadastro")) {
    setTimeout(() => {
      if (window.initCadastroForm) {
        window.initCadastroForm();
      }
    }, 100);
  }

  if (window.initPage) {
    try {
      window.initPage(main.className);
    } catch (err) {
      console.error("Erro em initPage no load inicial:", err);
    }
  }
});
