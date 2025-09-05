const selector = document.getElementById("language-selector");

selector.addEventListener("change", () => {
  const lang = selector.value;
  loadLanguage(lang);
});

function loadLanguage(lang) {
  fetch(`../lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          el.textContent = data[key];
        }
      });
      // Cambiar el atributo lang en <html>
      document.documentElement.lang = lang;
    });
}

// Cargar idioma por defecto
window.addEventListener("DOMContentLoaded", () => {
  const userLang = navigator.language.startsWith("en") ? "en" : "fr";
  selector.value = userLang;
  loadLanguage(userLang);
});
