import {
  modalTitle,
  profileName,
  profileSubtitle,
  nameInput,
  aboutInput,
  elementTitle,
  imageLink,
  secondResult,
  modal,
} from "./index.js";

const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
const btnAdd = document.querySelector(".add-button");
const btnCloseImagePopup =
  document.querySelectorAll(".close-button")[secondResult];
const imagePopup = document.querySelector(".image-popup");
const modalButton = document.querySelector(".save-button");

/**
 * Opens edit modal
 */
function openModalEdit(evt) {
  modalTitle.textContent = "Editar perfil";
  modalButton.textContent = "Guardar";
  nameInput.placeholder = "Nombre";
  aboutInput.placeholder = "Acerca de mí";
  aboutInput.maxlength = "200";
  aboutInput.type = "text";
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
  modal.showModal();
}
/**
 * Closes the open popup with a smooth transition.
 * @param {*} evt The closing event.
 * @param {*} popup The popup itself.
 */
function closePopup(evt, popup) {
  popup.setAttribute("closing", true);
  popup.addEventListener(
    "animationend",
    () => {
      popup.removeAttribute("closing");
      popup.close();
    },
    { once: true }
  );
  evt.preventDefault;
}

/**
 * Closes de edit modal.
 */
function closeModal(evt) {
  closePopup(evt, modal);
}

/**
 * Closes the open image.
 */
function closeImagePopup(evt) {
  closePopup(evt, imagePopup);
}

/**
 * Opens the modal to add a new element.
 * @param {*} evt The form submit element.
 */
function openAddModal(evt) {
  modalTitle.textContent = "Nuevo lugar";
  modalButton.textContent = "Crear";
  elementTitle.placeholder = "Título";
  imageLink.placeholder = "Enlace a la imagen";
  nameInput.value = "";
  aboutInput.value = "";
  aboutInput.removeAttribute("maxlength");
  aboutInput.type = "url";
  modal.showModal();
}

/**
 * Closes the popup window when clicking outside.
 *
 * @param {*} evt The click event.
 */
function closeOnOutsideClick(evt) {
  if (evt.target === modal || evt.target === imagePopup) {
    closePopup(evt, evt.target);
  }
}

modal.addEventListener("click", closeOnOutsideClick);
imagePopup.addEventListener("click", closeOnOutsideClick);

btnCloseImagePopup.addEventListener("click", closeImagePopup);
btnAdd.addEventListener("click", openAddModal);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModal);
