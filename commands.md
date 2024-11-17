# Comandos executados no desenvolvimento do projeto

## Comandos para instalar o projeto
```bash
$ npm install -g @angular/cli

$ ng new my-sales-app
```

## Comandos para rodar o projeto
```bash
$ cd my-sales-app

$ ng serve --open
```

## Comandos de componente
`A opção --dry-run nos comandos é para apenas testar o comando sem executá-lo.`

`Para gerar um componente sem os arquivos de template, estilo e teste, adicione a opção --inline-style --inline-template --skip-tests`

### Comando para criar componente de navegação
```bash
$ ng g @angular/material:navigation Home
```

### Comando para criar componente de menu
```bash
$ ng g component components/menu
```

### Comando para criar componente de Categorias
```bash
$ ng g @angular/material:table pages/categories --inline-style
```

### Comando para criar componente de Painel
```bash
$ ng g @angular/material:dashboard pages/dashboard --inline-style
```

### Comando para criar serviço de Categorias
```bash
$ ng g s services/categories/category
```

### Comando para criar variavel de ambiente
```bash
$ ng g environments
```

### Comando para criar interface de Categoria
```bash
$ ng g i services/categories/category request
```

### Comando para gerar um componente com prefixo predefinido
```bash
$ ng g c --prefix 'category' --inline-style pages/categories/components/form
```

### Comando para gerar o componente de loading
```bash
$ ng g c components/loading-bar --inline-style  --inline-template
```

### Comando para gerar os componentes de supliers
```bash
$ ng g c pages/suppliers
$ ng g c pages/suppliers/suppliers-list
$ ng g c pages/suppliers/suppliers-edit
$ ng g c pages/suppliers/suppliers-new
$ ng g c pages/suppliers/suppliers-form
$ ng g c pages/suppliers/suppliers-delete
$ ng g c pages/suppliers/suppliers-show
```
