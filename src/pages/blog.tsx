import { useState } from "react";
import DefaultLayout from "@/layouts/default"; // Importe o layout que contém a navbar

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
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 100%)`,
            zIndex: 0, // Define um z-index baixo para o gradiente
          }}
        />

        {/* Conteúdo da página */}
        <main className="flex-grow flex items-center justify-center relative z-10">
          {/* z-10 garante que o conteúdo fique acima do gradiente */}
          <section className="container mx-auto px-4 py-8 md:py-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 md:mb-12">
              Meus Projetos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((project) => (
                <div
                  key={project}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Projeto {project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Descrição breve do projeto.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border-t border-gray-200/10 dark:border-gray-700/10 relative z-10">
          {/* z-10 garante que o footer fique acima do gradiente */}
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