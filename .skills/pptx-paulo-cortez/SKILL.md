---
name: pptx-paulo-cortez
description: Cria apresentações PowerPoint (.pptx) no padrão visual do Paulo Cortez / ProCrescer Academy. Use sempre que Paulo pedir um deck, apresentação, proposta em slides ou qualquer .pptx — aplica automaticamente as cores, fontes, layouts e identidade visual do site paulocortez.com.br sem precisar que ele descreva o estilo.
---

# SKILL: PPT Padrão Paulo Cortez

Esta skill produz arquivos .pptx com a identidade visual exata da marca Paulo Cortez / ProCrescer Academy. Leia e siga tudo aqui antes de escrever qualquer código. Siga também tudo em /mnt/skills/public/pptx/SKILL.md (especialmente os gotchas do pptxgenjs e o QA obrigatório).

---

## 1. IDENTIDADE VISUAL

### Paleta de cores (usar sempre estes valores, nunca inventar outros)

| Token | Hex | Uso |
|-------|-----|-----|
| `TEAL` | `0099B0` | Acento principal, ícones, destaques, eyebrows |
| `TEAL_DEEP` | `006478` | Títulos de seção, texto de ênfase, fundos de header |
| `TEAL_DARK` | `013D49` | Fundos escuros, slides de capa e divisor |
| `INK` | `0F2A33` | Texto principal, fundos muito escuros |
| `GOLD` | `946818` | CTA exclusivo, badges, tags importantes |
| `PAPER` | `FFFFFF` | Fundo padrão de slides de conteúdo |
| `PAPER_WARM` | `F6F9FA` | Fundo alternativo suave |
| `PAPER_EDGE` | `E4EDF0` | Bordas, linhas divisórias, separadores |
| `INK_SOFT` | `3D5860` | Texto secundário, subtítulos, corpo |
| `INK_LIGHT` | `59717B` | Legendas, rodapés, notas, texto terciário |

**Regra de contraste:** texto branco só sobre TEAL_DEEP, TEAL_DARK ou INK. Texto INK sobre PAPER ou PAPER_WARM. Nunca texto claro sobre fundo claro, nunca texto escuro sobre fundo escuro.

### Tipografia

| Papel | Fonte | Peso | Uso |
|-------|-------|------|-----|
| Títulos e headings | `Space Grotesk` | Bold (700) | Títulos de slide, títulos de seção |
| Corpo e listas | `Inter` | Regular (400) / SemiBold (600) | Corpo de texto, bullets, legendas |

**Fallback seguro:** se Space Grotesk não estiver disponível no ambiente, usar `Calibri` para títulos e `Calibri Light` para corpo.

### Tamanhos de fonte (canvas 16:9, 10" × 5.625")

| Elemento | Tamanho |
|----------|---------|
| Título principal (capa) | 36–42pt |
| Título de slide de conteúdo | 24–28pt |
| Eyebrow / label acima do título | 11pt, uppercase, letter-spacing |
| Corpo / bullets | 16–18pt |
| Legenda / rodapé | 11–12pt |
| Número de slide | 10pt |

---

## 2. LAYOUTS PADRÃO

### Slide 1 — CAPA

```
Fundo: gradiente simulado com retângulo TEAL_DARK cobrindo 100% do slide
Retângulo overlay TEAL_DEEP: x=0, y=0, w=10, h=5.625 (fundo base)
Retângulo accent: x=0, y=4.8, w=10, h=0.825 (faixa inferior TEAL)

Elementos:
- Logo ProCrescer (assets/logo.webp ou logo.png): canto sup. esquerdo, x=0.4, y=0.3, h=0.55
- Eyebrow texto branco: x=0.4, y=1.4, fonte 11pt uppercase, cor TEAL (tom claro sobre escuro)
- Título principal: x=0.4, y=1.8, w=7, Space Grotesk Bold 38pt, branco
- Subtítulo (opcional): x=0.4, y=3.2, w=6.5, Inter 18pt, cor E0EDEF (branco suave)
- Linha separadora horizontal: x=0.4, y=3.0, w=2.5, h=0.02, cor GOLD (946818)
- Nome Paulo Cortez: x=0.4, y=4.95, Inter SemiBold 11pt, branco
- Credencial: x=0.4, y=5.2, Inter 10pt, cor 7FA8B2
- Data / versão (se houver): canto dir. inf. x=8.5, y=5.3, 10pt, cor 7FA8B2
```

### Slide 2 — DIVISOR DE SEÇÃO

```
Fundo: TEAL_DARK
Número da seção (opcional): x=0.4, y=0.6, Space Grotesk Bold 72pt, cor TEAL (0099B0), opacity 40%
Título da seção: x=0.4, y=1.8, w=8, Space Grotesk Bold 36pt, branco
Descrição (opcional): x=0.4, y=3.0, w=7, Inter 18pt, cor D0E8EC
```

