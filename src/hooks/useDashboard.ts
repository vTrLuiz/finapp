import { useState, useEffect } from "react";

interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netIncome: number;
}

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  description: string | null;
  transactionDate: string;
  account: {
    name: string;
  };
  category: {
    name: string;
    color: string;
  } | null;
}

export function useDashboard(userId: string) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);

        const [summaryRes, transactionsRes] = await Promise.all([
          fetch(`/api/dashboard/summary?userId=${userId}`),
          fetch(`/api/transactions?userId=${userId}`),
        ]);

        if (!summaryRes.ok || !transactionsRes.ok) {
          throw new Error("Erro ao carregar dados do dashboard");
        }

        const [summaryData, transactionsData] = await Promise.all([
          summaryRes.json(),
          transactionsRes.json(),
        ]);

        setSummary(summaryData);
        setTransactions(transactionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchDashboardData();
    }
  }, [userId]);

  return { summary, transactions, loading, error };
}
