import DefaultLayout from "@/layouts/default";
import { useState, useEffect } from "react";

// Interface para o tipo de resposta do backend
interface ApiResponse {
  message?: string;
  error?: string;
}

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
  const [loading, setLoading] = useState(false);

  // Função para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Função para rastrear a posição do mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Função para validar o formulário
  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório.";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "E-mail inválido.";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Função para validar e-mail
  const isValidEmail = (email: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };
  

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || loading) return;

    setLoading(true);
    try {
      const response = await fetch("https://portfolio-k0tt.onrender.com/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    
      

      const result: ApiResponse = await response.json();

      if (response.ok) {
        setResponseMessage("✅ Mensagem enviada com sucesso!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMessage(`❌ ${result.error || "Erro ao enviar a mensagem."}`);
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setResponseMessage(`❌ Erro inesperado: ${error instanceof Error ? error.message : "Tente novamente."}`);
    } finally {
      setLoading(false);
    }
  };

  // Limpar mensagem de resposta após 5 segundos
  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => setResponseMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

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
            {(["name", "email", "subject", "message"] as const).map((field) => (
              <div key={field} className="mb-6">
                <label htmlFor={field} className="block text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {field === "name" ? "Nome" : field === "email" ? "E-mail" : field === "subject" ? "Assunto" : "Mensagem"}
                </label>
                {field === "message" ? (
                  <textarea
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    rows={5}
                    required
                  />
                ) : (
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                )}
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}

            {/* Botão de Enviar */}
            <div className="text-center">
              <button
                type="submit"
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-xl"
                }`}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Mensagem"}
              </button>
            </div>
          </form>

          {/* Mensagem de Resposta */}
          {responseMessage && (
            <p
              className={`mt-4 text-center font-semibold ${
                responseMessage.includes("sucesso") ? "text-green-500" : "text-red-500"
              }`}
              aria-live="polite"
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