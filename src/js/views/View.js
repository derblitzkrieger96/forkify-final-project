import icons from 'url:../../img/icons.svg'; //parcel v2

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data the data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned it render=false
   * @this {object} View instance
   * @author Dairon Danilo Dorado
   * @todo finish implementation
   */
  render(data, render = true) {
    // console.log(data.length, 'okkkkkkkkkkkkkkk');
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0)) {
    //   return this.renderError();
    // }

    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    console.log(curElements);
    console.log(newElements);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //   console.log(newEl.isEqualNode(curEl));

      // update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
