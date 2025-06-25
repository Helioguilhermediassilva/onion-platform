// Vercel Function para busca de imóveis
// Substitui a API Flask original

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { localizacao, tipo_imovel, descricao } = req.body;

    // Simular dados de imóveis (baseado na API original)
    const imoveisSimulados = [
      {
        id: 1,
        titulo: "Sala Comercial para locação - Berrini",
        preco: 2073.00,
        localizacao: "Berrini, São Paulo",
        area: "36m²",
        tipo: "Sala Comercial",
        fonte: "OLX",
        descricao: "Sala comercial em excelente localização no Berrini",
        detalhes: {
          quartos: 0,
          banheiros: 1,
          vagas: 1,
          andar: "12º andar",
          tipo_contrato: "Contrato 12 meses",
          caracteristicas: ["Ar condicionado", "Aceita pets"],
          custos_adicionais: {
            condominio: 350.00,
            iptu: 168.25
          },
          total_mensal: 2591.25,
          observacoes: "Localização privilegiada, segurança 24h, internet fibra ótica"
        },
        contato: {
          nome: "João Silva",
          telefone: "(11) 99999-9999",
          email: "joao@email.com"
        }
      },
      {
        id: 2,
        titulo: "Galpão Industrial - Zona Leste",
        preco: 8500.00,
        localizacao: "Zona Leste, São Paulo",
        area: "500m²",
        tipo: "Galpão Industrial",
        fonte: "VivaReal",
        descricao: "Galpão industrial com excelente acesso logístico",
        detalhes: {
          quartos: 0,
          banheiros: 2,
          vagas: 5,
          andar: "Térreo",
          tipo_contrato: "Contrato 24 meses",
          caracteristicas: ["Pé direito alto", "Portão para caminhão", "Energia trifásica"],
          custos_adicionais: {
            condominio: 0,
            iptu: 450.00
          },
          total_mensal: 8950.00,
          observacoes: "Ideal para logística e distribuição"
        },
        contato: {
          nome: "Maria Santos",
          telefone: "(11) 88888-8888",
          email: "maria@email.com"
        }
      },
      {
        id: 3,
        titulo: "Loja Comercial - Centro",
        preco: 3200.00,
        localizacao: "Centro, São Paulo",
        area: "80m²",
        tipo: "Loja",
        fonte: "ZAP Imóveis",
        descricao: "Loja comercial em rua de grande movimento",
        detalhes: {
          quartos: 0,
          banheiros: 1,
          vagas: 0,
          andar: "Térreo",
          tipo_contrato: "Contrato 12 meses",
          caracteristicas: ["Vitrine ampla", "Ar condicionado", "Piso em porcelanato"],
          custos_adicionais: {
            condominio: 200.00,
            iptu: 180.00
          },
          total_mensal: 3580.00,
          observacoes: "Excelente para comércio varejista"
        },
        contato: {
          nome: "Carlos Oliveira",
          telefone: "(11) 77777-7777",
          email: "carlos@email.com"
        }
      },
      {
        id: 4,
        titulo: "Escritório Corporativo - Faria Lima",
        preco: 12000.00,
        localizacao: "Faria Lima, São Paulo",
        area: "200m²",
        tipo: "Escritório",
        fonte: "OLX",
        descricao: "Escritório corporativo em edifício comercial de alto padrão",
        detalhes: {
          quartos: 0,
          banheiros: 2,
          vagas: 3,
          andar: "15º andar",
          tipo_contrato: "Contrato 36 meses",
          caracteristicas: ["Vista panorâmica", "Ar condicionado central", "Mobiliado"],
          custos_adicionais: {
            condominio: 800.00,
            iptu: 400.00
          },
          total_mensal: 13200.00,
          observacoes: "Edifício com infraestrutura completa"
        },
        contato: {
          nome: "Ana Costa",
          telefone: "(11) 66666-6666",
          email: "ana@email.com"
        }
      },
      {
        id: 5,
        titulo: "Sala Comercial - Vila Olímpia",
        preco: 4500.00,
        localizacao: "Vila Olímpia, São Paulo",
        area: "90m²",
        tipo: "Sala Comercial",
        fonte: "VivaReal",
        descricao: "Sala comercial moderna em região nobre",
        detalhes: {
          quartos: 0,
          banheiros: 1,
          vagas: 2,
          andar: "8º andar",
          tipo_contrato: "Contrato 18 meses",
          caracteristicas: ["Recepção", "Copa", "Internet fibra"],
          custos_adicionais: {
            condominio: 450.00,
            iptu: 220.00
          },
          total_mensal: 5170.00,
          observacoes: "Próximo ao metrô e shopping"
        },
        contato: {
          nome: "Pedro Lima",
          telefone: "(11) 55555-5555",
          email: "pedro@email.com"
        }
      },
      {
        id: 6,
        titulo: "Galpão Logístico - Guarulhos",
        preco: 15000.00,
        localizacao: "Guarulhos, São Paulo",
        area: "1200m²",
        tipo: "Galpão Industrial",
        fonte: "ZAP Imóveis",
        descricao: "Galpão logístico próximo ao aeroporto",
        detalhes: {
          quartos: 0,
          banheiros: 4,
          vagas: 10,
          andar: "Térreo",
          tipo_contrato: "Contrato 60 meses",
          caracteristicas: ["Doca para carretas", "Sistema de segurança", "Escritório administrativo"],
          custos_adicionais: {
            condominio: 0,
            iptu: 800.00
          },
          total_mensal: 15800.00,
          observacoes: "Ideal para operações logísticas"
        },
        contato: {
          nome: "Roberto Silva",
          telefone: "(11) 44444-4444",
          email: "roberto@email.com"
        }
      },
      {
        id: 7,
        titulo: "Loja de Esquina - Moema",
        preco: 6800.00,
        localizacao: "Moema, São Paulo",
        area: "120m²",
        tipo: "Loja",
        fonte: "OLX",
        descricao: "Loja de esquina com excelente visibilidade",
        detalhes: {
          quartos: 0,
          banheiros: 2,
          vagas: 1,
          andar: "Térreo",
          tipo_contrato: "Contrato 24 meses",
          caracteristicas: ["Duas frentes", "Estacionamento próprio", "Depósito"],
          custos_adicionais: {
            condominio: 0,
            iptu: 320.00
          },
          total_mensal: 7120.00,
          observacoes: "Ótima localização comercial"
        },
        contato: {
          nome: "Lucia Ferreira",
          telefone: "(11) 33333-3333",
          email: "lucia@email.com"
        }
      }
    ];

    // Filtrar imóveis baseado nos critérios de busca
    let resultados = imoveisSimulados;

    if (localizacao) {
      resultados = resultados.filter(imovel => 
        imovel.localizacao.toLowerCase().includes(localizacao.toLowerCase())
      );
    }

    if (tipo_imovel) {
      resultados = resultados.filter(imovel => 
        imovel.tipo.toLowerCase().includes(tipo_imovel.toLowerCase())
      );
    }

    if (descricao) {
      resultados = resultados.filter(imovel => 
        imovel.descricao.toLowerCase().includes(descricao.toLowerCase()) ||
        imovel.titulo.toLowerCase().includes(descricao.toLowerCase())
      );
    }

    // Simular delay de API real
    await new Promise(resolve => setTimeout(resolve, 1000));

    return res.status(200).json({
      success: true,
      resultados: resultados,
      total: resultados.length,
      criterios_busca: {
        localizacao,
        tipo_imovel,
        descricao
      }
    });

  } catch (error) {
    console.error('Erro na API de busca:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      resultados: [],
      total: 0
    });
  }
}

