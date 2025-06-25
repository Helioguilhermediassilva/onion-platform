import React from 'react'
import { CreditCard, Shield, Wrench, Building, PenTool } from 'lucide-react'

const Products = () => {
  const products = [
    {
      icon: CreditCard,
      title: "Financiamento Bancário",
      description: "Parcerias com instituições financeiras para facilitar o financiamento de imóveis comerciais com condições especiais.",
      features: ["Taxas competitivas", "Processo simplificado", "Aprovação rápida", "Consultoria especializada"]
    },
    {
      icon: Shield,
      title: "Seguro",
      description: "Proteção completa para seu imóvel e negócio com seguros especializados em propriedades comerciais.",
      features: ["Seguro predial", "Seguro de responsabilidade", "Cobertura personalizada", "Atendimento 24h"]
    },
    {
      icon: Wrench,
      title: "Mão de Obra",
      description: "Rede de profissionais qualificados para manutenção, reformas e adaptações do seu espaço comercial.",
      features: ["Profissionais certificados", "Orçamentos competitivos", "Garantia de serviços", "Atendimento rápido"]
    },
    {
      icon: Building,
      title: "Construção Civil",
      description: "Serviços completos de construção e reforma para adequar o imóvel às necessidades do seu negócio.",
      features: ["Projetos personalizados", "Execução profissional", "Materiais de qualidade", "Prazos cumpridos"]
    },
    {
      icon: PenTool,
      title: "Arquitetura",
      description: "Projetos arquitetônicos especializados em espaços comerciais para otimizar funcionalidade e estética.",
      features: ["Design funcional", "Otimização de espaços", "Projetos sustentáveis", "Acompanhamento completo"]
    }
  ]

  return (
    <section id="produtos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cesta de <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Parcerias estratégicas que agregam valor à sua locação comercial, 
            oferecendo soluções completas para seu negócio
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => {
            const IconComponent = product.icon
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20 group"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{product.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {product.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <button className="w-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary py-3 rounded-lg font-medium transition-all duration-300">
                    Saiba Mais
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Seção de Benefícios */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Por que escolher nossos produtos agregados?
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Mais do que apenas locação, oferecemos um ecossistema completo para o sucesso do seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Economia de Tempo</h4>
              <p className="text-muted-foreground text-sm">
                Todos os serviços em um só lugar, eliminando a necessidade de buscar fornecedores separadamente.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Preços Especiais</h4>
              <p className="text-muted-foreground text-sm">
                Condições exclusivas negociadas através das nossas parcerias estratégicas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Qualidade Garantida</h4>
              <p className="text-muted-foreground text-sm">
                Parceiros selecionados e avaliados para garantir a melhor experiência e resultados.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
              Conheça Todas as Parcerias
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products

