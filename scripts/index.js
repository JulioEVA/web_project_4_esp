const btnEdit = document.querySelector(".edit-button");
const btnClose = document.querySelector(".close-button");
const btnAdd = document.querySelector(".add-button");
//Seleccionamos el segundo botón de cerrado que nos arroja querySelectorAll
const btnCloseImagePopup = document.querySelectorAll(".close-button")[1];
const imagePopup = document.querySelector(".image-popup");
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
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];
/**
 * Carga los elementos por defecto al abrir la página.
 */
initialCards.forEach((item) => loadElement(item.name, item.link));

/**
 * Abre el modal de edición
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
 * Cierra el popup abierto con una transición suave.
 * @param {*} evt El evento de cerrado
 * @param {*} popup El popup en cuestión.
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
 * Cierra el modal de edición
 */
function closeModal(evt) {
  closePopup(evt, modal);
}

/**
 * Cierra la imagen maximizada
 */
function closeImagePopup(evt) {
  closePopup(evt, imagePopup);
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
  aboutInput.removeAttribute("maxlength");
  aboutInput.type = "url";
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
 * Carga un elemento en la sección de elementos de la página.
 *
 * @param {*} elementTitle El título del elemento.
 * @param {*} imageLink La imagen del elemento.
 */
function loadElement(elementTitle, imageLink) {
  const elementTemplate = document.querySelector(".element-template").content;
  const newElement = elementTemplate.querySelector(".element").cloneNode(true);
  const newElementImage = newElement.querySelector(".element__image");
  const newElementTitle = newElement.querySelector(".element__title");

  newElementImage.title = elementTitle;
  newElementImage.src = imageLink;
  newElementTitle.textContent = elementTitle;

  elements.prepend(newElement);

  const btnDelete = newElement.querySelector(".delete-button");
  btnDelete.addEventListener("click", (evt) => {
    evt.target.closest(".element").remove();
  });
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

  loadElement(elementTitle.value, imageLink.value);
  modal.close();
}

/**
 * Obtiene el elemento al que se le hizo click y
 * muestra la imagen en grande.
 *
 * @param {*} evt El evento de hacer click en un elemento
 */
elements.onclick = (evt) => {
  if (evt.target.className != "element__image") {
    return;
  }

  const imageTitle = document.querySelector(".image-popup__title");
  const image = document.querySelector(".image-popup__image");
  image.src = evt.target.src;
  imageTitle.textContent = evt.target.title;
  imagePopup.showModal();
};

/**
 * Cambia la apariencia del botón de me gusta
 *
 * @param {} evt El evento de hacer click
 * @returns Salida de la función
 */
document.onclick = (evt) => {
  if (
    evt.target.className != "like" &&
    evt.target.className != "like like_active"
  ) {
    return;
  } else {
    if (evt.target.className == "like") {
      evt.target.src = "./images/like-button_active.png";
      evt.target.className = "like like_active";
    } else {
      evt.target.src = "./images/like-button.png";
      evt.target.className = "like";
    }
  }
};

function closeOnOutsideClick(evt) {
  if (evt.target === modal || evt.target === imagePopup) {
    closePopup(evt, evt.target);
  }
}

modal.addEventListener("click", closeOnOutsideClick);
imagePopup.addEventListener("click", closeOnOutsideClick);

formElement.addEventListener("submit", handleProfileFormSubmit);
formElement.addEventListener("submit", handleElementFormSubmit);

btnCloseImagePopup.addEventListener("click", closeImagePopup);
btnAdd.addEventListener("click", openAddModal);
btnEdit.addEventListener("click", openModalEdit);
btnClose.addEventListener("click", closeModal);
