import React from 'react'
import { Check, Star, Zap, Building, Megaphone } from 'lucide-react'

const Plans = ({ onOpenPropertyRegistration }) => {
  // Função para scroll suave para a seção de busca (começar gratuitamente)
  const scrollToSearch = () => {
    const searchSection = document.querySelector('#hero') || document.querySelector('input[placeholder*="Localização"]')?.closest('section')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Função para contato com consultor
  const contactConsultant = () => {
    // Pode ser um mailto ou scroll para footer/contato
    const email = 'contato@onion.com.br'
    const subject = 'Interesse em consultoria ONION'
    const body = 'Olá! Tenho interesse em conversar com um consultor sobre os planos da ONION.'
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  const plans = [
    {
      icon: Building,
      title: "Modelo Recorrente",
      subtitle: "10% mensal",
      description: "Taxa sobre o valor da locação para uso completo da plataforma",
      features: [
        "Acesso completo à plataforma",
        "Gestão de contratos",
        "Suporte especializado",
        "Relatórios detalhados",
        "Segurança nas transações",
        "Atualizações automáticas"
      ],
      highlight: false,
      cta: "Começar Agora"
    },
    {
      icon: Zap,
      title: "Cesta de produtos",
      subtitle: "Pacote completo",
      description: "Conjunto de serviços integrados para maximizar seus resultados",
      features: [
        "Gestão completa de imóveis",
        "Marketing digital incluído",
        "Consultoria especializada",
        "Relatórios avançados",
        "Suporte premium 24/7",
        "Ferramentas exclusivas"
      ],
      highlight: false,
      cta: "Conhecer Pacote"
    },
    {
      icon: Star,
      title: "Publicidade",
      subtitle: "Imóveis em destaque",
      description: "Destaque seus imóveis para maior visibilidade e locação mais rápida",
      features: [
        "Posição privilegiada nas buscas",
        "Selo de destaque",
        "Maior alcance de visualizações",
        "Relatórios de performance",
        "Suporte prioritário",
        "Análise de mercado"
      ],
      highlight: true,
      cta: "Destacar Imóvel"
    }
  ]

  return (
    <section id="planos" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos e <span className="text-primary">Modelo de Cobrança</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o modelo que melhor se adapta às suas necessidades e objetivos de negócio
          </p>
        </div>

        {/* Grid de Planos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            return (
              <div 
                key={index}
                className={`relative bg-card p-8 rounded-xl border transition-all duration-300 hover:shadow-xl ${
                  plan.highlight 
                    ? 'border-primary shadow-lg scale-105' 
                    : 'border-border hover:border-primary/20'
                }`}
              >
                {/* Badge de Destaque */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    plan.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                  }`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.title}</h3>
                  <div className="text-lg font-semibold text-primary mb-3">{plan.subtitle}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                    : 'bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary'
                }`}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>

        {/* Seção de Benefícios Gerais */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Benefícios inclusos em todos os planos
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Independente do plano escolhido, você terá acesso a recursos essenciais para o sucesso da sua locação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Suporte 24/7</h4>
              <p className="text-muted-foreground text-sm">
                Atendimento especializado sempre que precisar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Segurança Total</h4>
              <p className="text-muted-foreground text-sm">
                Proteção de dados e transações seguras
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Atualizações</h4>
              <p className="text-muted-foreground text-sm">
                Novas funcionalidades sem custo adicional
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Relatórios</h4>
              <p className="text-muted-foreground text-sm">
                Análises detalhadas do seu desempenho
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Pronto para começar?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Escolha o plano ideal para seu negócio e comece a aproveitar todos os benefícios da ONION hoje mesmo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={scrollToSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Começar Gratuitamente
            </button>
            <button 
              onClick={contactConsultant}
              className="border border-border hover:bg-secondary/50 text-foreground px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Falar com Consultor
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plans

