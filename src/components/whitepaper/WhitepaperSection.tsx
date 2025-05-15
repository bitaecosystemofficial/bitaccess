
import { ReactNode } from "react";

interface SubSection {
  title: string;
  content: string | ReactNode;
}

interface WhitepaperSectionProps {
  id: string;
  title: string;
  content?: string | ReactNode;
  subsections?: SubSection[];
}

const WhitepaperSection = ({ id, title, content, subsections }: WhitepaperSectionProps) => {
  return (
    <div id={id} className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      {content && (
        typeof content === 'string' 
          ? <p className="text-gray-300 mb-4">{content}</p>
          : content
      )}
      
      {subsections && (
        <div className="space-y-6 mt-4 pl-4 border-l-2 border-bitaccess-gold/20">
          {subsections.map((subsection, subIndex) => (
            <div key={subIndex}>
              <h3 className="text-xl font-semibold text-white mb-2">{subsection.title}</h3>
              {typeof subsection.content === 'string' 
                ? <p className="text-gray-300">{subsection.content}</p>
                : subsection.content
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhitepaperSection;
