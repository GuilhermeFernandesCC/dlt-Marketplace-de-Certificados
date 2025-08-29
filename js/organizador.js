// js/organizador.js
let web3, contract, accounts;

(async () => {
  const config = await loadConfig();
  web3 = await initWeb3();
  accounts = await web3.eth.getAccounts();
  contract = await loadContract(web3, config, "AcadProof");
})();

async function registrarEvento() {
  const nome = document.getElementById("eventoNome").value;
  const data = document.getElementById("eventoData").value;
  const cargaHoraria = document.getElementById("eventoCarga").value;

  try {
    const receipt = await contract.methods.registrarEvento(nome, data, cargaHoraria).send({ from: accounts[0] });
    
    const eventoId = receipt.events.eventoRegistrado.returnValues.id;
    
    document.getElementById("eventoIdOut").innerText = eventoId;
    alert("Evento registrado com sucesso!");

  } catch (err) {
    alert("Erro ao registrar evento. Verifique se você é um organizador.");
    console.error(err);
  }
}

async function emitirCertificado() {
  const eventoId = document.getElementById("certIdEvento").value;
  const nomeAluno = document.getElementById("certNomeAluno").value;
  const matricula = document.getElementById("certMatricula").value;

  try {
    const receipt = await contract.methods.registrarCertificado(nomeAluno, matricula, eventoId).send({ from: accounts[0] });
    
    const certificadoId = receipt.events.certificadoRegistrado.returnValues.id;

    document.getElementById("certIdOut").innerText = certificadoId;
    alert("Certificado emitido com sucesso!");

  } catch (err) {
    alert("Erro ao emitir certificado. Verifique se o ID do evento está correto.");
    console.error(err);
  }
}