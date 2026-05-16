import ArchitectureSection from '../components/edit/ArchitectureSection';
import NavigationSection from '../components/edit/NavigationSection';
import Edit1Section from '../components/edit/Edit1Section';
import Edit2Section from '../components/edit/Edit2Section';
import SaveSection from '../components/edit/SaveSection';
import AlgorithmsSection from '../components/edit/AlgorithmsSection';
import RecipesSection from '../components/edit/RecipesSection';
import NotebookSection from '../components/edit/NotebookSection';

export default function Edit() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-4 pb-6 space-y-3">
      <header className="pb-2">
        <h2 className="text-lg font-bold text-slate-100">Guia de Edição</h2>
        <p className="text-xs text-slate-400">
          Tudo o que dá pra editar no Wavedrum, traduzido para o português.
        </p>
      </header>

      <ArchitectureSection />
      <NavigationSection />
      <Edit1Section />
      <Edit2Section />
      <SaveSection />
      <AlgorithmsSection />
      <RecipesSection />
      <NotebookSection />
    </div>
  );
}
