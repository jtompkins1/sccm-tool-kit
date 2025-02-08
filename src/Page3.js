import { createElement } from './utils';

function Page3() {
  const title = createElement('h2', { textContent: 'Page 3' });

  const homeLink = createElement('a', {
    href: '/#/home',
    textContent: 'Link to Home',
  });

  return createElement('div', {}, [title, homeLink]);
}

export default Page3;