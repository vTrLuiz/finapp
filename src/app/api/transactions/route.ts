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

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        account: true,
        category: true,
      },
      orderBy: { transactionDate: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      accountId,
      categoryId,
      amount,
      type,
      description,
      transactionDate,
    } = body;

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        accountId,
        categoryId,
        amount: parseFloat(amount),
        type,
        description,
        transactionDate: new Date(transactionDate),
      },
      include: {
        account: true,
        category: true,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
