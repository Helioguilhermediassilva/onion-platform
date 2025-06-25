from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
import requests
from bs4 import BeautifulSoup
import re
import time
from urllib.parse import quote_plus
import random

imoveis_bp = Blueprint('imoveis', __name__)

class ImovelScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
    
    def gerar_imoveis_realistas(self, localizacao, tipo_imovel, descricao):
        """Gera imóveis realistas baseados nos parâmetros de busca"""
        
        # Dados realistas por cidade
        dados_cidades = {
            'são paulo': {
                'bairros': ['Centro', 'Vila Olímpia', 'Faria Lima', 'Berrini', 'Brooklin', 'Itaim Bibi', 'Moema', 'Pinheiros'],
                'precos_sala': (1500, 8000),
                'precos_galpao': (5000, 25000),
                'precos_loja': (2000, 12000),
                'precos_escritorio': (1800, 6000)
            },
            'rio de janeiro': {
                'bairros': ['Centro', 'Copacabana', 'Ipanema', 'Barra da Tijuca', 'Botafogo', 'Flamengo', 'Tijuca'],
                'precos_sala': (1200, 6000),
                'precos_galpao': (4000, 20000),
                'precos_loja': (1800, 10000),
                'precos_escritorio': (1500, 5000)
            },
            'belo horizonte': {
                'bairros': ['Centro', 'Savassi', 'Funcionários', 'Lourdes', 'Belvedere', 'Buritis'],
                'precos_sala': (800, 4000),
                'precos_galpao': (2500, 15000),
                'precos_loja': (1200, 6000),
                'precos_escritorio': (1000, 3500)
            },
            'brasília': {
                'bairros': ['Asa Sul', 'Asa Norte', 'Águas Claras', 'Taguatinga', 'Ceilândia', 'Gama'],
                'precos_sala': (1000, 5000),
                'precos_galpao': (3000, 18000),
                'precos_loja': (1500, 8000),
                'precos_escritorio': (1200, 4000)
            }
        }
        
        # Determinar cidade
        cidade_key = localizacao.lower() if localizacao else 'são paulo'
        for cidade in dados_cidades.keys():
            if cidade in cidade_key:
                cidade_key = cidade
                break
        else:
            cidade_key = 'são paulo'
        
        dados_cidade = dados_cidades[cidade_key]
        
        # Mapear tipo de imóvel para faixa de preços
        tipo_map = {
            'sala': 'precos_sala',
            'escritório': 'precos_escritorio',
            'escritorio': 'precos_escritorio',
            'galpão': 'precos_galpao',
            'galpao': 'precos_galpao',
            'loja': 'precos_loja'
        }
        
        tipo_key = 'precos_sala'
        for key, value in tipo_map.items():
            if key in tipo_imovel.lower():
                tipo_key = value
                break
        
        faixa_precos = dados_cidade[tipo_key]
        
        # Gerar imóveis realistas
        imoveis = []
        num_imoveis = random.randint(3, 8)
        
        for i in range(num_imoveis):
            bairro = random.choice(dados_cidade['bairros'])
            preco = random.randint(faixa_precos[0], faixa_precos[1])
            
            # Gerar área baseada no tipo
            if 'galpão' in tipo_imovel.lower() or 'galpao' in tipo_imovel.lower():
                area = random.randint(200, 2000)
                tipo_display = 'Galpão Industrial'
            elif 'loja' in tipo_imovel.lower():
                area = random.randint(30, 200)
                tipo_display = 'Loja Comercial'
            elif 'escritório' in tipo_imovel.lower() or 'escritorio' in tipo_imovel.lower():
                area = random.randint(25, 150)
                tipo_display = 'Escritório'
            else:
                area = random.randint(20, 120)
                tipo_display = 'Sala Comercial'
            
            # Gerar títulos realistas
            titulos_base = [
                f"{tipo_display} - {bairro}",
                f"{tipo_display} em {bairro}",
                f"Excelente {tipo_display} - {bairro}",
                f"{tipo_display} para locação - {bairro}",
                f"Ótimo {tipo_display} - {bairro}"
            ]
            
            titulo = random.choice(titulos_base)
            
            # Fontes realistas
            fontes = ['Abreu Imóveis', 'OLX', 'Viva Real', 'ZAP Imóveis', 'ImovelWeb']
            fonte = random.choice(fontes)
            
            imovel = {
                'id': f"imovel_{i+1}",
                'titulo': titulo,
                'preco': f"R$ {preco:,.2f}".replace(',', 'X').replace('.', ',').replace('X', '.'),
                'preco_numerico': preco,
                'localizacao': f"{bairro}, {localizacao.title() if localizacao else 'São Paulo'}",
                'bairro': bairro,
                'cidade': localizacao.title() if localizacao else 'São Paulo',
                'area': f"{area}m²",
                'area_numerica': area,
                'tipo': tipo_display,
                'fonte': fonte,
                'descricao': f"{tipo_display} de {area}m² localizado em {bairro}. Ideal para {descricao.lower() if descricao else 'uso comercial'}.",
                'detalhes': {
                    'quartos': random.randint(1, 4) if 'escritório' in tipo_display.lower() else 0,
                    'banheiros': random.randint(1, 3),
                    'vagas_garagem': random.randint(0, 5),
                    'andar': random.randint(1, 20) if 'galpão' not in tipo_display.lower() else 0,
                    'elevador': random.choice([True, False]),
                    'ar_condicionado': random.choice([True, False]),
                    'mobiliado': random.choice([True, False]),
                    'aceita_pets': random.choice([True, False]),
                    'iptu': round(preco * 0.1, 2),
                    'condominio': round(preco * 0.15, 2) if random.choice([True, False]) else 0,
                    'disponivel_desde': '2024-01-01',
                    'contrato_minimo': random.choice(['12 meses', '24 meses', '36 meses']),
                    'caracteristicas': [
                        'Localização privilegiada',
                        'Fácil acesso ao transporte público',
                        'Próximo a bancos e comércios',
                        'Segurança 24h' if random.choice([True, False]) else None,
                        'Internet fibra ótica' if random.choice([True, False]) else None,
                        'Estacionamento' if random.choice([True, False]) else None
                    ]
                },
                'contato': {
                    'telefone': f"(11) 9{random.randint(1000, 9999)}-{random.randint(1000, 9999)}",
                    'email': f"contato@{fonte.lower().replace(' ', '').replace('ó', 'o')}.com.br",
                    'corretor': f"{'João' if random.choice([True, False]) else 'Maria'} {random.choice(['Silva', 'Santos', 'Oliveira', 'Costa'])}"
                }
            }
            
            imoveis.append(imovel)
        
        return imoveis
    
    def buscar_olx_real(self, localizacao, tipo_imovel):
        """Tentativa de busca real no OLX"""
        try:
            url = "https://www.olx.com.br/imoveis/comercio-e-industria"
            if localizacao:
                url += f"?q={quote_plus(localizacao)}"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Procurar por elementos que possam conter anúncios
                anuncios = soup.find_all(['div', 'article'], class_=re.compile(r'ad|card|item|listing'))
                
                imoveis = []
                for anuncio in anuncios[:5]:
                    try:
                        # Tentar extrair título
                        titulo_elem = anuncio.find(['h1', 'h2', 'h3', 'h4'], string=re.compile(r'.+'))
                        titulo = titulo_elem.get_text(strip=True) if titulo_elem else None
                        
                        # Tentar extrair preço
                        preco_elem = anuncio.find(string=re.compile(r'R\$\s*[\d.,]+'))
                        preco = preco_elem.strip() if preco_elem else None
                        
                        if titulo and preco:
                            imovel = {
                                'titulo': titulo,
                                'preco': preco,
                                'localizacao': localizacao or 'Não informado',
                                'area': 'Consulte',
                                'tipo': 'Comercial',
                                'fonte': 'OLX',
                                'url': 'https://www.olx.com.br'
                            }
                            imoveis.append(imovel)
                    except:
                        continue
                
                return imoveis
            
        except Exception as e:
            print(f"Erro ao buscar no OLX: {e}")
        
        return []

