import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";


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
        className="min-h-screen flex flex-col "
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
        <main className="flex-grow flex items-center justify-center">
          {/* Seção Sobre Mim */}
          <section id="about" className="py-16 w-full">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
              {/* Coluna A (Texto) */}
              <div className="md:w-1/2 md:pr-8 text-center md:text-left">
                <header>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 relative inline-block">
                    Sobre mim
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
                  </h2>
                </header>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>
                    Me chamo Felipe Alves, cursando Análise e Desenvolvimento de Sistemas
                    pela UCB - Universidade Católica de Brasília e desenvolvedor web Front-end. Desenvolvo páginas e sistemas web responsivos e de layout atrativo.
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
              </div>

              {/* Coluna B (Imagem) */}
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <img
                  src="./src/img/felipe.jpg" // Substitua pelo caminho correto da imagem
                  alt="Imagem de Felipe Alves principal"
                  className="rounded-lg shadow-2xl w-full max-w-xs md:max-w-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;