import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Desenvolvedor Web front-end.";

  // Efeito para animação de digitação
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, Math.random() * 50 + 50); // Entre 50ms e 100ms
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Atualiza a posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <DefaultLayout>
      {/* Container principal */}
      <div
        className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Fundo animado */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`,
            zIndex: 0, // Define um z-index baixo para o gradiente
          }}
        />

        {/* Conteúdo Principal */}
        <main className="flex-grow flex items-center justify-center p-4 pt-2"> {/* Ajuste aqui: pt-16 para subir o conteúdo */}
          {/* Seção centralizada */}
          <motion.section
            className="flex flex-col items-center justify-center gap-6 w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Texto principal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Me chamo Felipe&nbsp;
              </span>
              <motion.span
                className="text-3xl md:text-4xl font-bold text-blue-500"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Alves,&nbsp;
              </motion.span>
              <br />
              <div className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 h-8">
                {typedText}
                <span className="inline-block ml-1 animate-blink">|</span>
              </div>
            </motion.div>

            {/* Botões */}
            <motion.div
              className="flex gap-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <a
                href="/about"
                aria-label="Fale comigo"
                className="w-full block" // Faz o link ocupar toda a largura
              >
                <button
                  
                  className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Fale comigo!
                </button>
              </a>
            </motion.div>
          </motion.section>
        {/* Modelo 3D do Notebook ao lado */}
        </main>

        {/* Footer com Blur Interativo */}
        <footer
          className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10 mt-auto"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 Felipe Alves. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>

      {/* Estilos CSS */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .animate-blink {
          animation: blink 0.8s infinite;
        }

        .group-hover\:animate-bounce {
          animation: bounce 0.5s;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default IndexPage;
