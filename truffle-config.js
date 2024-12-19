module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Alamat lokal Ganache
      port: 7545, // Port yang digunakan oleh Ganache
      network_id: "5777", // Mencocokkan semua ID jaringan
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Versi Solidity yang digunakan dalam kontrak
    },
  },
};
