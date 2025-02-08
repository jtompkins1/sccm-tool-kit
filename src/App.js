import { createElement } from './utils';
import { initRouter } from './router';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'SCCM Tool Kit',
    className: 'heading',
  });

  // nav items
  const home = createElement('a', {
    href: '/#/home',
    textContent: 'Home',
  });
  const page2 = createElement('a', {
    href: '/#/page2',
    textContent: 'Page 2',
  });
  const page3 = createElement('a', {
    href: '/#/page3',
    textContent: 'Page 3',
  });

  // Create the sidebar with nav items inside
  const nav = createElement('nav', {
    className: 'sidebar-nav'
  }, [home, page2, page3]);

  // Create a div for the sidebar layout
  const sidebar = createElement('aside', {
    className: 'sidebar'
  }, [nav]);

  return createElement('header', {}, [appTitle]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}   |    SCCM Tool Kit - For internal use only.`,
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  const main = createElement('main', {}, []);
  const sidebar = createElement('aside', {
    className: 'sidebar'
  }, [
    createElement('nav', {
      className: 'sidebar-nav'
    }, [
      createElement('a', {href: '/#/home', textContent: 'Home'}),
      createElement('a', {href: '/#/page2', textContent: 'Page 2'}),
      createElement('a', {href: '/#/page3', textContent: 'Page 3'})
    ])
  ]);

  initRouter(main);

  // Create a container for sidebar and main content
  const contentContainer = createElement('div', {
    className: 'content-container'
  }, [sidebar, main]);

  return createElement('div', {
    className: 'app-container'
  }, [Header(main), contentContainer, Footer()]);
}

export default App;