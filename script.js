const selector = document.getElementById("language-selector");

selector.addEventListener("change", () => {
  const lang = selector.value;
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLanguage', lang);
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

// Cargar idioma por defecto o guardado
window.addEventListener("DOMContentLoaded", () => {
  // Intentar cargar idioma guardado, si no existe usar detección del navegador
  const savedLang = localStorage.getItem('preferredLanguage');
  const userLang = savedLang || (navigator.language.startsWith("en") ? "en" : "fr");
  
  selector.value = userLang;
  loadLanguage(userLang);
});