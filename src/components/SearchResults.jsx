import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MapPin, Building, DollarSign, Eye, Phone, Mail } from 'lucide-react'
import PropertyDetails from './PropertyDetails'

const SearchResults = ({ results, loading, searchParams, onNewSearch }) => {
  const [selectedProperty, setSelectedProperty] = useState(null)

  const handleViewDetails = (property) => {
    setSelectedProperty(property)
  }

  const handleCloseDetails = () => {
    setSelectedProperty(null)
  }

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Buscando imóveis...</h2>
            <p className="text-muted-foreground">
              Estamos consultando nossos parceiros para encontrar as melhores opções para você.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (!results || results.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <Building className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Nenhum imóvel encontrado</h2>
            <p className="text-muted-foreground mb-6">
              Não encontramos imóveis que correspondam aos seus critérios de busca. 
              Tente ajustar os filtros ou entre em contato conosco para uma busca personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={onNewSearch} variant="outline">
                Nova Busca
              </Button>
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Header dos Resultados */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Resultados da Busca
                </h2>
                <p className="text-muted-foreground">
                  Encontramos {results.length} imóveis que correspondem aos seus critérios
                </p>
              </div>
              <Button onClick={onNewSearch} variant="outline">
                Nova Busca
              </Button>
            </div>
            
            {/* Filtros Aplicados */}
            {searchParams && (
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Filtros aplicados:</h3>
                <div className="flex flex-wrap gap-2">
                  {searchParams.localizacao && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      📍 {searchParams.localizacao}
                    </span>
                  )}
                  {searchParams.tipo_imovel && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      🏢 {searchParams.tipo_imovel}
                    </span>
                  )}
                  {searchParams.descricao && (
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
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
              <div key={index} className="bg-card rounded-lg shadow-lg border border-border overflow-hidden hover:shadow-xl transition-shadow">
                {/* Header do Card */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
                        {imovel.titulo}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Building className="h-4 w-4 mr-1" />
                        {imovel.tipo}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {imovel.fonte}
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="mb-4">
                    <div className="flex items-center text-2xl font-bold text-primary">
                      <DollarSign className="h-5 w-5 mr-1" />
                      {imovel.preco}
                    </div>
                    {imovel.preco.includes('R$') && (
                      <p className="text-sm text-muted-foreground">por mês</p>
                    )}
                  </div>

                  {/* Detalhes */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{imovel.localizacao}</span>
                    </div>
                    {imovel.area && imovel.area !== "Área não informada" && (
                      <div className="flex items-center text-muted-foreground">
                        <Building className="h-4 w-4 mr-2" />
                        <span className="text-sm">{imovel.area}</span>
                      </div>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleViewDetails(imovel)}
                      className="flex-1"
                      size="sm"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Final */}
          <div className="mt-12 text-center">
            <div className="bg-secondary/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Não encontrou o que procurava?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nossa equipe especializada pode ajudar você a encontrar o imóvel comercial perfeito 
                para o seu negócio. Entre em contato para uma consultoria personalizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Falar com Consultor
                </Button>
                <Button variant="outline" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Receber Ofertas por Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Detalhes */}
      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={handleCloseDetails} 
        />
      )}
    </>
  )
}

export default SearchResults

