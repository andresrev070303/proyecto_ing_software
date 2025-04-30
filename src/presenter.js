document.addEventListener("DOMContentLoaded", () => {
  const openWindowButton = document.querySelector("#open-window-btn");
  const newWindow = document.querySelector("#new-window");
  const originalContent = document.querySelector("#original-content");
  const closeWindowButton = document.querySelector("#close-window-btn");

  // Mostrar la "nueva ventana" y ocultar el contenido original cuando se hace clic en el botón
  if (openWindowButton) {
    openWindowButton.addEventListener("click", () => {
      originalContent.style.display = "none"; // Ocultar contenido original
      newWindow.style.display = "block"; // Mostrar "ventana" nueva
    });
  }

  // Cerrar la "nueva ventana" y volver a mostrar el contenido original
  if (closeWindowButton) {
    closeWindowButton.addEventListener("click", () => {
      originalContent.style.display = "block"; // Mostrar contenido original
      newWindow.style.display = "none"; // Ocultar la "ventana"
    });
  }
});

