import React, { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Products from './components/Products'
import Plans from './components/Plans'
import Footer from './components/Footer'
import SearchResults from './components/SearchResults'

function App() {
  const [searchData, setSearchData] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearchResults = (data) => {
    setSearchData(data)
    setIsSearching(false)
    
    // Scroll para os resultados
    setTimeout(() => {
      const resultsSection = document.getElementById('search-results')
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleNewSearch = () => {
    setSearchData(null)
    // Scroll de volta para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearSearchAndNavigate = (sectionId) => {
    // Sempre limpar os resultados de busca primeiro (se existirem)
    if (searchData) {
      setSearchData(null)
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
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onNavigate={clearSearchAndNavigate} />
      
      <Hero onSearchResults={handleSearchResults} />
      
      {/* Seção de Resultados da Busca */}
      {searchData && (
        <div id="search-results">
          <SearchResults 
            results={searchData.results}
            loading={isSearching}
            searchParams={searchData.searchParams}
            onNewSearch={handleNewSearch}
          />
        </div>
      )}
      
      {/* Seções originais - sempre mostrar */}
      <About />
      <HowItWorks />
      <Products />
      <Plans />
      
      <Footer />
    </div>
  )
}

export default App

