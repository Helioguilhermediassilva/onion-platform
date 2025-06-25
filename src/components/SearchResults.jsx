import React, { useState } from 'react'

const SearchResults = ({ results, loading, searchParams, onNewSearch }) => {
  const [selectedProperty, setSelectedProperty] = useState(null)

  console.log('SearchResults rendered with:', { results, loading, searchParams })

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Buscando imóveis...</h2>
            <p className="text-gray-600">
              Estamos consultando nossos parceiros para encontrar as melhores opções para você.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!results || results.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum imóvel encontrado</h2>
            <p className="text-gray-600 mb-6">
              Não encontramos imóveis que correspondam aos seus critérios de busca. 
              Tente ajustar os filtros ou entre em contato conosco para uma busca personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNewSearch}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Nova Busca
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                📞 Falar com Consultor
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header dos Resultados */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Resultados da Busca
              </h2>
              <p className="text-gray-600">
                Encontramos {results.length} imóveis que correspondem aos seus critérios
              </p>
            </div>
            <button 
              onClick={onNewSearch}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Nova Busca
            </button>
          </div>
          
          {/* Filtros Aplicados */}
          {searchParams && (
            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Filtros aplicados:</h3>
              <div className="flex flex-wrap gap-2">
                {searchParams.localizacao && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    📍 {searchParams.localizacao}
                  </span>
                )}
                {searchParams.tipo_imovel && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    🏢 {searchParams.tipo_imovel}
                  </span>
                )}
                {searchParams.descricao && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    🔍 {searchParams.descricao}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Grid de Resultados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((imovel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {imovel.titulo}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      🏢 {imovel.tipo}
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {imovel.fonte}
                  </span>
                </div>

                {/* Preço */}
                <div className="mb-4">
                  <div className="flex items-center text-2xl font-bold text-purple-600">
                    💰 R$ {imovel.preco}
                  </div>
                  <p className="text-sm text-gray-600">por mês</p>
                </div>

                {/* Detalhes */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    📍 <span className="text-sm ml-2">{imovel.localizacao}</span>
                  </div>
                  {imovel.area && imovel.area !== "Área não informada" && (
                    <div className="flex items-center text-gray-600">
                      📐 <span className="text-sm ml-2">{imovel.area}</span>
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedProperty(imovel)}
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                  >
                    👁️ Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Detalhes Melhorado */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200">
              {/* Header do Modal */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedProperty.titulo}</h3>
                    <div className="flex items-center space-x-4 text-purple-100">
                      <span className="flex items-center">
                        🏢 {selectedProperty.tipo}
                      </span>
                      <span className="flex items-center">
                        📍 {selectedProperty.localizacao}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="text-white hover:text-purple-200 text-3xl font-light transition-colors duration-200 bg-white bg-opacity-20 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-30"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* Preço em Destaque */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6 mb-6 border border-purple-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      💰 R$ {selectedProperty.preco}
                    </div>
                    <p className="text-purple-700 font-medium">por mês</p>
                  </div>
                </div>

                {/* Informações Principais */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      📋 Informações Básicas
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span className="w-20 text-gray-600 font-medium">Área:</span>
                        <span className="text-gray-900">{selectedProperty.area}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-600 font-medium">Tipo:</span>
                        <span className="text-gray-900">{selectedProperty.tipo}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-20 text-gray-600 font-medium">Fonte:</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {selectedProperty.fonte}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                      📍 Localização
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 font-medium">{selectedProperty.localizacao}</p>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                    📝 Descrição
                  </h4>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                    {selectedProperty.descricao}
                  </p>
                </div>

                {/* Informações de Contato */}
                {selectedProperty.contato && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      📞 Informações de Contato
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl mb-2">👤</div>
                        <p className="font-medium text-green-800">Nome</p>
                        <p className="text-green-700">{selectedProperty.contato.nome}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">📱</div>
                        <p className="font-medium text-green-800">Telefone</p>
                        <p className="text-green-700">{selectedProperty.contato.telefone}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl mb-2">✉️</div>
                        <p className="font-medium text-green-800">Email</p>
                        <p className="text-green-700 text-sm">{selectedProperty.contato.email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer do Modal */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    💡 Entre em contato para mais informações ou agendamento de visita
                  </p>
                  <button 
                    onClick={() => setSelectedProperty(null)}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Final */}
        <div className="mt-12 text-center">
          <div className="bg-purple-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nossa equipe especializada pode ajudar você a encontrar o imóvel comercial perfeito 
              para o seu negócio. Entre em contato para uma consultoria personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                📞 Falar com Consultor
              </button>
              <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
                ✉️ Receber Ofertas por Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchResults

