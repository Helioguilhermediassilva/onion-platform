import React from 'react'
import { Button } from '@/components/ui/button'
import { 
  X, 
  MapPin, 
  Home, 
  Car, 
  Bath, 
  Bed,
  Building,
  Check,
  Phone,
  Mail,
  User,
  Calendar,
  DollarSign,
  Ruler,
  Shield,
  Wifi,
  Wind,
  PawPrint
} from 'lucide-react'

const PropertyDetails = ({ property, onClose }) => {
  if (!property) return null

  const formatPrice = (price) => {
    return typeof price === 'string' ? price : `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
  }

  const formatCharacteristics = (characteristics) => {
    return characteristics.filter(char => char !== null && char !== undefined)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.titulo}</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{property.localizacao}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">{property.fonte}</span>
              <span>{property.tipo}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Price and Basic Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <div className="bg-primary/5 rounded-lg p-6 mb-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {formatPrice(property.preco)}
                  <span className="text-lg font-normal text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600">{property.descricao}</p>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Ruler className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.area}</div>
                    <div className="text-sm text-gray-600">Área</div>
                  </div>
                </div>
                
                {property.detalhes?.quartos > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Bed className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">{property.detalhes.quartos}</div>
                      <div className="text-sm text-gray-600">Quartos</div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.detalhes?.banheiros || 1}</div>
                    <div className="text-sm text-gray-600">Banheiros</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">{property.detalhes?.vagas_garagem || 0}</div>
                    <div className="text-sm text-gray-600">Vagas</div>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              {property.detalhes && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Detalhes do Imóvel</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {property.detalhes.andar > 0 && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Andar: {property.detalhes.andar}º</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Contrato mínimo: {property.detalhes.contrato_minimo}</span>
                    </div>
                    
                    {property.detalhes.elevador && (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Elevador</span>
                      </div>
                    )}
                    
                    {property.detalhes.ar_condicionado && (
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Ar condicionado</span>
                      </div>
                    )}
                    
                    {property.detalhes.mobiliado && (
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">Mobiliado</span>
                      </div>
                    )}
                    
                    {property.detalhes.aceita_pets && (
                      <div className="flex items-center gap-2">
                        <PawPrint className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Aceita pets</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Characteristics */}
              {property.detalhes?.caracteristicas && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Características</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {formatCharacteristics(property.detalhes.caracteristicas).map((char, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Costs */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Custos Mensais</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Aluguel</span>
                    <span className="font-semibold">{formatPrice(property.preco)}</span>
                  </div>
                  {property.detalhes?.condominio > 0 && (
                    <div className="flex justify-between">
                      <span>Condomínio</span>
                      <span>R$ {property.detalhes.condominio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  {property.detalhes?.iptu && (
                    <div className="flex justify-between">
                      <span>IPTU</span>
                      <span>R$ {property.detalhes.iptu.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      R$ {(
                        (property.preco_numerico || 0) + 
                        (property.detalhes?.condominio || 0) + 
                        (property.detalhes?.iptu || 0)
                      ).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              {property.contato && (
                <div className="bg-primary/5 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Informações de Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="text-sm">{property.contato.corretor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm">{property.contato.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="text-sm">{property.contato.email}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Phone className="h-4 w-4 mr-2" />
                      Ligar Agora
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Enviar E-mail
                    </Button>
                  </div>
                </div>
              )}

              {/* ONION Services */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Serviços ONION</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Verificação de documentos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span>Assessoria financeira</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Suporte jurídico</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3" size="sm">
                  Saiba Mais
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails

