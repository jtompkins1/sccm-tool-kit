//App.js

import { createElement } from './utils';
import { initRouter } from './router';
import image from '../images/toolbox.png';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'SCCM Tool Kit',
    className: 'heading',
  });

  return createElement('header', {}, [appTitle]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}   |    SCCM Tool Kit - For internal use only.`,
  });

  return createElement('footer', {}, [copyright]);
}

function updateActiveLink(currentRoute) {
  const links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function App() {
  const main = createElement('main', {}, []);

  // Add an image to the sidebar
  const sidebarImage = createElement('img', {
    src: image,
    alt: 'Tool Box Icon', 
    className: 'sidebar-image'
  });

  const sidebar = createElement('aside', {
    className: 'sidebar'
  }, [
    sidebarImage,
    createElement('nav', {
      className: 'sidebar-nav'
    }, [
      createElement('a', {href: '#/home', textContent: 'Home'}),
      createElement('a', {href: '#/page2', textContent: 'Unit Conversions'}),
      createElement('a', {href: '#/page3', textContent: 'Page 3'})
    ])
  ]);

  initRouter(main); // Initialize the router with the main element

  // Update active link on initial load
  const currentRoute = window.location.hash || '#/home';
  updateActiveLink(currentRoute);

  // Listen for route changes
  window.addEventListener('hashchange', () => {
    const newRoute = window.location.hash || '#/home';
    updateActiveLink(newRoute);
  });

  // Create a container for sidebar and main content
  const contentContainer = createElement('div', {
    className: 'content-container'
  }, [sidebar, main]);

  return createElement('div', {
    className: 'app-container'
  }, [Header(main), contentContainer, Footer()]);
}

export default App;