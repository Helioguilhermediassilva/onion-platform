import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Upload, X, MapPin, Building, DollarSign, Camera, Check } from 'lucide-react'

const PropertyRegistration = ({ onClose, onPropertyAdded }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'comercio_industria',
    tipo_oferta: 'aluguel',
    tipo_imovel: '',
    area: '',
    vagas_garagem: '',
    condominio: '',
    iptu: '',
    preco: '',
    cep: '',
    endereco_completo: '',
    detalhes: [],
    fotos: []
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const steps = [
    { id: 1, title: 'Informações Básicas', icon: Building },
    { id: 2, title: 'Detalhes e Características', icon: MapPin },
    { id: 3, title: 'Preços e Valores', icon: DollarSign },
    { id: 4, title: 'Fotos e Localização', icon: Camera }
  ]

  const tiposImovel = [
    { value: 'sala_comercial', label: 'Sala Comercial' },
    { value: 'galpao_industrial', label: 'Galpão Industrial' },
    { value: 'loja', label: 'Loja' },
    { value: 'escritorio', label: 'Escritório' },
    { value: 'deposito', label: 'Depósito' },
    { value: 'terreno_comercial', label: 'Terreno Comercial' }
  ]

  const detalhesDisponiveis = [
    { id: 'garagem', label: 'Garagem' },
    { id: 'seguranca_24h', label: 'Segurança 24h' },
    { id: 'cameras_seguranca', label: 'Câmeras de segurança' },
    { id: 'elevador', label: 'Elevador' },
    { id: 'portaria', label: 'Portaria' },
    { id: 'acesso_deficientes', label: 'Acesso para deficientes' },
    { id: 'ar_condicionado', label: 'Ar condicionado' },
    { id: 'internet', label: 'Internet' },
    { id: 'estacionamento_visitantes', label: 'Estacionamento para visitantes' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleDetailToggle = (detailId) => {
    setFormData(prev => ({
      ...prev,
      detalhes: prev.detalhes.includes(detailId)
        ? prev.detalhes.filter(id => id !== detailId)
        : [...prev.detalhes, detailId]
    }))
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    const maxFiles = 20
    const maxSize = 5 * 1024 * 1024 // 5MB por arquivo

    if (formData.fotos.length + files.length > maxFiles) {
      setErrors(prev => ({
        ...prev,
        fotos: `Máximo de ${maxFiles} fotos permitidas`
      }))
      return
    }

    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          fotos: 'Cada foto deve ter no máximo 5MB'
        }))
        return false
      }
      return true
    })

    // Simular upload com progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setFormData(prev => ({
            ...prev,
            fotos: [...prev.fotos, ...validFiles.map(file => ({
              file,
              url: URL.createObjectURL(file),
              name: file.name
            }))]
          }))
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.titulo.trim()) newErrors.titulo = 'Título é obrigatório'
        if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória'
        if (!formData.tipo_imovel) newErrors.tipo_imovel = 'Tipo de imóvel é obrigatório'
        break
      case 2:
        if (!formData.area.trim()) newErrors.area = 'Área é obrigatória'
        break
      case 3:
        if (!formData.preco.trim()) newErrors.preco = 'Preço é obrigatório'
        break
      case 4:
        if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório'
        if (formData.fotos.length === 0) newErrors.fotos = 'Pelo menos uma foto é obrigatória'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    
    try {
      // Simular envio para API
      const propertyData = {
        ...formData,
        id: Date.now(), // ID temporário
        data_cadastro: new Date().toISOString(),
        status: 'ativo',
        fonte: 'ONION Platform',
        contato: {
          nome: 'Proprietário', // Seria obtido do usuário logado
          telefone: '(11) 99999-9999',
          email: 'proprietario@email.com'
        }
      }

      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Chamar callback para adicionar à lista de imóveis
      if (onPropertyAdded) {
        onPropertyAdded(propertyData)
      }

      // Mostrar sucesso e fechar modal
      alert('Imóvel cadastrado com sucesso! Já está disponível para busca.')
      onClose()

    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error)
      alert('Erro ao cadastrar imóvel. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '')
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numericValue / 100)
  }

  const formatCEP = (value) => {
    const numericValue = value.replace(/\D/g, '')
    return numericValue.replace(/(\d{5})(\d{3})/, '$1-$2')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Anúncio *
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                placeholder="Ex: Sala comercial moderna no centro"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.titulo ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={100}
              />
              {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
              <p className="text-gray-500 text-sm mt-1">{formData.titulo.length}/100 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição *
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva as características e diferenciais do imóvel..."
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.descricao ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={500}
              />
              {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
              <p className="text-gray-500 text-sm mt-1">{formData.descricao.length}/500 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Oferta
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="aluguel"
                    checked={formData.tipo_oferta === 'aluguel'}
                    onChange={(e) => handleInputChange('tipo_oferta', e.target.value)}
                    className="mr-2"
                  />
                  Aluguel
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="venda"
                    checked={formData.tipo_oferta === 'venda'}
                    onChange={(e) => handleInputChange('tipo_oferta', e.target.value)}
                    className="mr-2"
                  />
                  Venda
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Imóvel *
              </label>
              <select
                value={formData.tipo_imovel}
                onChange={(e) => handleInputChange('tipo_imovel', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.tipo_imovel ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Selecione o tipo</option>
                {tiposImovel.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
              {errors.tipo_imovel && <p className="text-red-500 text-sm mt-1">{errors.tipo_imovel}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área (m²) *
                </label>
                <input
                  type="number"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  placeholder="Ex: 150"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    errors.area ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vagas na Garagem
                </label>
                <select
                  value={formData.vagas_garagem}
                  onChange={(e) => handleInputChange('vagas_garagem', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="0">Nenhuma</option>
                  <option value="1">1 vaga</option>
                  <option value="2">2 vagas</option>
                  <option value="3">3 vagas</option>
                  <option value="4">4 vagas</option>
                  <option value="5+">5 ou mais vagas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Detalhes do Imóvel
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {detalhesDisponiveis.map(detalhe => (
                  <label key={detalhe.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.detalhes.includes(detalhe.id)}
                      onChange={() => handleDetailToggle(detalhe.id)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{detalhe.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço {formData.tipo_oferta === 'aluguel' ? 'Mensal' : 'de Venda'} *
              </label>
              <input
                type="text"
                value={formData.preco}
                onChange={(e) => handleInputChange('preco', e.target.value)}
                placeholder="R$ 0,00"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.preco ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
            </div>

            {formData.tipo_oferta === 'aluguel' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condomínio (R$)
                  </label>
                  <input
                    type="text"
                    value={formData.condominio}
                    onChange={(e) => handleInputChange('condominio', e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IPTU (R$)
                  </label>
                  <input
                    type="text"
                    value={formData.iptu}
                    onChange={(e) => handleInputChange('iptu', e.target.value)}
                    placeholder="R$ 0,00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Resumo de Valores</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Preço {formData.tipo_oferta === 'aluguel' ? 'mensal' : 'de venda'}:</span>
                  <span className="font-medium">R$ {formData.preco || '0,00'}</span>
                </div>
                {formData.tipo_oferta === 'aluguel' && (
                  <>
                    <div className="flex justify-between">
                      <span>Condomínio:</span>
                      <span>R$ {formData.condominio || '0,00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IPTU:</span>
                      <span>R$ {formData.iptu || '0,00'}</span>
                    </div>
                    <div className="border-t pt-1 flex justify-between font-medium">
                      <span>Total mensal:</span>
                      <span>R$ {(
                        parseFloat(formData.preco || 0) + 
                        parseFloat(formData.condominio || 0) + 
                        parseFloat(formData.iptu || 0)
                      ).toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP *
              </label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleInputChange('cep', formatCEP(e.target.value))}
                placeholder="00000-000"
                maxLength={9}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.cep ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço Completo
              </label>
              <input
                type="text"
                value={formData.endereco_completo}
                onChange={(e) => handleInputChange('endereco_completo', e.target.value)}
                placeholder="Rua, número, bairro, cidade"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotos do Imóvel * (máximo 20 fotos)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Clique para selecionar fotos</p>
                  <p className="text-sm text-gray-500">JPG, PNG ou WebP até 5MB cada</p>
                </label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Enviando fotos... {uploadProgress}%</p>
                </div>
              )}

              {errors.fotos && <p className="text-red-500 text-sm mt-2">{errors.fotos}</p>}

              {formData.fotos.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-3">{formData.fotos.length} foto(s) selecionada(s)</p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.fotos.map((foto, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={foto.url}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600/20 via-purple-500/15 to-purple-700/20 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Cadastrar Imóvel</h2>
              <p className="text-purple-100">Preencha as informações do seu imóvel</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 text-2xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-white text-purple-600 border-white' 
                        : isActive 
                          ? 'bg-purple-500 text-white border-white' 
                          : 'bg-transparent text-purple-200 border-purple-300'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <StepIcon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden md:block">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-white' : 'text-purple-200'
                      }`}>
                        Etapa {step.id}
                      </p>
                      <p className={`text-xs ${
                        isActive ? 'text-purple-100' : 'text-purple-300'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`hidden md:block w-16 h-0.5 ml-4 ${
                        isCompleted ? 'bg-white' : 'bg-purple-400'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Anterior
          </button>

          <div className="text-sm text-gray-500">
            Etapa {currentStep} de {steps.length}
          </div>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Próximo
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyRegistration

