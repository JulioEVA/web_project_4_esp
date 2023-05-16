const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
const btnAdd = document.querySelector(".add-button");
const modal = document.querySelector(".edit-popup");
const modalButton = document.querySelector(".save-button");
const modalTitle = document.querySelector(".edit-popup__title");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputs = document.querySelectorAll(".input");

//El primer input que encontró querySelectorAll
const nameInput = inputs[0];
//El segundo input que encontró querySelectorAll
const aboutInput = inputs[1];
const elementTitle = nameInput;
const imageLink = aboutInput;
/**
 * Abre el modal de edición
 */
function openModalEdit(evt) {
  modalTitle.textContent = "Editar perfil";
  modalButton.textContent = "Guardar";
  nameInput.placeholder = "Nombre";
  aboutInput.placeholder = "Acerca de mí";
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
  modal.showModal();
}

/**
 * Cierra el modal de edición
 */
function closeModal(evt) {
  evt.preventDefault();
  modal.close();
}

function openAddModal(evt) {
  modalTitle.textContent = "Nuevo lugar";
  modalButton.textContent = "Crear";
  elementTitle.placeholder = "Título";
  imageLink.placeholder = "Enlace a la imagen";
  nameInput.value = "";
  aboutInput.value = "";
  modal.showModal();
}

// Busquemos el formulario en el DOM
const formElement = document.querySelector("form");

/**
 * Maneja el envío del formulario para el caso del perfil.
 * @param {*} evt El evento de envío de formulario
 */
function handleProfileFormSubmit(evt) {
  if (modalTitle.textContent == "Nuevo lugar") {
    return;
  }
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  modal.close();
}

/**
 * Maneja el envío del formulario para el caso del element
 * @param {*} evt El evento de envío de formulario
 */
function handleElementFormSubmit(evt) {
  if (modalTitle.textContent == "Editar perfil") {
    return;
  }
  evt.preventDefault();

  const elements = document.querySelector(".elements");

  elements.insertAdjacentHTML(
    "beforeend",
    `<div class="element">
  <img
    class="element__image"
    src="${imageLink.value}"
    alt="Imagen proporcionada por el usuario"
  />
  <button class="delete-button button">
    <img src="./images/delete-button.png" alt="Icono de borrar" />
  </button>
  <h3 class="element__title text">${elementTitle.value}</h3>
  <button class="like-button button">
    <img src="./images/like-button.png" alt="Icono de corazón" />
  </button>
</div>`
  );
  modal.close();
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", handleElementFormSubmit);

btnAdd.addEventListener("click", openAddModal);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModal);
