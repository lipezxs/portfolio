import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <DefaultLayout>
      <div
        className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        />

        {/* Header */}
        <header className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {typedText}
            <span className="animate-blink">|</span>
          </h1>
        </header>

        {/* Seção de Projetos */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Meus Projetos
          </h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <motion.div
                key={project}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Projeto {project}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Descrição breve do projeto.</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Footer */}
        <footer
          className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px,  rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 Felipe Alves. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>

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