### Slide 3 — CONTEÚDO PADRÃO (título + bullets)

```
Fundo: PAPER (FFFFFF)
Faixa de título: retângulo x=0, y=0, w=10, h=1.3, cor PAPER_WARM (F6F9FA)
Linha inferior da faixa: x=0, y=1.28, w=10, h=0.02, cor PAPER_EDGE (E4EDF0)
Eyebrow: x=0.5, y=0.22, 11pt uppercase, cor TEAL_DEEP (006478)
Título: x=0.5, y=0.52, w=8.5, Space Grotesk Bold 26pt, cor INK (0F2A33)
Corpo: x=0.5, y=1.5, w=8.8, h=3.8, Inter 17pt, cor INK_SOFT (3D5860)
Número do slide: x=9.5, y=5.3, 10pt, cor INK_LIGHT (59717B)
```

### Slide 4 — DOIS PAINÉIS (comparação, antes/depois, duas colunas)

```
Fundo: PAPER_WARM
Faixa de título: mesma do slide de conteúdo
Painel esquerdo: x=0.4, y=1.5, w=4.4, h=3.5, fundo FFFFFF, borda PAPER_EDGE 1pt
Painel direito: x=5.2, y=1.5, w=4.4, h=3.5, fundo FFFFFF, borda TEAL 1pt
Título painel: Space Grotesk SemiBold 15pt, cor TEAL_DEEP
Corpo painel: Inter 14pt, cor INK_SOFT
```

### Slide 5 — DESTAQUE / CITAÇÃO / DADO IMPACTANTE

```
Fundo: PAPER
Retângulo accent esquerdo: x=0.4, y=1.2, w=0.06, h=3.2, cor TEAL (0099B0)
Texto citação: x=0.7, y=1.3, w=8.5, Space Grotesk Bold 28pt, cor INK, itálico
Atribuição: x=0.7, y=3.8, Inter 14pt, cor INK_LIGHT
OU: número grande central (dado), Space Grotesk Bold 72pt, cor TEAL_DEEP, centralizado
```

### Slide 6 — CARDS (3 ou 4 itens lado a lado)

```
Fundo: PAPER_WARM
Para 3 cards: w=2.8 cada, gap=0.2, início x=0.4
Para 4 cards: w=2.1 cada, gap=0.15, início x=0.35
Cada card: fundo FFFFFF, borda PAPER_EDGE 1pt, padding interno 0.2
  - Ícone/número topo: Space Grotesk Bold 28pt, cor TEAL_DEEP
  - Título card: Space Grotesk SemiBold 14pt, cor INK
  - Corpo: Inter 13pt, cor INK_SOFT
```

### Slide 7 — CTA FINAL / ENCERRAMENTO

```
Fundo: TEAL_DARK
Título: Space Grotesk Bold 34pt, branco, centralizado
Subtítulo/chamada: Inter 18pt, cor D0E8EC, centralizado
Contatos (linha):
  - WhatsApp: (11) 92018-2998
  - E-mail: opaulocortez@outlook.com
  - Site: paulocortez.com.br
  Formato: Inter SemiBold 13pt, branco
Botão visual (retângulo): cor GOLD (946818), texto branco "Solicitar Proposta"
```

---

## 3. REGRAS INVIOLÁVEIS

1. **Nunca usar barras decorativas verticais nem horizontais** que sirvam apenas de ornamento — proibido por /mnt/skills/public/pptx/SKILL.md.
2. **Nunca usar sublinhado em títulos** como elemento de design.
3. **Nunca usar fundo creme, bege ou warmwhite** — só PAPER (FFFFFF) ou PAPER_WARM (F6F9FA).
4. **GOLD (946818) é exclusivo para CTA e badges de destaque máximo** — não usar em subtítulos nem rodapés.
5. **Hex colors sem # e sem canal alpha** — obrigatório no pptxgenjs.
6. **Não reutilizar objetos de opção entre chamadas addText/addShape** — criar um novo objeto a cada chamada.
7. **Nunca texto que ultrapasse a borda do slide** — reduzir fonte ou dividir em dois slides.
8. **Imagens com fetchpriority apenas no hero** — em slides, todas as imagens com `sizing: { type: "contain" }`.

---

## 4. FLUXO DE EXECUÇÃO

