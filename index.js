const perguntas = [
    {
      pergunta: "Qual é a finalidade do comando 'console.log()' em JavaScript?",
      respostas: [
        "Exibir uma mensagem de erro",
        "Imprimir dados no console",
        "Criar uma variável",
      ],
      correta: 1,
    },
    {
      pergunta: "Qual é a função do operador '===' em comparações em JavaScript?",
      respostas: [
        "Comparação de valores sem considerar o tipo",
        "Atribuição de valores",
        "Comparação estrita de valores e tipos",
      ],
      correta: 2,
    },
    {
      pergunta: "Como se declara uma variável em JavaScript?",
      respostas: [
        "let myVar;",
        "const myVar = 10;",
        "ambas as opções acima estão corretas",
      ],
      correta: 2,
    },
    {
      pergunta: "O que é uma função em JavaScript?",
      respostas: [
        "Um tipo de dado",
        "Um bloco de código reutilizável",
        "Uma variável global",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
      respostas: [
        "Nenhuma, são sinônimos",
        "let é usado para valores constantes, const para variáveis",
        "let permite reatribuição, const cria variáveis imutáveis",
      ],
      correta: 2,
    },
    {
      pergunta: "O que é o DOM em JavaScript?",
      respostas: [
        "Um método de criptografia",
        "Um modelo de objeto para manipular documentos HTML",
        "Uma linguagem de programação",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Como se realiza uma iteração sobre os elementos de um array em JavaScript?",
      respostas: [
        "Usando a estrutura 'if-else'",
        "Com a declaração 'switch'",
        "Utilizando loops como 'for' ou 'forEach'",
      ],
      correta: 2,
    },
    {
      pergunta: "O que é o JSON em JavaScript?",
      respostas: [
        "Um método de formatação de texto",
        "Uma linguagem de estilização",
        "Um formato de dados leve e intercambiável",
      ],
      correta: 2,
    },
    {
      pergunta: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
      respostas: [
        "São iguais, usados de forma intercambiável",
        "'null' representa a ausência de valor, 'undefined' é atribuído explicitamente",
        "Ambos representam valores vazios",
      ],
      correta: 1,
    },
    {
      pergunta:
        "Como se adiciona um evento a um elemento HTML usando JavaScript?",
      respostas: [
        "Apenas com CSS",
        "Usando o atributo 'event'",
        "Através do método 'addEventListener'",
      ],
      correta: 2,
    },
  ];
  
  const quiz = document.querySelector("#quiz");
  const template = document.querySelector("template");
  
  // Criar estruturas novas ou objeto especifício, não pode repetir o que tem dentro
  const corretas = new Set();
  
  const totalDePerguntas = perguntas.length;
  
  // Selecionamos o span dentro do acertos, então sempre que for pegar o filho, colocar nome do pai + espaço e o nome do desejado.
  const mostrarTotal = document.querySelector("#acertos span");
  mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
  
  // loop ou laço de repetição
  for (const item of perguntas) {
    const quizItem = template.content.cloneNode(true);
  
    // Pega o h3 do html, adiciona um conteúdo de texto e puxa o título de Pergunta nos arrays.
    quizItem.querySelector("h3").textContent = item.pergunta;
  
    for (let resposta of item.respostas) {
      // quizItem é a div do html, query vai puxar a DL(pai) que vai puxar dt (filho, que é o queremos usar aqui), cloneNode vai clonar tudo com (true)
      const dt = quizItem.querySelector("dl dt").cloneNode(true);
  
      // Selecionou span e trocou o conteúdo ali dentro por Resposta que vem do for (let resposta)
      dt.querySelector("span").textContent = resposta;
  
      // Selecionamos o input e atribuimos para o valor "name" o array c nome geral de pergunta um indíce de item (Isso serve para conseguirmos marcar respostas,
      // em todos os inputs gerados no código ao mesmo tempo - O indíce de perguntas agora é 0-9)
      dt.querySelector("input").setAttribute(
        "name",
        "pergunta-" + perguntas.indexOf(item)
      );
  
      // Input está como value 1, porém nossos input tem name, e o value precisa estar "" para retornar o indice, então, value de input vai procurar o indice(indexOf)
      // e retornar os indices dentro de resposta - 3 alternativas então indice 0,1,2, para que na hora da resposta, retorne na alternativa de acordo com o indice correto.
      dt.querySelector("input").value = item.respostas.indexOf(resposta);
  
      // Selec input (onchange) quer dizer que vai haver uma mudança quando a pessoa clicar em 1 das opçoes, vai carregar o value daquela alternativa (0,1,2)
      // Item.Correta vai puxar o value da alternat. correta, caso seja a mesma selecionada, vai resultar na resposta certa
      dt.querySelector("input").onchange = (event) => {
        const EstaCorreta = event.target.value == item.correta;
  
        // Quando errar, ele vai excluir valor de acerto
        corretas.delete(item);
        if (EstaCorreta) {
          // Puxa a const corretas e adiciona item, que é o valor de acerto, se acertou a resposta adiciona +1 na soma de acertos.
          corretas.add(item);
        }
  
        mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas;
      };
  
      // Selecionou dl que vai acrescentar dt junto da function
      quizItem.querySelector("dl").appendChild(dt);
    }
  
    quizItem.querySelector("dl dt").remove();
  
    // Coloca a pergunta na tela
    quiz.appendChild(quizItem);
  }
  