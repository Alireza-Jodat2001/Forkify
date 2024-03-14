import icon from '../Images/icons.svg';

// general function for getting data of api
export async function getJson(url) {
   try {
      const res = await fetch(url);
      // create an error
      if (!res.ok) throw new Error(`Could not found food. (${res.status})`);
      return await res.json();
   } catch (err) {
      console.log(err.message);
   }
}

// clear container
export const clearContainer = container => (container.innerHTML = '');

// insert HTML function
export const insertHTML = (container, strEl) =>
   container.insertAdjacentHTML('afterbegin', strEl);

// render spinner function
export function renderSpinner(parentEl) {
   const spinnerStrEl = `
      <div class="spinner">
         <svg>
            <use href="${icon}#icon-loader"></use>
         </svg>
      </div>
   `;
   // clear container
   clearContainer(parentEl);
   // insert in container
   insertHTML(parentEl, spinnerStrEl);
}
