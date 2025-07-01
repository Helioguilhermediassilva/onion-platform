import React, { useState } from 'react'

const SearchResults = ({ results, loading, searchParams, onNewSearch }) => {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

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
          <div className="fixed inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/15 to-purple-700/20 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-200">
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
              <div className="p-6 overflow-y-auto" style={{maxHeight: 'calc(95vh - 200px)'}}>
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

                {/* Detalhes e Características */}
                {selectedProperty.detalhes && selectedProperty.detalhes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                      ⭐ Características e Diferenciais
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {selectedProperty.detalhes.map((detalhe, index) => {
                        const detalhesLabels = {
                          'garagem': '🚗 Garagem',
                          'seguranca_24h': '🛡️ Segurança 24h',
                          'cameras_seguranca': '📹 Câmeras de segurança',
                          'elevador': '🛗 Elevador',
                          'portaria': '🏢 Portaria',
                          'acesso_deficientes': '♿ Acesso para deficientes',
                          'ar_condicionado': '❄️ Ar condicionado',
                          'internet': '🌐 Internet',
                          'estacionamento_visitantes': '🅿️ Estacionamento visitantes'
                        }
                        
                        return (
                          <div key={index} className="flex items-center space-x-2 bg-purple-50 rounded-lg p-3 border border-purple-200">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm font-medium text-purple-800">
                              {detalhesLabels[detalhe] || detalhe}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Galeria de Fotos */}
                {selectedProperty.fotos && selectedProperty.fotos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                      📸 Galeria de Fotos ({selectedProperty.fotos.length} foto{selectedProperty.fotos.length > 1 ? 's' : ''})
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {selectedProperty.fotos.map((foto, index) => (
                        <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md">
                          <img
                            src={foto.url || foto}
                            alt={`Foto ${index + 1} do imóvel`}
                            className="w-full h-40 object-cover border border-gray-200 hover:border-purple-400 transition-all duration-200 group-hover:scale-105"
                            onClick={() => {
                              console.log('=== DEBUG CLIQUE NA FOTO ===')
                              console.log('Foto clicada:', foto.url || foto)
                              console.log('Index:', index)
                              console.log('Total de fotos:', selectedProperty.fotos.length)
                              
                              const photoData = {
                                url: foto.url || foto,
                                alt: `Foto ${index + 1} do imóvel`,
                                index: index + 1,
                                total: selectedProperty.fotos.length
                              }
                              
                              console.log('Dados da foto para modal:', photoData)
                              setSelectedPhoto(photoData)
                              console.log('Estado selectedPhoto setado!')
                              console.log('=== FIM DEBUG ===')
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2">
                            <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded">
                              🔍 Ampliar
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Clique nas fotos para visualizar em tamanho maior
                    </p>
                  </div>
                )}

                {/* Informações Adicionais */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                    📊 Informações Adicionais
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProperty.vagas_garagem && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600 text-lg">🚗</span>
                          <div>
                            <p className="font-medium text-blue-800">Vagas de Garagem</p>
                            <p className="text-blue-700">{selectedProperty.vagas_garagem}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedProperty.condominio && selectedProperty.condominio !== '0' && (
                      <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-orange-600 text-lg">🏢</span>
                          <div>
                            <p className="font-medium text-orange-800">Condomínio</p>
                            <p className="text-orange-700">R$ {selectedProperty.condominio}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedProperty.iptu && selectedProperty.iptu !== '0' && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 text-lg">🏛️</span>
                          <div>
                            <p className="font-medium text-green-800">IPTU</p>
                            <p className="text-green-700">R$ {selectedProperty.iptu}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {selectedProperty.data_cadastro && (
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 text-lg">📅</span>
                          <div>
                            <p className="font-medium text-gray-800">Data do Cadastro</p>
                            <p className="text-gray-700">
                              {new Date(selectedProperty.data_cadastro).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Footer do Modal */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-t border-purple-200">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                  <div className="text-center md:text-left">
                    <p className="text-sm font-medium text-purple-800">
                      🏢 Interessado neste imóvel?
                    </p>
                    <p className="text-xs text-purple-600">
                      Entre em contato com a ONION para mais informações e agendamento de visita
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium text-sm">
                      💬 Falar com ONION
                    </button>
                    <button 
                      onClick={() => setSelectedProperty(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium text-sm"
                    >
                      Fechar
                    </button>
                  </div>
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

      {/* Modal de Visualização de Foto Ampliada */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log('Clicou no overlay principal para fechar')
              setSelectedPhoto(null)
            }
          }}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Header do Modal de Foto */}
            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 z-10 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{selectedPhoto.alt}</h3>
                  <p className="text-sm text-gray-300">
                    Foto {selectedPhoto.index} de {selectedPhoto.total}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Fechando modal de foto via botão X')
                    setSelectedPhoto(null)
                  }}
                  className="text-white hover:text-gray-300 text-2xl font-light bg-black bg-opacity-30 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-50 transition-all"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Imagem Ampliada */}
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                console.log('Clicou na imagem ampliada para fechar')
                setSelectedPhoto(null)
              }}
            />

            {/* Footer do Modal de Foto */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <div className="text-center">
                <p className="text-sm text-gray-300 mb-2">
                  💡 Clique na imagem ou no X para fechar
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('Clicou no botão fechar visualização')
                    setSelectedPhoto(null)
                  }}
                  className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default SearchResults

