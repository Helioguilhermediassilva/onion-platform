import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Plans from './components/Plans'
import Footer from './components/Footer'
import SearchResults from './components/SearchResults'
import PropertyRegistration from './components/PropertyRegistration'

function App() {
  const [searchData, setSearchData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState(null)
  const [showPropertyRegistration, setShowPropertyRegistration] = useState(false)
  const [customProperties, setCustomProperties] = useState([])

  const handleSearchResults = (data) => {
    try {
      console.log('Search results received:', data)
      setError(null)
      
      // Combinar resultados da API com imóveis cadastrados pelo usuário
      const combinedResults = {
        ...data,
        results: [...(data.results || []), ...customProperties],
        total: (data.total || 0) + customProperties.length
      }
      
      setSearchData(combinedResults)
      setIsSearching(false)
      
      // Scroll para os resultados
      setTimeout(() => {
        const resultsSection = document.getElementById('search-results')
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } catch (err) {
      console.error('Error handling search results:', err)
      setError('Erro ao processar resultados da busca')
      setIsSearching(false)
    }
  }

  const handleNewSearch = () => {
    try {
      setSearchData(null)
      setError(null)
      // Scroll de volta para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('Error clearing search:', err)
    }
  }

  const handlePropertyAdded = async (propertyData) => {
    try {
      // Enviar para API de cadastro
      const response = await fetch('/api/imoveis/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData)
      })

      if (response.ok) {
        const result = await response.json()
        
        // Adicionar à lista local de imóveis cadastrados
        setCustomProperties(prev => [...prev, result.data])
        
        console.log('Imóvel cadastrado com sucesso:', result.data)
      } else {
        throw new Error('Erro ao cadastrar imóvel')
      }
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error)
      // Mesmo com erro na API, adicionar localmente para demonstração
      setCustomProperties(prev => [...prev, propertyData])
    }
  }

  const openPropertyRegistration = () => {
    setShowPropertyRegistration(true)
  }

  const closePropertyRegistration = () => {
    setShowPropertyRegistration(false)
  }

  const clearSearchAndNavigate = (sectionId) => {
    try {
      // Sempre limpar os resultados de busca primeiro (se existirem)
      if (searchData) {
        setSearchData(null)
        setError(null)
      }
      
      // Aguardar um pouco para o DOM atualizar e depois navegar
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // Se o elemento não for encontrado, scroll para o topo
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, searchData ? 200 : 50) // Mais tempo se havia busca ativa
    } catch (err) {
      console.error('Error navigating:', err)
    }
  }

  // Renderização com tratamento de erro
  try {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header onNavigate={clearSearchAndNavigate} onOpenPropertyRegistration={openPropertyRegistration} />
        
        <Hero onSearchResults={handleSearchResults} />
        
        {/* Tratamento de erro */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-4">
            <strong>Erro:</strong> {error}
            <button 
              onClick={() => setError(null)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Fechar
            </button>
          </div>
        )}
        
        {/* Seção de Resultados da Busca */}
        {searchData && !error && (
          <div id="search-results">
            <SearchResults 
              results={searchData?.results || []}
              loading={isSearching}
              searchParams={searchData?.searchParams || {}}
              onNewSearch={handleNewSearch}
            />
          </div>
        )}
        
        {/* Seções originais - sempre mostrar se não há busca ativa */}
        {!searchData && (
          <>
            <About />
            <HowItWorks onOpenPropertyRegistration={openPropertyRegistration} />
            <Plans onOpenPropertyRegistration={openPropertyRegistration} />
          </>
        )}
        
        <Footer />
        
        {/* Modal de Cadastro de Imóvel */}
        {showPropertyRegistration && (
          <PropertyRegistration
            onClose={closePropertyRegistration}
            onPropertyAdded={handlePropertyAdded}
          />
        )}
      </div>
    )
  } catch (err) {
    console.error('Critical error in App component:', err)
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erro na Aplicação</h1>
          <p className="text-red-500 mb-4">Ocorreu um erro inesperado. Recarregue a página.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    )
  }
}

export default App

