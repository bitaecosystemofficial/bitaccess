
import { FileText } from "lucide-react";

interface WhitepaperSidebarProps {
  sections: Array<{
    title: string;
    id: string;
  }>;
}

const WhitepaperSidebar = ({ sections }: WhitepaperSidebarProps) => {
  return (
    <div className="bg-bitaccess-black-light p-6 rounded-xl border border-bitaccess-gold/20 sticky top-24">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <FileText size={18} className="text-bitaccess-gold" />
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block py-1.5 text-sm text-gray-300 hover:text-bitaccess-gold transition-colors"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default WhitepaperSidebar;