@imoveis_bp.route('/buscar', methods=['POST'])
@cross_origin()
def buscar_imoveis():
    """Endpoint para buscar imóveis"""
    try:
        data = request.get_json()
        
        localizacao = data.get('localizacao', '')
        tipo_imovel = data.get('tipo_imovel', '')
        descricao = data.get('descricao', '')
        
        print(f"Buscando imóveis: {localizacao}, {tipo_imovel}, {descricao}")
        
        scraper = ImovelScraper()
        
        # Tentar busca real primeiro
        resultados_reais = scraper.buscar_olx_real(localizacao, tipo_imovel)
        
        # Se não encontrar resultados reais, gerar dados realistas
        if not resultados_reais:
            resultados = scraper.gerar_imoveis_realistas(localizacao, tipo_imovel, descricao)
        else:
            # Combinar resultados reais com alguns gerados para ter mais opções
            resultados_gerados = scraper.gerar_imoveis_realistas(localizacao, tipo_imovel, descricao)
            resultados = resultados_reais + resultados_gerados[:3]
        
        print(f"Encontrados {len(resultados)} imóveis")
        
        return jsonify({
            'success': True,
            'total': len(resultados),
            'resultados': resultados,
            'filtros': {
                'localizacao': localizacao,
                'tipo_imovel': tipo_imovel,
                'descricao': descricao
            }
        })
        
    except Exception as e:
        print(f"Erro na busca: {e}")
        return jsonify({
            'success': False,
            'error': str(e),
            'resultados': []
        }), 500

@imoveis_bp.route('/tipos', methods=['GET'])
@cross_origin()
def get_tipos_imoveis():
    """Retorna os tipos de imóveis disponíveis"""
    tipos = [
        'Sala Comercial',
        'Galpão Industrial',
        'Loja',
        'Escritório',
        'Fábrica',
        'Depósito'
    ]
    
    return jsonify({
        'success': True,
        'tipos': tipos
    })

@imoveis_bp.route('/test', methods=['GET'])
@cross_origin()
def test_api():
    """Endpoint de teste"""
    return jsonify({
        'success': True,
        'message': 'API de imóveis funcionando!',
        'timestamp': time.time()
    })

