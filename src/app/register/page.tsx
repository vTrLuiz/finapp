"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const terms = formData.get("terms") as string;

    // Validações
    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      setIsLoading(false);
      return;
    }

    if (!terms) {
      setError("Você deve aceitar os termos de uso");
      setIsLoading(false);
      return;
    }

    try {
      // Chamar a API de registro
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      setSuccess("Conta criada com sucesso! Redirecionando...");

      // Salvar dados do usuário no localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          loggedIn: true,
        })
      );

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralLight to-secondary flex items-center justify-center">
      <div className="bg-secondary p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutralDark mb-2">
            Criar conta
          </h1>
          <p className="text-neutralDark/70">
            Comece a gerenciar suas finanças hoje
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-negative/10 border border-negative/20 text-negative px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-positive/10 border border-positive/20 text-positive px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutralDark mb-2"
            >
              Nome completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-neutralDark/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-neutralLight text-neutralDark"
              placeholder="Seu nome completo"
            />
          </div>

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
              minLength={8}
              className="w-full px-3 py-2 border border-neutralDark/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-neutralLight text-neutralDark"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutralDark mb-2"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full px-3 py-2 border border-neutralDark/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-neutralLight text-neutralDark"
              placeholder="Confirme sua senha"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-neutralDark/20 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-neutralDark/70"
            >
              Eu aceito os{" "}
              <Link href="/terms" className="text-primary hover:underline">
                termos de uso
              </Link>{" "}
              e{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                política de privacidade
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-neutralDark/70">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline font-medium"
            >
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
