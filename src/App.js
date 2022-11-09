import { providers } from "ethers";
import { useState } from "react";

function App() {
  const [accountAddress, setAccountAddress] = useState("Not connected");
  const [networkConnected, setNetworkConnected] = useState("Not connected");
  const [provider, setProvider] = useState(undefined);

  async function connectWallet() {
    try {
      const currentProvider = new providers.Web3Provider(
        window.ethereum,
        "any"
      );

      let accounts = await currentProvider.send("eth_requestAccounts", []);
      const networkDetails = await currentProvider.getNetwork();
      setNetworkConnected(networkDetails.name.toUpperCase());
      currentProvider.on("network", (newNetwork) => {
        setNetworkConnected(newNetwork.name.toUpperCase());
      });
      setAccountAddress(accounts[0]);
      setProvider(currentProvider);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        disabled={provider}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          padding: "10px",
        }}
        onClick={connectWallet}
      >
        {provider ? "Wallet Connected" : "Connect Wallet"}
      </button>
      {provider && <p>Wallet Address: {accountAddress}</p>}
      {provider && <p>Current Network: {networkConnected}</p>}
    </div>
  );
}

export default App;
