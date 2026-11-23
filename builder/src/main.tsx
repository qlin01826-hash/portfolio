import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioExperience } from './portfolio-experience';
import { WorkPage } from './work-page';
import { defaultPortfolio } from './static-data';
import './style.css';

const projectId = new URLSearchParams(window.location.search).get('project');
const project = defaultPortfolio.projects.find(item => item.id === projectId);

function App() {
  useEffect(() => {
    document.title = project ? `${project.title}｜李琬欣 · 作品集` : '李琬欣｜作品集';
    const goToHash = () => {
      const anchor = decodeURIComponent(window.location.hash.slice(1));
      if (anchor) document.getElementById(anchor)?.scrollIntoView();
    };
    const timer = window.setTimeout(goToHash, 160);
    window.addEventListener('hashchange', goToHash);
    return () => { window.clearTimeout(timer); window.removeEventListener('hashchange', goToHash); };
  }, []);
  return project ? <WorkPage id={project.id} /> : <PortfolioExperience initialData={defaultPortfolio} isAdmin={false} />;
}

createRoot(document.getElementById('root')!).render(<App />);
