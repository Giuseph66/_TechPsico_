# Psicólogo App

Aplicativo mobile desenvolvido com **React Native** e **Expo** que permite ao psicólogo se cadastrar e gerenciar seus casos de forma completa e segura. O projeto demonstra o uso de formulários com validação utilizando **react-hook-form** e **Yup**, além da integração com o **expo-document-picker** e o **DateTimePicker**.

## Recursos

- **Tela de Cadastro Completo:**  
  Permite que o profissional se cadastre informando dados pessoais, documentos, endereço, especialidade e outros detalhes importantes, garantindo a integridade dos dados com validações rigorosas.
  
- **Tela de Gerenciamento de Casos:**  
  Exibe uma lista de casos (simulados inicialmente com dados dummy) e possibilita atualizar o status de cada caso (por exemplo, marcar como "Fechado").
  
- **Validações com Yup:**  
  Utiliza regras de validação para garantir que todos os campos essenciais sejam preenchidos corretamente, ajudando a prevenir fraudes.
  
- **Upload de Documentos:**  
  Implementa a funcionalidade de anexar arquivos (diploma e documento de identidade) utilizando o `expo-document-picker`.

## Instalação

### Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente (caso ainda não tenha, instale com `npm install -g expo-cli`)

### Passos

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/psicologo-app.git
   cd psicologo-app
