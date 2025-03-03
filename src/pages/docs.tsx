import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa"; // Ícone do React
import { SiJavascript, SiTypescript, SiMysql } from "react-icons/si"; // Ícones de JavaScript, TypeScript e MySQL

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
      <div
        className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Efeito de gradiente no fundo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        />

        {/* Conteúdo Principal */}
        <main className="flex-grow flex items-center justify-center p-4">
          {/* Seção Sobre Mim */}
          <section id="about" className="w-full max-w-4xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Coluna A (Texto) */}
              <div className="md:w-1/2 text-center md:text-left">
                <header>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                    Sobre mim
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                  </h2>
                </header>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 text-sm md:text-base">
                  <p>
                    Me chamo Felipe Alves, cursando Análise e Desenvolvimento de Sistemas
                    pela UCB - Universidade Católica de Brasília e desenvolvedor web Front-end.
                  </p>
                  <p>
                    Tenho uma trajetória de cerca de 2 anos trabalhando com suporte técnico e manutenção de computadores, o que me tornou um profissional dedicado e organizado.
                  </p>
                  <p>
                    Hoje na área de desenvolvimento, vivo o aprendizado contínuo, focando em tecnologias JavaScript, React, TypeScript e MySQL. Busco oportunidades no mercado como dev e, em um futuro próximo, viso me tornar um desenvolvedor Full Stack.
                  </p>
                </div>
                <button
                  className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Baixar Currículo
                </button>

                {/* Seção de Conhecimentos */}
                <div className="mt-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Conhecimentos
                  </h3>
                  <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
                    {/* Ícone React */}
                    <div className="flex flex-col items-center">
                      <FaReact className="w-8 h-8 md:w-12 md:h-12 text-blue-500 hover:text-blue-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        React
                      </span>
                    </div>

                    {/* Ícone JavaScript */}
                    <div className="flex flex-col items-center">
                      <SiJavascript className="w-8 h-8 md:w-12 md:h-12 text-yellow-500 hover:text-yellow-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        JavaScript
                      </span>
                    </div>

                    {/* Ícone TypeScript */}
                    <div className="flex flex-col items-center">
                      <SiTypescript className="w-8 h-8 md:w-12 md:h-12 text-blue-600 hover:text-blue-700 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        TypeScript
                      </span>
                    </div>

                    {/* Ícone MySQL */}
                    <div className="flex flex-col items-center">
                      <SiMysql className="w-8 h-8 md:w-12 md:h-12 text-orange-500 hover:text-orange-600 transition-colors duration-300" />
                      <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-2">
                        MySQL
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna B (Imagem) */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="./src/img/felipe.jpg" // Substitua pelo caminho correto da imagem
                  alt="Imagem de Felipe Alves principal"
                  className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-sm transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
              </div>
            </div>
          </section>
        </main>

        {/* Footer com Blur Interativo */}
        <footer
          className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10"
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
    </DefaultLayout>
  );
};

export default IndexPage;