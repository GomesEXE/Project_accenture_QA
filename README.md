# Project_accenture_QA
Desafio para vaga de QA pleno

## Executar os testes

Instale as dependências e execute todos os testes Cypress (API e front-end):

```bash
npm ci
npm test
```

O GitHub Actions executa essa mesma suíte em cada push e pull request. Também é
possível iniciá-la manualmente pela aba **Actions** do GitHub.

## Bugs conhecidos

### Botão de fechar o popup do Practice Form

No primeiro cenário do arquivo
[1_browser-form.feature](./cypress/e2e/Front-End/1_browser-form.feature),
o botão para fechar o popup de confirmação do formulário não funciona
corretamente. Após clicar em **Close**, o popup pode continuar aberto, embora
o comportamento esperado seja fechá-lo.
