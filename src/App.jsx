import { useEffect } from 'react';
import Layout from './components/Layout';
import Finder from './pages/Finder';
import Stage from './pages/Stage';
import Edit from './pages/Edit';
import { useLocalStorage } from './hooks/useLocalStorage';

const VALID = new Set(['finder', 'stage', 'edit']);

export default function App() {
  const [tab, setTab] = useLocalStorage('waveguide_tab', 'finder');

  // Sincroniza com #hash da URL para deep-link simples.
  useEffect(() => {
    const fromHash = window.location.hash.replace('#', '');
    if (VALID.has(fromHash) && fromHash !== tab) setTab(fromHash);
    function onHash() {
      const h = window.location.hash.replace('#', '');
      if (VALID.has(h)) setTab(h);
    }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.location.hash.replace('#', '') !== tab) {
      window.history.replaceState(null, '', `#${tab}`);
    }
  }, [tab]);

  return (
    <Layout tab={tab} onTabChange={setTab}>
      {tab === 'finder' && <Finder />}
      {tab === 'stage'  && <Stage />}
      {tab === 'edit'   && <Edit />}
    </Layout>
  );
}
