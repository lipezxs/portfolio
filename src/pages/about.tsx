import DefaultLayout from "@/layouts/default";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpa o erro ao digitar
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name) {
      newErrors.name = "Nome é obrigatório.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido.";
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = "Assunto é obrigatório.";
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = "Mensagem é obrigatória.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/contato", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setResponseMessage("Mensagem enviada com sucesso!");
          setFormData({ name: "", email: "", subject: "", message: "" }); // Limpa o formulário
        } else {
          setResponseMessage(result.error || "Erro ao enviar a mensagem. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro:", error);
        setResponseMessage("Erro ao enviar a mensagem. Tente novamente.");
      }
    }
  };

  return (
    <DefaultLayout>
      <section
        id="contact"
        className="py-16 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Efeito de gradiente no fundo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(0, 0, 0, 0) 50%)`,
          }}
        />

        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Fale Comigo
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            {/* Campo Nome */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Campo E-mail */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Campo Assunto */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
            </div>

            {/* Campo Mensagem */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                rows={5}
                required
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Botão de Enviar */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>

          {/* Mensagem de Resposta */}
          {responseMessage && (
            <p
              className={`mt-4 text-center ${
                responseMessage.includes("sucesso") ? "text-green-500" : "text-red-500"
              }`}
            >
              {responseMessage}
            </p>
          )}
        </div>
      </section>

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
    </DefaultLayout>
  );
};

export default ContactSection;