// API endpoint para cadastro de imóveis
export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      const {
        titulo,
        descricao,
        categoria,
        tipo_oferta,
        tipo_imovel,
        area,
        vagas_garagem,
        condominio,
        iptu,
        preco,
        cep,
        endereco_completo,
        detalhes,
        fotos
      } = req.body

      // Validações básicas
      if (!titulo || !descricao || !tipo_imovel || !area || !preco || !cep) {
        return res.status(400).json({
          success: false,
          message: 'Campos obrigatórios não preenchidos'
        })
      }

      // Simular salvamento no banco de dados
      // Em produção, aqui seria feita a inserção no banco real
      const novoImovel = {
        id: Date.now(), // ID único baseado em timestamp
        titulo,
        descricao,
        categoria: categoria || 'comercio_industria',
        tipo_oferta: tipo_oferta || 'aluguel',
        tipo: tipo_imovel,
        area: area + 'm²',
        vagas_garagem: vagas_garagem || '0',
        condominio: condominio || '0',
        iptu: iptu || '0',
        preco: preco.replace(/\D/g, ''), // Remove formatação para salvar apenas números
        localizacao: endereco_completo || `CEP: ${cep}`,
        cep,
        detalhes: detalhes || [],
        fotos: fotos || [],
        data_cadastro: new Date().toISOString(),
        status: 'ativo',
        fonte: 'ONION Platform',
        contato: {
          nome: 'Proprietário', // Em produção, seria obtido do usuário logado
          telefone: '(11) 99999-9999',
          email: 'proprietario@email.com'
        }
      }

      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Retornar sucesso
      res.status(201).json({
        success: true,
        message: 'Imóvel cadastrado com sucesso',
        data: novoImovel
      })

    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  } else if (req.method === 'GET') {
    // Endpoint para listar imóveis cadastrados
    // Em produção, aqui seria feita a consulta no banco real
    
    try {
      // Simular busca no banco
      const imoveis = [
        // Aqui viriam os imóveis do banco de dados
        // Por enquanto, retornamos array vazio pois os imóveis
        // serão adicionados dinamicamente via POST
      ]

      res.status(200).json({
        success: true,
        data: imoveis,
        total: imoveis.length
      })

    } catch (error) {
      console.error('Erro ao buscar imóveis:', error)
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      })
    }
  } else {
    res.status(405).json({
      success: false,
      message: 'Método não permitido'
    })
  }
}

