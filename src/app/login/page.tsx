"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Simulação de validação básica
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    // Simulação de login (substitua por API real)
    setTimeout(() => {
      // Para demo, aceita qualquer email/senha
      localStorage.setItem("user", JSON.stringify({ email, loggedIn: true }));
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralLight to-secondary flex items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutralDark mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-neutralDark/70">Faça login na sua conta FinApp</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-negative/10 border border-negative/20 text-negative px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutralDark mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-neutralDark/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-neutralLight text-neutralDark"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutralDark mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-neutralDark/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-neutralLight text-neutralDark"
              placeholder="Sua senha"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-neutralDark/20 rounded"
              />
              <span className="ml-2 text-sm text-neutralDark/70">
                Lembrar de mim
              </span>
            </label>
            <a href="#" className="text-sm text-primary hover:text-primary/80">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-neutralLight font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutralDark/70">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary/80 font-semibold"
            >
              Criar conta
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-neutralDark/50 hover:text-neutralDark/70"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
