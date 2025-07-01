import React from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    empresa: [
      { name: "Sobre a ONION", href: "#sobre" },
      { name: "Como Funciona", href: "#como-funciona" },
      { name: "Planos e Preços", href: "#planos" }
    ],
    servicos: [
      { name: "Buscar Imóveis", href: "#" },
      { name: "Anunciar Imóvel", href: "#" },
      { name: "Gestão de Contratos", href: "#" },
      { name: "Consultoria", href: "#" }
    ],
    suporte: [
      { name: "Central de Ajuda", href: "#" },
      { name: "Contato", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Suporte Técnico", href: "#" }
    ],
    legal: [
      { name: "Termos de Uso", href: "#" },
      { name: "Política de Privacidade", href: "#" },
      { name: "Cookies", href: "#" },
      { name: "LGPD", href: "#" }
    ]
  }

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Twitter, href: "#", name: "Twitter" }
  ]

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        {/* Seção Principal do Footer */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                <span className="text-foreground font-bold text-xl">O</span>
              </div>
              <span className="text-2xl font-bold text-background">ONION</span>
            </div>
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Facilitando a locação comercial através de tecnologia, transparência e suporte especializado. 
              Conectamos locadores e locatários com eficiência e segurança.
            </p>
            
            {/* Informações de Contato */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-background/60" />
                <span className="text-background/80 text-sm">contato@onion.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-background/60" />
                <span className="text-background/80 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-background/60" />
                <span className="text-background/80 text-sm">São Paulo, SP - Brasil</span>
              </div>
            </div>
          </div>

          {/* Links da Empresa */}
          <div>
            <h4 className="font-semibold text-background mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links de Serviços */}
          <div>
            <h4 className="font-semibold text-background mb-4">Serviços</h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links de Suporte */}
          <div>
            <h4 className="font-semibold text-background mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-background/5 rounded-xl p-6 mb-8">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="font-semibold text-background mb-2">
                Fique por dentro das novidades
              </h4>
              <p className="text-background/80 text-sm">
                Receba atualizações sobre novos imóveis e funcionalidades da plataforma
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:max-w-md">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-lg bg-background text-foreground border border-background/20 focus:outline-none focus:ring-2 focus:ring-background/40"
              />
              <button className="bg-background text-foreground px-6 py-2 rounded-lg font-medium hover:bg-background/90 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Redes Sociais e Copyright */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Redes Sociais */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-background/80 text-sm">Siga-nos:</span>
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4 text-background" />
                  </a>
                )
              })}
            </div>

            {/* Links Legais */}
            <div className="flex flex-wrap gap-4 text-sm">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-background/20">
            <p className="text-background/60 text-sm">
              © {currentYear} ONION. Todos os direitos reservados. 
              Facilitando a locação comercial com tecnologia e transparência.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

