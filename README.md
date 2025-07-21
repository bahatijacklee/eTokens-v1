# 🚀 eTokens DEX v1

**eTokens-v1** is a decentralized exchange (DEX) platform built on the **Lisk Sepolia Testnet**, allowing users to seamlessly swap between custom ERC-20 tokens, claim test tokens via a faucet, and view swap history — all through a clean frontend and smart contract backend.

## 🔧 Tech Stack

- **Smart Contracts**: Solidity
- **Blockchain**: Lisk Sepolia Testnet
- **Frontend**: Next.js (React)
- **Backend**: Hardhat for local dev/deployment
- **Wallet Integration**: MetaMask (via `ethers.js`)
- **Smart Contract Tools**: OpenZeppelin, Hardhat Toolbox

---

## ✨ Features

- 🔄 **Token Swapping**: Swap ETH ↔ Tokens, or Token ↔ Token
- 🧪 **Faucet**: Claim 10 free tokens for testing (once per token)
- 💼 **Custom ERC-20 Tokens**: Auto-deployed and initialized
- 🧾 **Swap History Tracking**: View previous swap records
- 📜 **Dynamic Token Discovery**: Fetch tokens and addresses on-chain
- 🔐 **Allowance Check & Approval**: Automatic ERC-20 token approvals

---

## 📁 Project Structure

```bash
eTokens-v1/
├── contracts/               # Solidity contracts (CustomDex, CustomToken)
├── scripts/                 # Deployment script
├── utils/                   # Token logic, formatting, contract connections
│   ├── context.js           # Web3 interaction functions (swap, faucet, etc.)
│   ├── contract.js          # Contract connection setup
│   ├── saleToken.js         # Static token list (e.g. ETH, BNB, USDC)
│   └── utils.js             # Formatting helpers
├── pages/                   # Frontend pages (swap, faucet, history)
├── public/                  # Assets
├── hardhat.config.js        # Deployment config
└── README.md                # You're here!
````

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/eTokens-v1.git
cd eTokens-v1

# 2. Install dependencies
npm install

# 3. Compile smart contracts
npx hardhat compile

# 4. Deploy contracts to Lisk Sepolia
npx hardhat run scripts/deploy.js --network lisk_sepolia
```

> ✅ Make sure your `.env` has your private key and Lisk RPC details configured if required.

---

## 🔑 Contracts

* `CustomDex.sol`: Handles token swaps, history, faucet
* `CustomToken.sol`: ERC-20 compliant token with fixed initial mint

### 🧾 Example Deployed Address

```text
CustomDex: 0x5D1D078A6bf15218419C9E1d136ddf8f8DA5328D
```

---

## 💻 Usage (Frontend)

### Connect Wallet

Ensure MetaMask is connected to the **Lisk Sepolia Testnet**.

### Interact

* 🔄 **Swap**: Choose tokens and input amount
* 💧 **Faucet**: Click to receive 10 tokens
* 📜 **History**: View all previous swaps

---

## 🌐 Lisk Sepolia Network Info

```text
Network Name: Lisk Sepolia Testnet
Chain ID: 4202
Currency Symbol: ETH
RPC URL: https://sepolia-rpc.lisk.com
```

---

## 🧠 Built With

* [Hardhat](https://hardhat.org/)
* [Lisk](https://lisk.com/)
* [Ethers.js](https://docs.ethers.org/)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Next.js](https://nextjs.org/)

---

## 🛡️ License

This project is licensed under the **GPL-3.0** License.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 🙌 Acknowledgements

* Special thanks to [@bahatijacklee](https://github.com/bahatijacklee) for architecting this project as part of a Web3 learning initiative.