```
1. Ler o pedido de Paulo e identificar: tipo de deck, assunto, slides necessários, dados a incluir
2. Planejar a estrutura: capa + divisores + conteúdo + encerramento (mínimo 6 slides)
3. Escrever o script pptxgenjs em /home/claude/deck/gera.js
4. Executar: node /home/claude/deck/gera.js
5. Validar: python /mnt/skills/public/pptx/scripts/office/validate.py /home/claude/deck/output.pptx
6. Converter para PDF e imagens:
   python /mnt/skills/public/pptx/scripts/office/soffice.py --headless --convert-to pdf /home/claude/deck/output.pptx
   rm -f /home/claude/deck/slide-*.jpg
   pdftoppm -jpeg -r 150 /home/claude/deck/output.pdf /home/claude/deck/slide
7. Inspecionar cada imagem com view tool — corrigir overflow, sobreposições, contraste baixo
8. Se houver correções: editar gera.js, reexecutar node, reconverter, reinspecionar
9. Copiar output.pptx para /mnt/user-data/outputs/ e chamar present_files
```

---

## 5. CONTEÚDO PADRÃO REUTILIZÁVEL

### Bio de Paulo (versão curta para rodapé de capa)
> Paulo Cortez · Engenheiro de Produção · MBA em Gestão de Pessoas (FGV)

### Bio de Paulo (versão para slide Sobre)
> Paulo Cortez é consultor e facilitador em desenvolvimento de pessoas, com formação em Engenharia de Produção e MBA em Gestão de Pessoas pela FGV. Combina rigor de processo com leitura do comportamento humano para entregar programas aplicados — não apenas teóricos — para cooperativas e empresas de todos os portes.

### Credenciais (slide Sobre ou capa)
- 500+ profissionais formados
- 8 estados brasileiros atendidos
- 3 países com atuação
- 10+ anos de experiência

### Parceiros institucionais
SESCOOP · SEBRAE · Enora

### Contatos (slide CTA)
- WhatsApp: (11) 92018-2998
- E-mail: opaulocortez@outlook.com
- Site: paulocortez.com.br
- LinkedIn: linkedin.com/in/opaulocortez

### Disclaimer padrão (rodapé de proposta comercial)
> Material confidencial. Elaborado exclusivamente para [CLIENTE]. Reprodução ou compartilhamento não autorizado é proibido.

---

## 6. VARIAÇÕES POR TIPO DE DECK

| Tipo | Capa | Estrutura típica |
|------|------|-----------------|
| Proposta comercial | TEAL_DARK com logo | Capa → Sobre Paulo → Diagnóstico do Cliente → Solução Proposta → Investimento → Próximos Passos → CTA |
| Apresentação de treinamento | TEAL_DARK | Capa → Agenda → Conteúdo por módulo → Atividades → Encerramento |
| Palestra/keynote | INK com accent TEAL | Capa → Contexto → Desenvolvimento (slides de dado + citação) → Conclusão → CTA |
| Relatório de resultado | PAPER_WARM | Capa → Resumo Executivo → Dados → Conclusões → Recomendações |
| Diagnóstico organizacional | TEAL_DARK | Capa → Metodologia → Resultados por dimensão → Pontos Críticos → Plano de Ação |

---

## 7. SOBRE IMAGENS

Paulo tem foto profissional disponível em `assets/paulo.webp` ou `assets/paulo.jpg` no repositório do site (github.com/opaulocortez/paulocortez-site). Quando o deck for uma proposta ou apresentação institucional, incluir a foto no slide "Sobre Paulo" com:
```
addImage({ path: "assets/paulo.jpg", x: 6.5, y: 1.5, w: 2.8, h: 3.3, sizing: { type: "cover", align: "center" }, rounding: true })
```

Para logos de parceiros (SESCOOP, SEBRAE, Enora), usar os assets do repositório do site ou inserir o nome por texto caso o arquivo não esteja disponível localmente.

---

## 8. EXEMPLO MÍNIMO DE SCRIPT

```javascript
const pptx = require('pptxgenjs');
const pres = new pptx();
pres.layout = 'LAYOUT_16x9';

// CAPA
const capa = pres.addSlide();
capa.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: '013D49' } });
capa.addShape(pres.ShapeType.rect, { x: 0, y: 4.8, w: 10, h: 0.825, fill: { color: '0099B0' } });
capa.addText('DESENVOLVIMENTO DE PESSOAS', { x: 0.4, y: 1.35, w: 7, fontSize: 11, bold: true, color: '0099B0', charSpacing: 2, isTextBox: true, margin: 0 });
capa.addText('Título do Deck', { x: 0.4, y: 1.75, w: 7.5, fontSize: 38, bold: true, color: 'FFFFFF', fontFace: 'Space Grotesk', isTextBox: true, margin: 0 });
capa.addShape(pres.ShapeType.rect, { x: 0.4, y: 3.15, w: 2.5, h: 0.04, fill: { color: '946818' } });
capa.addText('Paulo Cortez · Engenheiro de Produção · MBA em Gestão de Pessoas (FGV)', { x: 0.4, y: 4.9, w: 9, fontSize: 10, color: 'FFFFFF', fontFace: 'Inter', isTextBox: true, margin: 0 });

pres.writeFile({ fileName: '/home/claude/deck/output.pptx' }).then(() => console.log('ok'));
```

