import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MapPin, Building, DollarSign, Briefcase } from 'lucide-react'
import officeSpace1 from '../assets/images/office-space-1.jpg'
import officeSpace2 from '../assets/images/office-space-2.jpg'
import warehouse1 from '../assets/images/warehouse-1.webp'

const Hero = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!location && !propertyType && !searchQuery) {
      alert('Por favor, preencha pelo menos um campo para realizar a busca.')
      return
    }

    setIsSearching(true)

    try {
      // Mapear tipos de imóveis para a API
      const tipoMap = {
        'sala': 'Sala Comercial',
        'galpao': 'Galpão Industrial', 
        'loja': 'Loja',
        'escritorio': 'Escritório'
      }

      const searchData = {
        localizacao: location,
        tipo_imovel: tipoMap[propertyType] || propertyType,
        descricao: searchQuery
      }

      // Fazer requisição para a API
      const response = await fetch('/api/imoveis/buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData)
      })

      const data = await response.json()

      if (data.success) {
        // Passar resultados para o componente pai
        onSearchResults({
          results: data.resultados,
          searchParams: searchData,
          total: data.total
        })
      } else {
        console.error('Erro na busca:', data.error)
        onSearchResults({
          results: [],
          searchParams: searchData,
          total: 0,
          error: data.error
        })
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error)
      onSearchResults({
        results: [],
        searchParams: {
          localizacao: location,
          tipo_imovel: propertyType,
          descricao: searchQuery
        },
        total: 0,
        error: 'Erro ao conectar com o servidor. Tente novamente.'
      })
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section id="inicio" className="pt-20 pb-16 bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Facilitando a{' '}
                <span className="text-primary">Locação Comercial</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Espaço ideal, locação simplificada — da pequena sala ao galpão da indústria.
              </p>
            </div>

            {/* Barra de Pesquisa */}
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Qual imóvel o seu negócio precisa?
              </h3>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Localização"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                      disabled={isSearching}
                    />
                  </div>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground disabled:opacity-50"
                      disabled={isSearching}
                    >
                      <option value="">Tipo de imóvel</option>
                      <option value="sala">Sala Comercial</option>
                      <option value="galpao">Galpão Industrial</option>
                      <option value="loja">Loja</option>
                      <option value="escritorio">Escritório</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Descreva suas necessidades (metragem, valor, tipo de negócio...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    disabled={isSearching}
                  />
                </div>
                
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Buscar Imóveis
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Comece agora a buscar seu espaço ideal
              </Button>
              <Button variant="outline" size="lg">
                Saiba mais sobre a ONION
              </Button>
            </div>
          </div>

          {/* Imagens dos Imóveis */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={officeSpace1}
                  alt="Sala comercial moderna"
                  className="rounded-lg shadow-lg w-full h-48 object-cover"
                />
                <img
                  src={warehouse1}
                  alt="Galpão industrial"
                  className="rounded-lg shadow-lg w-full h-32 object-cover"
                />
              </div>
              <div className="pt-8">
                <img
                  src={officeSpace2}
                  alt="Escritório corporativo"
                  className="rounded-lg shadow-lg w-full h-56 object-cover"
                />
              </div>
            </div>
            
            {/* Overlay com estatísticas */}
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-lg shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Imóveis disponíveis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

