declare global {
	export namespace PedidoAmostra {
		export interface Pedido {
			pedido: string;
			quantidadeTotal: number;
			quantidadeEntrega: number;
			quantidadeEntregaAceitavel: number;
			tipoCompra: string;
			statusAprovacao: string;
			dataEmissao: string;
			desconto: number;
			encargo: number;
			valorIPI: number;
			valorOriginal: number;
			valorEntrega: number;
			statusCompra: string;
			produtos: Produto[];
			detalheFornecedor: DetalheFornecedor[];
			detalheFilialCobranca: DetalheFilialCobranca[];
			detalheFilialEntrega: DetalheFilialCobranca[];
		}

		export interface DetalheFilialCobranca {
			filialNome: string;
			cgc_Cpf: string;
			clifor: string;
			area_M2: number;
			cobertura_Loja: boolean;
			ctrlEstoqueMaterial: boolean;
			ctrlEstoqueProduto: boolean;
			ctrlLojaVarejo: boolean;
			ctrlProducaoMaterial: boolean;
			ctrlProducaoProduto: boolean;
			ctrlVendaMaterial: boolean;
			ctrlVendaProduto: boolean;
			dataAbertura: string;
			dataConsolidacao: string;
			dataFechamento: string;
			dataInicioExclusaoIcmsPisCofins: string;
			dataParaTransferencia: string;
			empresa: number;
			estoqueCtrlPeca: boolean;
			estoqueCtrlPecaUnica: boolean;
			excluiIcmsPisCofins: boolean;
			exportaPgtosFranquia: number;
			fatorCustoLoja: number;
			fatorF: boolean;
			fatorFilialEspelho: number;
			fatorP: boolean;
			fatorQ: boolean;
			fatorS: boolean;
			fatorW: boolean;
			fechaCmAjusteInflacao: boolean;
			fechaCustoMedio: boolean;
			filialPropria: boolean;
			idProcesso: number;
			indicaArmazem: boolean;
			indicaBeneficiador: boolean;
			indicaCfopSomenteRevenda: boolean;
			indicaCprb: boolean;
			indicaEcfSerie: boolean;
			indicaFranquia: boolean;
			indicaSegundaQualidade: boolean;
			lxTipoApuracao: number;
			matriz: string;
			naoGeraEntradaLojaAuto: number;
			permiteEstNegativo: boolean;
			regiao: string;
			regimeTributacao: number;
			somenteArmazem: boolean;
			tempoAtendimento: number;
		}

		export interface DetalheFornecedor {
			beneficiador: string;
			centro_custo: string;
			cgc_cpf: string;
			clifor: string;
			cod_fornecedor: string;
			condicao_pgto: string;
			ctb_conta_contabil: string;
			data_para_transferencia: string;
			desconto_vencimento: number;
			dias_desconto_vencimento: number;
			fornece_mat_consumo: boolean;
			fornece_materiais: boolean;
			fornece_outros: boolean;
			fornece_prod_acab: boolean;
			fornecedor: string;
			inativo: boolean;
			indica_cqfor: boolean;
			indica_markdown: boolean;
			indica_transportadora: boolean;
			licenciado: number;
			licenciado_royalties: number;
			licendiado_royalties: number;
			lx_metodo_pagamento: number;
			matriz_fornecedor: string;
			subtipo_fornecedor: string;
			tipo: string;
			valor_minimo_pedido: number;
		}

		export interface Produto {
			quantidadeOriginal: number;
			quantidadeCancelada: number;
			quantidadeEntregue: number;
			quantidadeEntregar: number;
			custo: number;
			valorOriginal: number;
			valorEntregue: number;
			valorEntregar: number;
			descontoItem: number;
			ipi: number;
			produto: string;
			detalhesProduto: DetalhesProduto[];
			compraProdutoPacks: CompraProdutoPack[];
		}

		export interface CompraProdutoPack {
			codFilial: number;
			grade: string;
			quantidadeAlocada: number;
			quantidadePedida: number;
			quantidades: Quantidade[];
		}

		export interface Quantidade {
			grade: string;
			descricao: string;
			quantidade: number;
		}

		export interface DetalhesProduto {
			produto: string;
			classif_fiscal: string;
			desc_produto: string;
			cod_produto_solucao: number;
			colecao: string;
			data_cadastramento: string;
			data_para_transferencia: string;
			desc_produto_segmento: string;
			desc_rede_lojas: string;
			fabricante: string;
			griffe: string;
			grupo_produto: string;
			inativo: boolean;
			indicador_cfop: number;
			linha: string;
			nomenclatura: string;
			rede_lojas: string;
			subgrupo_produto: string;
			tipo_produto: string;
			codigo_grupo: string;
			codigo_subgrupo: string;
			drop_de_tamanhos: number;
			estrutura_mercadologica2: string;
			fator_p: number;
			tt_desc_prog: string;
			vmi: string;
			grade: string;
			cores: Core[];
			atributos: Atributo[];
			barras: Barra[];
			tamanhos: Tamanho[];
		}

		export interface Tamanho {
			valor: string;
			tamanho: string;
		}

		export interface Barra {
			codigo_barra: string;
			cor_produto: string;
			tamanho: number;
			grade: string;
			codigo_barra_padrao: boolean;
		}

		export interface Atributo {
			atributo: string;
			valor: string;
		}

		export interface Core {
			cor_produto: string;
			desc_cor_produto: string;
		}
	}
}

export {};
