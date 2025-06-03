import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNodedotjs } from "react-icons/si";

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <DefaultLayout>
      <div
        className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Fundo animado */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`,
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Conteúdo da página */}
        <main className="flex-grow flex items-center justify-center relative z-10">
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

            {/* Grade de Projetos */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {/* Projeto 1 */}
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Portfólio Pessoal
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Meu site pessoal onde exibo meus projetos e informações sobre mim.
                </p>
                <div className="mt-4">
                  <img
                    src="/portfolio.jpg"
                    alt="Imagem do Portfólio"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Tecnologias utilizadas:
                  </h4>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    <li className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full">
                      <SiReact className="w-4 h-4 text-[#61DAFB]" />
                      <span>React</span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full">
                      <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />
                      <span>Tailwind CSS</span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://github.com/seu-usuario/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Código</span>
                  </a>
                  <a
                    href="https://seu-portfolio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    <span>Ver Site</span>
                  </a>
                </div>
              </motion.div>

              {/* Projeto 2 */}
              <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sistema de Contato
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Ainda em desenvolvimento...
                </p>
                <div className="mt-4">
                  <img
                    src="/contato.jpg"
                    alt="Imagem do Sistema de Contato"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Tecnologias utilizadas:
                  </h4>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    <li className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full">
                      <SiReact className="w-4 h-4 text-[#61DAFB]" />
                      <span>React</span>
                    </li>
                    <li className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 rounded-full">
                      <SiNodedotjs className="w-4 h-4 text-[#339933]" />
                      <span>Node.js</span>
                    </li>
                  </ul>
                </div>
                <div className="flex gap-4 mt-6">
                  <a
                    href="https://github.com/seu-usuario/contato"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Código</span>
                  </a>
                  <a
                    href="https://seu-contato.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    <span>Ver Site</span>
                  </a>
                </div>
              </motion.div>
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
