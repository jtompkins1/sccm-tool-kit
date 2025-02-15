import { createElement } from './utils';

import Home from './Home';
import Units from './Units';
import Forecast from './Forecast';

import { checkAndFetchWeather } from './Home';  
import { checkAndFetchForecast } from './Forecast';  // Add this import

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = '';
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
    switch (hash) {
      case '#/home':
        updateView(Home());
        checkAndFetchWeather();
        break;

      case '#/page2':
        updateView(Units());
        break;

      case '#/page3':
        updateView(Forecast());
        checkAndFetchForecast();  // Call this when on the forecast page
        break;

      default:
        updateView(createElement('h3', { textContent: '404 Page Not Found' }));
        break;
    }
  }

  const defaultHash = window.location.hash || '#/home';
  hashToRoute(defaultHash);

  window.addEventListener('hashchange', (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;

    hashToRoute(hash);
    if (hash === '#/forecast') {
      apiFetch('forecast');
    }
  });
}