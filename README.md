
<p align="center"><a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer"><img width="100" src="./src/assets/logo/logo-regular.png" alt="PhilanthroFi Logo"></a> </p>

## 📓 About PhilanthroFi

PhilanthroFi revolutionizes the way we support global causes by leveraging the power of the Internet Computer blockchain. Utilizing the Motoko language, this platform ensures that every donation contributes to a cause transparently and securely, providing a streamlined experience for both donors and charitable organizations.

<p align="center"><a href="https://identity.ic0.app" target="_blank" rel="noopener noreferrer"><img width="800" src="assets/PhilanthroFiPreview.gif" alt="Explore PhilanthroFi"></a></p>

## 📝 Core Features

- Transparent oversight of fundraising efforts.
- Enhanced security protocols through blockchain.
- Simplified creation and management of charity profiles.
- Immediate updates on the utilization of funds.

## 🖥️ System Requirements

- Node.js (version 20)
- DFX (version 0.17.0)
- NPM (version 7.24.0)
- Windows Subsystem for Linux 2 (WSL2)
- Ubuntu on WSL2

## 📜 Installation Guide

1. Obtain the source code:
   ```
   git clone https://github.com/Darryleffendi/PhilanthroFi.git
   ```
2. Enter the project folder:
   ```
   cd PhilanthroFi
   ```
3. Ensure WSL2 with Ubuntu-22.04 LTS is operational. Setup guide [here](https://docs.microsoft.com/en-us/windows/wsl/install).
4. Within WSL, apply the specified DFX setup:
   ```
   DFX_VERSION=0.17.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
   ```
5. Confirm DFX setup success:
   ```
   dfx --version
   ```
6. Activate Node.js:
   ```
   nvm use 20
   npm install
   ```
7. Initiate the Internet Computer locally:
   ```
   dfx start --clean --background
   ```
8. Prepare environment and deploy resources:
   ```
   npm run setup
   ```
9. Activate all components:
   ```
   npm start
   ```
10. Visit `http://localhost:3000` to explore the platform.

## ⭐ What makes PhilanthroFi unique?

- **Transparency and Security**: Each donation is recorded on the blockchain, ensuring transparency and security.
- **User-friendly**: The platform is designed to be accessible to everyone, making it easy to support worldwide causes.

## ⌛ Future Enhancements

- More blockchain integrations for enhanced functionality.
- Partnerships with international charitable organizations to broaden scope.
- Development of mobile apps for easier access.

## 📧 Contact Information

For more details or to discuss collaboration opportunities, please reach out at:

- Email: darrylgate@gmail.com

