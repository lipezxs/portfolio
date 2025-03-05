import { useState } from "react";
import DefaultLayout from "@/layouts/default"; // Importe o layout que contém a navbar
import { motion } from "framer-motion"; // Importe o Framer Motion

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <DefaultLayout> {/* Use o layout que contém a navbar */}
      <div
        className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Fundo animado */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`,
            zIndex: 0, // Define um z-index baixo para o gradiente
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Conteúdo da página */}
        <main className="flex-grow flex items-center justify-center relative z-10">
          {/* z-10 garante que o conteúdo fique acima do gradiente */}
          <motion.section
            className="container mx-auto px-4 py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.h2
              className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Meus Projetos
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <motion.div
                  key={project}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 * project, duration: 0.8 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Projeto {project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Descrição breve do projeto.
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </main>

        {/* Footer */}
        <motion.footer
          className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* z-10 garante que o footer fique acima do gradiente */}
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2025 Felipe Alves. Todos os direitos reservados.
            </p>
          </div>
        </motion.footer>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
