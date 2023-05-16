const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
const editModal = document.querySelector(".edit-popup");
const profileName = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputs = document.querySelectorAll(".input");
//El primer input que encontró querySelectorAll
let nameInput = inputs[0];
//El segundo input que encontró querySelectorAll

let aboutInput = inputs[1];
/**
 * Abre el modal de edición
 */
function openModalEdit(evt) {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
  editModal.showModal();
}

/**
 * Cierra el modal de edición
 */
function closeModalEdit(evt) {
  evt.preventDefault();
  editModal.close();
}

// Busquemos el formulario en el DOM
let formElementEdit = document.querySelector("form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  editModal.close();
}

// Conecta el manipulador (handler) al formulario:
// se observará el evento de entrega
formElementEdit.addEventListener("submit", handleProfileFormSubmit);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModalEdit);
