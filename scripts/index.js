const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
//Seleccionamos el segundo botón de cerrado que nos arroja querySelectorAll
const btnCloseImagePopup = document.querySelectorAll(".close-button")[1];
const imagePopup = document.querySelector(".image-popup");
const btnAdd = document.querySelector(".add-button");
const modal = document.querySelector(".edit-popup");
const modalButton = document.querySelector(".save-button");
const modalTitle = document.querySelector(".edit-popup__title");
const profileName = document.querySelector(".profile__title");
const formElement = document.querySelector("form");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputs = document.querySelectorAll(".input");
const elements = document.querySelector(".elements");

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

/**
 * Abre el modal para añadir un elemento.
 * @param {*} evt El evento de envío de formulario
 */
function openAddModal(evt) {
  modalTitle.textContent = "Nuevo lugar";
  modalButton.textContent = "Crear";
  elementTitle.placeholder = "Título";
  imageLink.placeholder = "Enlace a la imagen";
  nameInput.value = "";
  aboutInput.value = "";
  modal.showModal();
}

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
    title="${elementTitle.value}"
    src="${imageLink.value}"
    alt="Imagen proporcionada por el usuario"
  />
  <button class="delete-button button">
    <img src="./images/delete-button.png" alt="Icono de borrar" />
  </button>
  <h3 class="element__title text">${elementTitle.value}</h3>
  <button class="like-button button">
    <img class="like" src="./images/like-button.png" alt="Icono de corazón" />
  </button>
</div>`
  );
  modal.close();
}

/**
 * Cierra la imagen maximizada
 */
function closeImagePopup() {
  imagePopup.close();
}

/**
 * Obtiene el elemento al que se le hizo click y
 * muestra la imagen en grande.
 *
 * @param {*} e El evento de hacer click en un elemento
 */
elements.onclick = (e) => {
  if (e.target.className != "element__image") {
    return;
  }

  const imageTitle = document.querySelector(".image-popup__title");
  const image = document.querySelector(".image-popup__image");
  image.src = e.target.src;
  imageTitle.textContent = e.target.title;
  imagePopup.showModal();
};

/**
 * Cambia la apariencia del botón de me gusta
 *
 * @param {} e El evento de hacer click
 * @returns Salida de la función
 */
elements.onclick = (e) => {
  if (
    e.target.className != "like" &&
    e.target.className != "like like_active"
  ) {
    return;
  } else {
    if (e.target.className == "like") {
      e.target.src = "./images/like-button_active.png";
      e.target.className = "like like_active";
    } else {
      e.target.src = "./images/like-button.png";
      e.target.className = "like";
    }
  }
};

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", handleElementFormSubmit);

btnCloseImagePopup.addEventListener("click", closeImagePopup);
btnAdd.addEventListener("click", openAddModal);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModal);
