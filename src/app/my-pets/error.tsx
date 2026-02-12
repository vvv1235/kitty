'use client'

export default function MyPetsError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-pink-100">
        <div className="text-5xl mb-4">😿</div>
        <h1 className="text-2xl font-bold text-pink-600 mb-2">Ops, algo deu errado</h1>
        <p className="text-gray-600 mb-6">{error?.message || 'Erro inesperado. Tente novamente.'}</p>
        <button
          onClick={() => reset()}
          className="bg-gradient-to-r from-pink-400 to-orange-300 hover:from-pink-500 hover:to-orange-400 text-white px-6 py-3 rounded-full shadow transition"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
