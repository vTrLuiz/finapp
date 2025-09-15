"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    email: string;
    loggedIn: boolean;
    id: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    summary,
    transactions,
    loading: dataLoading,
    error,
  } = useDashboard(user?.id || "");

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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Erro ao carregar dados: {error}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Saldo Atual
            </h3>
            {dataLoading ? (
              <div className="text-neutralDark/70">Carregando...</div>
            ) : (
              <p className="text-3xl font-bold text-positive">
                R${" "}
                {summary?.totalBalance.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                }) || "0,00"}
              </p>
            )}
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Receitas do Mês
            </h3>
            {dataLoading ? (
              <div className="text-neutralDark/70">Carregando...</div>
            ) : (
              <p className="text-3xl font-bold text-positive">
                R${" "}
                {summary?.monthlyIncome.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                }) || "0,00"}
              </p>
            )}
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-2">
              Gastos do Mês
            </h3>
            {dataLoading ? (
              <div className="text-neutralDark/70">Carregando...</div>
            ) : (
              <p className="text-3xl font-bold text-negative">
                R${" "}
                {summary?.monthlyExpenses.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                }) || "0,00"}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-neutralDark mb-4">
              Transações Recentes
            </h3>
            <div className="space-y-3">
              {dataLoading ? (
                <div className="text-neutralDark/70">Carregando...</div>
              ) : transactions.length === 0 ? (
                <div className="text-neutralDark/70">
                  Nenhuma transação encontrada
                </div>
              ) : (
                transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <span className="text-neutralDark/70">
                        {transaction.description || "Sem descrição"}
                      </span>
                      <span className="text-xs text-neutralDark/50">
                        {transaction.account.name}
                      </span>
                    </div>
                    <span
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-positive"
                          : "text-negative"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}R${" "}
                      {Number(transaction.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))
              )}
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
