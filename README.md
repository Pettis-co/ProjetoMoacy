# Pettisco

**Descrição:** Pettisco é uma aplicação web desenvolvida para [descrever a funcionalidade principal do projeto]. Este projeto utiliza uma arquitetura de microsserviços, com componentes de frontend e backend, e incorpora automações de deployment para facilitar a implantação contínua.

## Estrutura do Projeto

A estrutura principal do projeto é a seguinte:

- **.github/workflows/**: Contém os arquivos de configuração para automações de CI/CD utilizando GitHub Actions.
- **infra/**: Inclui scripts e configurações para infraestrutura como código, facilitando a gestão e provisionamento de recursos.
- **src/api/**: Contém o código-fonte do backend da aplicação.
- **src/frontend/**: Contém o código-fonte do frontend da aplicação.
- **Dockerfile-api**: Dockerfile para construir a imagem Docker do backend.
- **Dockerfile-frontend**: Dockerfile para construir a imagem Docker do frontend.
- **docker-compose.yml**: Define os serviços Docker e suas configurações para orquestração da aplicação.
- **generate_version.sh**: Script para gerar ou atualizar o número da versão da aplicação.
- **requirements.txt**: Lista de dependências Python necessárias para o backend.
- **version.txt**: Arquivo que contém a versão atual da aplicação.

## Pré-requisitos

- Docker e Docker Compose instalados no sistema.
- Python 3.x instalado (necessário para o backend).

## Configuração e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Pettis-co/Pettisco.git
   cd Pettisco
   ```

2. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, como credenciais de banco de dados, chaves de API, etc. Consulte a documentação interna para detalhes específicos.

3. **Construa e inicie os containers Docker:**

   Utilize o Docker Compose para construir e iniciar os serviços definidos:

   ```bash
   docker-compose up --build
   ```

   Este comando irá:

   - Construir as imagens Docker para o backend e frontend utilizando os Dockerfiles correspondentes.
   - Iniciar os serviços definidos no `docker-compose.yml`, incluindo banco de dados, backend e frontend.

4. **Acesse a aplicação:**

   Após os containers estarem em execução, a aplicação estará disponível em `http://localhost:3000` (ou outra porta configurada).

## Automação de Deployment

O projeto utiliza GitHub Actions para automação de processos de CI/CD. Os workflows estão definidos em `.github/workflows/` e incluem:

- **Integração Contínua (CI):** Automatiza testes e validações a cada push ou pull request.
- **Deploy Contínuo (CD):** Automatiza a implantação da aplicação em ambientes de staging ou produção após a aprovação das alterações.

Para configurar as automações de deployment:

1. **Defina os secrets no GitHub:**

   No repositório do GitHub, vá para `Settings` > `Secrets` e adicione as chaves necessárias, como credenciais de acesso ao servidor de deployment, tokens de API, etc.

2. **Personalize os workflows:**

   Edite os arquivos em `.github/workflows/` conforme necessário para ajustar os processos de CI/CD às necessidades específicas do projeto.

3. **Monitore as execuções:**

   Acompanhe as execuções dos workflows na aba `Actions` do repositório no GitHub. Certifique-se de que todas as etapas estejam sendo concluídas com sucesso e investigue possíveis falhas conforme necessário.

## Contribuições

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Fork este repositório.
2. Crie uma branch para sua feature ou correção (`git checkout -b feature/nova-feature`).
3. Commit suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request no repositório original.

Certifique-se de que suas contribuições estejam alinhadas com as diretrizes do projeto e que todos os testes estejam passando.

---
