<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/logo-dark.png">
  <img src=".github/assets/logo-light.png" alt="Hive by ZeepLabs" width="300">
</picture>

**Um app nativo e leve para Mac que organiza seus projetos e roda agentes de IA de código em terminais — com uma identidade separada para cada organização.**

**🇧🇷 Português** · [English](README.md)

[**⬇️ Baixar a versão mais recente**](../../releases/latest)

</div>

<p align="center">
  <img src=".github/assets/screenshot.png" alt="Janela do Hive: a árvore de projetos com as organizações Pessoal e Cliente A, e o Claude Code esperando aprovação para editar o list.ts enquanto o Codex roda em outro projeto" width="900">
</p>

## O que é o Hive?

Se você roda vários agentes de IA (Claude Code, Codex, opencode) em paralelo e trabalha para mais de uma organização, uma lista solta de terminais mistura tudo. **O Hive mantém seus projetos numa árvore e roda cada sessão com a identidade da organização dona do projeto**: o autor git, a chave SSH, a conta do GitHub CLI e os ajustes de agente certos.

É um **app nativo de Mac** (sem Electron), feito para continuar leve com vários terminais abertos.

## Recursos

- 🌳 **Árvore de projetos** — organização, grupos aninhados, projetos e worktrees git, com arrastar e soltar, seleção múltipla e busca rápida.
- 🖥️ **Terminais** — abas e divisões por projeto; o layout volta quando você reabre o app.
- 🤖 **Agentes em um clique** — Shell, Claude Code, Codex e opencode, com comando configurável.
- 🪪 **Identidade por organização** — autor git, chave SSH, GitHub CLI e ajustes de agente aplicados a cada sessão. Valores secretos ficam no Keychain do macOS.
- 🚦 **Status dos agentes** — rodando, esperando você ou concluído, na árvore e nas abas, com notificações.
- 📥 **Importar por varredura** — encontra os repositórios git de uma pasta para você revisar antes de adicionar.
- 📊 **Recursos** — CPU, memória, disco e número de processos de cada sessão.

A interface é em português.

## Baixar e instalar

1. Abra [**Releases**](../../releases/latest) e baixe o arquivo `.dmg`.
2. Abra o arquivo e **arraste o Hive para Aplicativos**.
3. Abra o Hive pelo Launchpad ou pelo Spotlight.

O app é **assinado e notarizado pela Apple**. O `SHA-256` de cada arquivo está nas notas da versão, se você quiser conferir o download.

**Requisitos:** macOS 14 Sonoma ou posterior.

## Atualizações

O Hive **se atualiza sozinho**: quando sai uma versão nova, ele avisa e você escolhe se quer instalar. Na segunda abertura ele pergunta se pode procurar atualizações automaticamente; se você permitir, ele consulta o feed de atualizações deste projeto uma vez por dia, o que revela seu endereço IP e a versão do app ao host (GitHub). Nada além disso é enviado nessa checagem. Toda atualização é conferida com uma assinatura criptográfica antes de ser instalada.

Além da verificação de atualizações, o próprio Hive faz outras duas requisições de rede: a leitura de PRs pelo seu `gh` (só com a aba PRs aberta) e os dados anônimos de instalação descritos abaixo. Seus agentes, o git e o que mais você rodar nos terminais se conectam por conta própria, como em qualquer terminal.

## Dados anônimos de instalação e uso

O Hive envia eventos anônimos por HTTPS ao Zeep Orbit, um serviço da ZeepLabs (`orbit.zeeptecnologia.com.br`), a cada instalação nova, a cada atualização de versão e, no máximo uma vez por dia, quando o app é aberto. **O envio é sempre ativo: não há configuração para desligar.**

**O que é enviado:**

- um identificador aleatório da instalação (um UUID gerado no app, sem relação com pessoa, e-mail, máquina ou conta);
- o nome do app (`hive`), o tipo do evento (`install`, `update` ou `launch`), a versão e o build do app e, em atualizações, a versão anterior;
- o sistema operacional (macOS), a versão do macOS e a arquitetura (`arm64` ou `x86_64`);
- o canal de distribuição e a data e hora do evento.

**O que não é enviado:** nome, e-mail, nome de usuário, hostname, caminhos de arquivos, nomes de organizações, projetos ou worktrees, variáveis de ambiente, conteúdo de terminal, código, tokens e idioma.

**Endereço IP:** o endereço IP da requisição fica guardado só nos logs do servidor, por 30 dias, e não é armazenado junto com os eventos.

**Para quê:** contar instalações, atualizações e as versões e sistemas em uso, para a ZeepLabs decidir sobre releases e suporte.

**Por quanto tempo:** os eventos ficam por 12 meses e depois são apagados ou agregados em contagens, sem o identificador da instalação. Os eventos ficam no Zeep Orbit, hospedado no Brasil (Oracle Cloud, São Paulo).

**Contato:** Zeep Labs, marca de XPass Tecnology (CNPJ 37.818.214/0001-80). Privacidade e encarregado de dados: legal@zeeptecnologia.com.br.

## Sugestões e bugs

Abra uma [issue](../../issues) neste repositório. **Nunca inclua tokens, chaves SSH, chaves de API ou outros segredos** numa issue, e confira a saída do terminal antes de colar.

## Sobre

Este repositório guarda só as versões publicadas e o feed de atualizações. O código-fonte não é público.

© Zeep Labs. Todos os direitos reservados.
