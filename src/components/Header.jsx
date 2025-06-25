import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId)
    } else {
      // Fallback para navegação padrão
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        // Se não encontrar o elemento, scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">O</span>
            </div>
            <span className="text-2xl font-bold text-primary">ONION</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('inicio')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => handleNavigation('sobre')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Sobre
            </button>
            <button 
              onClick={() => handleNavigation('como-funciona')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => handleNavigation('produtos')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Produtos
            </button>
            <button 
              onClick={() => handleNavigation('planos')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Planos
            </button>
            <Button 
              onClick={() => handleNavigation('inicio')}
              className="bg-primary hover:bg-primary/90"
            >
              Comece Agora
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-foreground hover:text-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('inicio')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => handleNavigation('sobre')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Sobre
              </button>
              <button 
                onClick={() => handleNavigation('como-funciona')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => handleNavigation('produtos')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Produtos
              </button>
              <button 
                onClick={() => handleNavigation('planos')}
                className="text-left text-foreground hover:text-primary transition-colors"
              >
                Planos
              </button>
              <Button 
                onClick={() => handleNavigation('inicio')}
                className="bg-primary hover:bg-primary/90 w-fit"
              >
                Comece Agora
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

