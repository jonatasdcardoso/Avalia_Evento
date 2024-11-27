const iniciarBtn = document.getElementById('iniciarBtn');
const avaliacaoDiv = document.getElementById('avaliacao');
const mensagemDiv = document.getElementById('mensagem');
const encerrarBtn = document.getElementById('encerrarBtn');
const opcoesBtns = document.querySelectorAll('.opcao');

let avaliacoes = [];

iniciarBtn.addEventListener('click', () => {
  avaliacaoDiv.style.display = 'block';
  container.style.display = 'none';
});

opcoesBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const avaliacao = btn.dataset.avaliacao;
    const data = new Date();
    avaliacoes.push({
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
  if (confirm("Deseja encerrar a avaliação do evento?")) {
    downloadCSV(avaliacoes);
    avaliacaoDiv.style.display = 'none';
    iniciarBtn.style.display = 'block';
    avaliacoes = [];
  }
});

function downloadCSV(avaliacoes) {
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Data do evento,Hora da resposta,Avaliacao realizada\n" 
    + avaliacoes.map(item => 
      `${item.dataEvento},${item.horaResposta},${item.avaliacao}`).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "avaliacoes_evento.csv");
  document.body.appendChild(link);
  link.click();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function(error) {
          console.log('Falha ao registrar o Service Worker:', error);
        });
    });
  }