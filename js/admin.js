let web3, contract, accounts;

(async () => {
  const config = await loadConfig();
  web3 = await initWeb3();
  accounts = await web3.eth.getAccounts();
  contract = await loadContract(web3, config, "AcadProof");
})();

async function adicionarOrganizador() {
  const orgAddr = document.getElementById("orgEndereco").value;
  try {
    await contract.methods.adicionarOrganizador(orgAddr).send({ from: accounts[0] });
    alert("Organizador adicionado com sucesso!");
  } catch (err) {
    alert("Erro: Apenas admins podem adicionar organizadores.");
    console.error(err);
  }
}

async function removerOrganizador() {
    const orgAddr = document.getElementById("orgEndereco").value;
    try {
        await contract.methods.removerOrganizador(orgAddr).send({ from: accounts[0] });
        alert("Organizador removido com sucesso!");
    } catch (err) {
        alert("Erro: Falha ao remover organizador.");
        console.error(err);
    }
}