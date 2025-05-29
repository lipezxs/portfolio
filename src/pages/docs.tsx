import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { FaReact } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiMysql, SiNodedotjs, SiGit, SiGithub,  SiDocker} from "react-icons/si"; 
import { motion } from "framer-motion"; 

const IndexPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleDownloadCV = () => {
    window.open("https://drive.google.com/file/d/1UMCBmWoRNgN_TLYlA149aVRAGey9QKiT/view?usp=drive_link", "_blank");
  };

  return (
    <DefaultLayout>
      {/* Container principal */}
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

        {/* Conteúdo Principal */}
        <main className="flex-grow flex items-center justify-center p-4 md:p-8">
          {/* Seção Sobre Mim */}
          <motion.section
            id="about"
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              {/* Coluna A (Texto) */}
              <div className="md:w-1/2 text-center md:text-left">
                <header>
                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    Sobre mim
                  </motion.h2>
                </header>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-sm md:text-base">
                  <p>
                    Me chamo Felipe Alves, tenho 19 anos e sou estudante de Análise e Desenvolvimento de Sistemas na UCB <span className="text-blue-500">Universidade Católica de Brasília</span>. Atuo como desenvolvedor web Front-end, com experiência em suporte técnico e manutenção de computadores.
                  </p>
                  <p>
                    Atualmente, meu foco está em tecnologias como <span className="text-blue-500">JavaScript</span>, <span className="text-blue-500">React</span>, <span className="text-blue-500">TypeScript</span>, <span className="text-blue-500">Node.js</span> e <span className="text-blue-500">SQL</span>. Busco oportunidades como desenvolvedor e tenho como objetivo me tornar um profissional <span className="text-blue-500">Full Stack</span>.
                  </p>
                </div>
                <motion.button
                  onClick={handleDownloadCV}
                  className="mt-6 md:mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  Ver Currículo
                </motion.button>

                {/* Seção de Conhecimentos */}
                <motion.div
                  className="mt-8 md:mt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 1 }}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
                    Conhecimentos
                  </h3>
                  <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">

                    {/* Ícone JavaScript */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <SiJavascript className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 hover:text-yellow-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        JavaScript
                      </span>
                    </motion.div>

                    {/* Ícone React */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <FaReact className="w-8 h-8 md:w-10 md:h-10 text-blue-500 hover:text-blue-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        React
                      </span>
                    </motion.div>

                    {/* Ícone TypeScript */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <SiTypescript className="w-8 h-8 md:w-10 md:h-10 text-blue-600 hover:text-blue-700 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        TypeScript
                      </span>
                    </motion.div>

                    {/* Ícone Node.js */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.5 }}
                    >
                      <SiNodedotjs className="w-8 h-8 md:w-10 md:h-10 text-green-500 hover:text-green-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Node.js
                      </span>
                    </motion.div>

                    {/* Ícone Git */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6, duration: 0.5 }}
                    >
                      <SiGit className="w-8 h-8 md:w-10 md:h-10 text-orange-500 hover:text-orange-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Git
                      </span>
                    </motion.div>

                    {/* Ícone GitHub */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                    >
                      <SiGithub className="w-8 h-8 md:w-10 md:h-10 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        GitHub
                      </span>
                    </motion.div>

                    {/* Ícone MySQL */}
                    <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <SiMysql className="w-8 h-8 md:w-10 md:h-10 text-orange-500 hover:text-orange-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        MySQL
                      </span>
                    </motion.div>
                     
                     <motion.div
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4, duration: 0.5 }}
                    >
                      <SiDocker className="w-8 h-8 md:w-10 md:h-10 text-blue-500 hover:text-blue-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Docker
                      </span>
                      </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Coluna B (Imagem) */}
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <img
                  src="/felipe.jpg" 
                  alt="Imagem de Felipe Alves principal"
                  className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
              </motion.div>
            </div>
          </motion.section>
        </main>

        {/* Footer com Blur Interativo */}
        <motion.footer
          className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
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