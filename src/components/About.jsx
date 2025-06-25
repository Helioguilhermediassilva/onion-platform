import React from 'react'
import { Shield, Users, Zap, Brain, FileText, Search, Palette, Scale } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Gestão Simplificada e Segura",
      description: "Plataforma segura com processos simplificados para locação comercial sem complicações."
    },
    {
      icon: Users,
      title: "Transparência nas Transações",
      description: "Total transparência em todas as etapas do processo de locação, sem surpresas."
    },
    {
      icon: Zap,
      title: "Experiência do Usuário Superior",
      description: "Interface intuitiva e experiência otimizada para locadores e locatários."
    },
    {
      icon: Brain,
      title: "Tecnologia de Ponta (IA)",
      description: "Inteligência artificial para matching inteligente entre imóveis e necessidades."
    },
    {
      icon: FileText,
      title: "Consultoria Imobiliária",
      description: "Suporte especializado em todas as etapas do processo de locação."
    },
    {
      icon: Search,
      title: "Busca Rápida de Imóveis",
      description: "Sistema de busca avançado com filtros inteligentes para encontrar o imóvel ideal."
    },
    {
      icon: Palette,
      title: "Design Amigável",
      description: "Interface moderna e intuitiva que facilita a navegação e uso da plataforma."
    },
    {
      icon: Scale,
      title: "Simplificação Jurídica",
      description: "Processos jurídicos simplificados com documentação padronizada e segura."
    }
  ]

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre a <span className="text-primary">ONION</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Uma plataforma que simplifica a locação comercial, conectando locadores e locatários 
            com foco em eficiência, segurança e experiência superior.
          </p>
        </div>

        {/* Proposta de Valor */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Nossa Proposta de Valor
              </h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                A ONION revoluciona o mercado de locação comercial oferecendo uma plataforma digital 
                completa que conecta empreendedores, investidores e empresas aos imóveis comerciais ideais. 
                De pequenas salas a grandes galpões industriais, facilitamos cada etapa do processo 
                com tecnologia, transparência e suporte especializado.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Público-Alvo */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Nosso Público-Alvo
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Empreendedores</h4>
              <p className="text-muted-foreground text-sm">
                Profissionais que buscam o espaço ideal para iniciar ou expandir seus negócios.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Investidores</h4>
              <p className="text-muted-foreground text-sm">
                Pessoas físicas e jurídicas que investem em imóveis comerciais para locação.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Empresas</h4>
              <p className="text-muted-foreground text-sm">
                Organizações que precisam de espaços comerciais para suas operações e expansão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

