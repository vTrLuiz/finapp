import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar transações do mês atual
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [income, expenses, accounts] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          userId,
          type: "income",
          transactionDate: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          type: "expense",
          transactionDate: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: { amount: true },
      }),
      prisma.account.findMany({
        where: { userId },
        select: { balance: true },
      }),
    ]);

    const totalIncome = Number(income._sum.amount || 0);
    const totalExpenses = Number(expenses._sum.amount || 0);
    const totalBalance = accounts.reduce(
      (sum, account) => sum + Number(account.balance),
      0
    );

    return NextResponse.json({
      totalBalance,
      monthlyIncome: totalIncome,
      monthlyExpenses: totalExpenses,
      netIncome: totalIncome - totalExpenses,
    });
  } catch (error) {
    console.error("Erro ao buscar resumo:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
