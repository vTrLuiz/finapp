import { prisma } from "./db";

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Conexão com o banco estabelecida com sucesso!");

    // Testar uma query simples
    const userCount = await prisma.user.count();
    console.log(`📊 Total de usuários no banco: ${userCount}`);

    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}
