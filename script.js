const iniciarBtn = document.getElementById('iniciarBtn');
const avaliacaoDiv = document.getElementById('avaliacao');
const mensagemDiv = document.getElementById('mensagem');
const encerrarBtn = document.getElementById('encerrarBtn');
const opcoesBtns = document.querySelectorAll('.opcao');
const nomeEventoInput = document.getElementById('nomeEvento'); 
const responsavelEventoInput = document.getElementById('responsavelEvento'); 

let avaliacoes = [];
let senhaPadrao = "";
let nomeEvento = "";
let responsavelEvento = "";

iniciarBtn.addEventListener('click', () => {
  nomeEvento = nomeEventoInput.value; 
  while (nomeEvento === null || nomeEvento.trim() === "") {
    nomeEvento = prompt("O nome do evento não pode ser vazio. Digite o nome do evento:");
  }

  responsavelEvento = responsavelEventoInput.value;
  while (responsavelEvento === null || responsavelEvento.trim() === "") {
    responsavelEvento = prompt("O nome do responsável não pode ser vazio. Digite o nome do responsável:");
  }

  senhaPadrao = prompt("Defina a senha para encerrar o evento:");
  while (senhaPadrao === null || senhaPadrao.trim() === "") {
    senhaPadrao = prompt("A senha não pode ser vazia. Defina a senha para encerrar o evento:");
  }

  avaliacaoDiv.style.display = 'block';
  container.style.display = 'none';
});

opcoesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const avaliacao = btn.dataset.avaliacao;
    const data = new Date();
    avaliacoes.push({
      nomeEvento: nomeEvento,
      responsavelEvento: responsavelEvento, 
      dataEvento: data.toLocaleDateString(),
      horaResposta: data.toLocaleTimeString(),
      avaliacao: avaliacao
    });

    mensagemDiv.style.display = 'block';
    setTimeout(() => {
      mensagemDiv.style.display = 'none';
      avaliacaoDiv.style.display = 'block';
    }, 2000);
  });
});

encerrarBtn.addEventListener('click', () => {
  const senhaDigitada = prompt("Digite a senha para encerrar o evento:");

  if (senhaDigitada === senhaPadrao) {
    if (confirm("Deseja realmente encerrar a avaliação do evento?")) {
      downloadCSV(avaliacoes);
      avaliacaoDiv.style.display = 'none';
      container.style.display = 'block';
      avaliacoes = [];
      senhaPadrao = "";
      nomeEvento = ""; 
      nomeEventoInput.value = ""; 
      responsavelEvento = "";
      responsavelEventoInput.value = "";
    }
  } else {
    alert("Senha incorreta. O evento não foi encerrado.");
  }
});

function downloadCSV(avaliacoes) {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Nome do Evento,Responsável pelo Evento,Data do evento,Hora da resposta,Avaliação realizada\n" 
    + avaliacoes.map(item => 
      `${item.nomeEvento},${item.responsavelEvento},${item.dataEvento},${item.horaResposta},${item.avaliacao}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "avaliacoes_evento.csv");
  document.body.appendChild(link);
  link.click();
}