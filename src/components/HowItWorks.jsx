import React from 'react'
import { ArrowRight, CheckCircle, Users, Settings, FileCheck, Shield, Megaphone } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Busque seu Imóvel",
      description: "Use nossa busca inteligente com filtros avançados para encontrar o espaço ideal para seu negócio.",
      icon: CheckCircle
    },
    {
      number: "02", 
      title: "Conecte-se Diretamente",
      description: "Entre em contato direto com o proprietário através da nossa plataforma segura.",
      icon: Users
    },
    {
      number: "03",
      title: "Gerencie Tudo Online",
      description: "Utilize nossa plataforma de gestão para acompanhar contratos, pagamentos e documentação.",
      icon: Settings
    },
    {
      number: "04",
      title: "Finalize com Segurança",
      description: "Complete o processo com nossa simplificação jurídica e garantia de segurança nas transações.",
      icon: FileCheck
    }
  ]

  const differentials = [
    {
      icon: Users,
      title: "Contratação Direta",
      description: "Conectamos locadores e locatários diretamente, eliminando intermediários desnecessários e reduzindo custos."
    },
    {
      icon: Settings,
      title: "Plataforma de Gestão",
      description: "Sistema completo para gerenciar contratos, pagamentos, documentos e comunicação em um só lugar."
    },
    {
      icon: FileCheck,
      title: "Gestão Contratual",
      description: "Contratos padronizados e processos jurídicos simplificados para maior agilidade e segurança."
    },
    {
      icon: Shield,
      title: "Segurança nas Transações",
      description: "Ambiente seguro com verificação de identidade e proteção de dados para todas as partes envolvidas."
    },
    {
      icon: Megaphone,
      title: "Divulgação Eficiente",
      description: "Alcance máximo para seus imóveis com nossa rede de divulgação otimizada e segmentada."
    }
  ]

  return (
    <section id="como-funciona" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como <span className="text-primary">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Um processo simples e eficiente para conectar você ao imóvel comercial ideal
          </p>
        </div>

        {/* Processo em Etapas */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{step.number}</div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Seta conectora (apenas para desktop) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-primary/60" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Diferenciais */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nossos <span className="text-primary">Diferenciais</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              O que nos torna únicos no mercado de locação comercial
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentials.map((differential, index) => {
              const IconComponent = differential.icon
              return (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">{differential.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {differential.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para começar?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já encontraram seu espaço ideal através da ONION
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
                Buscar Imóveis
              </button>
              <button className="border border-border hover:bg-secondary/50 text-foreground px-8 py-3 rounded-lg font-medium transition-colors">
                Anunciar Imóvel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

