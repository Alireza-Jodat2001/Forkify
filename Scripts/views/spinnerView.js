import View from './View';
import icon from 'url:../../Images/icons.svg';

class Spinner extends View {
  // generate markup
  _generateMarkup() {
    return `
      <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div>
    `;
  }
}

export default new Spinner();
