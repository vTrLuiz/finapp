import { NextResponse } from "next/server";
import { testConnection } from "@/lib/test-connection";

export async function GET() {
  try {
    const isConnected = await testConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "Banco de dados conectado com sucesso!",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Erro ao conectar com o banco de dados",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor",
      },
      { status: 500 }
    );
  }
}
