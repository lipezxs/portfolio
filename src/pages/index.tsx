import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Desenvolvedor Web front-end.";

  // Efeito para animação de digitação
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Atualiza a posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <DefaultLayout>
      {/* Ajuste na estrutura para ocupar toda a tela corretamente */}
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        
        {/* Conteúdo Principal */}
        <main className="flex-grow flex items-center justify-center px-4" onMouseMove={handleMouseMove}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
            }}
          />
          
          <section className="flex flex-col items-center justify-center gap-4">
            <div className="max-w-lg text-center animate-fadeIn">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                Me chamo Felipe&nbsp;
              </span>
              <span className="text-4xl font-bold text-blue-500 animate-pulse">
                Alves,&nbsp;
              </span>
              <br />
              <div className="text-xl text-gray-600 dark:text-gray-300 mt-4 h-8">
                {typedText}
                <span className="inline-block ml-1 animate-blink">|</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8 animate-slideUp">
              <a href="/about">
                <Button color="primary" variant="ghost">Fale comigo!</Button>
              </a>

              
            </div>
          </section>
        </main>

        {/* Footer Ajustado */}
        {/* <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm" >© 2025 Felipe Alves. Todos os direitos reservados.</p>
        </footer> */}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default IndexPage;
