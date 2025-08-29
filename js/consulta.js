// js/consulta.js
let web3, contract;

(async () => {
  const config = await loadConfig();
  web3 = await initWeb3();
  contract = await loadContract(web3, config, "AcadProof");
})();

async function consultarEvento() {
  const id = document.getElementById("consultaIdEvento").value;
  try {
    const evento = await contract.methods.obterEvento(id).call();
    const output = `Nome: ${evento.nome}\nData: ${evento.data}\nCarga Horária: ${evento.cargaHoraria}`;
    document.getElementById("eventoOut").innerText = output;
  } catch (err) {
    document.getElementById("eventoOut").innerText = "Erro: Evento não encontrado.";
    console.error(err);
  }
}

async function consultarCertificado() {
  const id = document.getElementById("consultaIdCert").value;
  try {
    const cert = await contract.methods.obterCertificado(id).call();
    const output = `Aluno: ${cert.nome_aluno}\nMatrícula: ${cert.matricula}\nID do Evento: ${cert.evento_id}`;
    document.getElementById("certOut").innerText = output;
  } catch (err) {
    document.getElementById("certOut").innerText = "Erro: Certificado não encontrado.";
    console.error(err);
  }
}