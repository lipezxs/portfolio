import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import { motion } from "framer-motion"; // Importando framer-motion

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
      {/* Container principal */}
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Conteúdo Principal */}
        <main
          className="flex-grow flex items-center justify-center px-4"
          onMouseMove={handleMouseMove}
        >
          {/* Efeito de gradiente no fundo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
            }}
          />

          {/* Seção centralizada */}
          <motion.section
            className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl px-4"
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
              className="flex gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <a href="/about">
                <Button color="primary" variant="ghost">Fale comigo!</Button>
              </a>
            </motion.div>
          </motion.section>
        </main>

        {/* Footer (opcional) */}
        {/* <footer className="bg-gray-100 dark:bg-gray-800 text-center p-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2025 Felipe Alves. Todos os direitos reservados.
          </p>
        </footer> */}
      </div>

      {/* Estilos CSS */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </DefaultLayout>
  );
};

export default IndexPage;