import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutralLight to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-neutralDark mb-6">FinApp</h1>
          <p className="text-xl text-neutralDark/70 mb-8">
            Gerencie suas finanças de forma inteligente e simples
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-primary hover:bg-primary/90 text-neutralLight font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Fazer Login
            </Link>
            <Link
              href="/register"
              className="border border-primary text-primary hover:bg-primary/10 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Criar Conta
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-neutralDark">
              💰 Controle de Gastos
            </h3>
            <p className="text-neutralDark/70">
              Acompanhe seus gastos e receitas em tempo real
            </p>
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-neutralDark">
              📊 Relatórios
            </h3>
            <p className="text-neutralDark/70">
              Visualize gráficos e relatórios detalhados
            </p>
          </div>

          <div className="bg-secondary p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 text-neutralDark">
              🎯 Metas
            </h3>
            <p className="text-neutralDark/70">
              Defina e acompanhe suas metas financeiras
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
