"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; loggedIn: boolean } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário está logado
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      // Redirecionar para login se não estiver logado
      router.push("/login");
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutralLight flex items-center justify-center">
        <div className="text-neutralDark">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Será redirecionado pelo useEffect
  }
  return (
    <div className="min-h-screen bg-neutralLight">
      {/* Header com navegação */}
      <header className="bg-secondary shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-neutralDark">
              FinApp
            </Link>
            <nav className="flex gap-4 items-center">
              <Link
                href="/dashboard"
                className="text-primary font-medium hover:text-primary/80"
              >
                Dashboard
              </Link>
              <span className="text-neutralDark/70 text-sm">
                Olá, {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-neutralDark/70 hover:text-neutralDark text-sm underline"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutralDark mb-2">
            Dashboard
          </h1>
          <p className="text-neutralDark/70">Visão geral das suas finanças</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Saldo Atual
            </h3>
            <p className="text-3xl font-bold text-positive">R$ 2.450,00</p>
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Receitas do Mês
            </h3>
            <p className="text-3xl font-bold text-positive">R$ 5.200,00</p>
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Gastos do Mês
            </h3>
            <p className="text-3xl font-bold text-negative">R$ 2.750,00</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-4">
              Transações Recentes
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutralDark/70">Supermercado</span>
                <span className="text-negative font-semibold">-R$ 150,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutralDark/70">Salário</span>
                <span className="text-positive font-semibold">
                  +R$ 3.500,00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutralDark/70">Conta de Luz</span>
                <span className="text-negative font-semibold">-R$ 89,50</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-4">
              Metas Financeiras
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutralDark/70">
                    Reserva de Emergência
                  </span>
                  <span className="text-neutralDark/70">
                    R$ 8.500 / R$ 10.000
                  </span>
                </div>
                <div className="w-full bg-neutralDark/10 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
