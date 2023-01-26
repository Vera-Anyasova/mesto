import { Popup } from "./Popup.js";
import { elementPopupPhoto, elementPopupTitle } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
  }

  open(name, link) {
    elementPopupPhoto.src = link;
    elementPopupPhoto.alt = name;
    elementPopupTitle.textContent = name;
    super.open();
  }
}
