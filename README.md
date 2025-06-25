# ONION - Plataforma de Locação Comercial

**Autor:** Hélio Guilherme Dias Silva  
**Descrição:** Facilitando a locação comercial — da pequena sala ao galpão da indústria.

## 🎯 Sobre o Projeto

A ONION é uma plataforma digital completa que revoluciona o mercado de locação comercial, conectando empreendedores, investidores e empresas aos imóveis comerciais ideais. De pequenas salas a grandes galpões industriais, facilitamos cada etapa do processo com tecnologia, transparência e suporte especializado.

## ✨ Funcionalidades

### 🔍 **Busca Inteligente**
- Sistema de busca avançado com filtros inteligentes
- Matching inteligente entre imóveis e necessidades
- Integração com múltiplas fontes de dados (OLX, VivaReal, ZAP Imóveis)

### 🏢 **Gestão Completa**
- Plataforma unificada para locadores e locatários
- Gestão de contratos, pagamentos e documentação
- Processos jurídicos simplificados

### 🤝 **Ecossistema de Parcerias**
- **Financiamento:** Parcerias com instituições financeiras
- **Seguros:** Proteção completa para imóveis e negócios
- **Mão de Obra:** Rede de profissionais qualificados
- **Construção:** Serviços completos de construção e reforma
- **Arquitetura:** Projetos especializados em espaços comerciais

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** com Vite
- **Tailwind CSS** para estilização
- **Lucide React** para ícones
- **shadcn/ui** como design system
- **Responsive Design** para todos os dispositivos

### Backend
- **Flask** (Python)
- **SQLAlchemy** para banco de dados
- **CORS** habilitado para integração frontend-backend
- **API RESTful** para busca de imóveis

### Deploy e Infraestrutura
- **Vercel** para frontend
- **GitHub** para versionamento
- **Domínio personalizado** suportado

## 📁 Estrutura do Projeto

```
onion-platform/
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   │   ├── Header.jsx     # Cabeçalho e navegação
│   │   ├── Hero.jsx       # Seção principal
│   │   ├── About.jsx      # Sobre a plataforma
│   │   ├── HowItWorks.jsx # Como funciona
│   │   ├── Products.jsx   # Cesta de produtos
│   │   ├── Plans.jsx      # Planos e preços
│   │   ├── SearchResults.jsx # Resultados de busca
│   │   ├── PropertyDetails.jsx # Detalhes do imóvel
│   │   └── Footer.jsx     # Rodapé
│   ├── App.jsx            # Componente principal
│   └── App.css            # Estilos globais
├── imoveis-api/           # Backend Flask
│   └── src/
│       ├── main.py        # Aplicação principal
│       └── routes/
│           └── imoveis.py # API de busca de imóveis
├── public/                # Arquivos públicos
├── dist/                  # Build de produção
└── package.json           # Dependências do projeto
```

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- Python 3.8+
- npm ou pnpm

### Frontend (React)
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Backend (Flask)
```bash
# Navegar para o diretório da API
cd imoveis-api

# Instalar dependências Python
pip install -r requirements.txt

# Executar servidor Flask
python src/main.py
```

## 🌐 Deploy

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente se necessário
3. Deploy automático a cada push

### Domínio Personalizado
O projeto suporta configuração de domínio personalizado no Vercel:
- Configure DNS para apontar para Vercel
- Adicione domínio nas configurações do projeto
- SSL automático incluído

## 📊 Funcionalidades Implementadas

### ✅ Concluído
- [x] Interface responsiva completa
- [x] Sistema de busca de imóveis
- [x] Integração com APIs externas (OLX, VivaReal, ZAP)
- [x] Modal de detalhes de imóveis
- [x] Navegação fluida entre seções
- [x] Design system consistente
- [x] Backend Flask funcional
- [x] Deploy automatizado

### 🔄 Em Desenvolvimento
- [ ] Sistema de autenticação
- [ ] Dashboard para locadores
- [ ] Gestão de contratos
- [ ] Sistema de pagamentos
- [ ] Chat integrado
- [ ] Notificações push

## 🎨 Design e UX

### Paleta de Cores
- **Primária:** #7C3AED (Roxo ONION)
- **Secundária:** #E0E7FF (Lilás claro)
- **Gradientes:** Tons de roxo e azul
- **Neutros:** Escala de cinzas

### Componentes
- Design minimalista e moderno
- Micro-interações suaves
- Feedback visual consistente
- Acessibilidade (WCAG 2.1)

## 📈 Métricas e Analytics

- **Performance:** Lighthouse Score 90+
- **SEO:** Otimizado para motores de busca
- **Acessibilidade:** WCAG 2.1 AA
- **Responsividade:** 100% mobile-friendly

## 🤝 Contribuição

Este projeto foi desenvolvido por **Hélio Guilherme Dias Silva** como uma solução completa para o mercado de locação comercial.

### Contato
- **Desenvolvedor:** Hélio Guilherme Dias Silva
- **GitHub:** [@Helioguilhermediassilva](https://github.com/Helioguilhermediassilva)

## 📄 Licença

Este projeto é propriedade de Hélio Guilherme Dias Silva. Todos os direitos reservados.

## 🚀 Roadmap

### Versão 2.0
- [ ] Aplicativo mobile (React Native)
- [ ] IA para recomendações personalizadas
- [ ] Marketplace de serviços
- [ ] Integração com CRM
- [ ] Analytics avançados

### Versão 3.0
- [ ] Realidade virtual para tours
- [ ] Blockchain para contratos
- [ ] IoT para gestão de imóveis
- [ ] Expansão internacional

---

**ONION** - Transformando a locação comercial através da tecnologia 🚀

*Desenvolvido com ❤️ por Hélio Guilherme Dias Silva*

