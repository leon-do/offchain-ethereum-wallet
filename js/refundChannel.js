// go on chain to get channel info

function refundChannel() {
  const toAddress = document.getElementById("onChainToAddr").value;
  const eth = document.getElementById("onChainAmount").value;
  const contractAddress = "0x9A79BAA99860f2196AccCFEAdeE517B6465a40a5"; 
  const abi = [ { "constant": false, "inputs": [ { "name": "_h", "type": "bytes32" }, { "name": "_v", "type": "uint8" }, { "name": "_r", "type": "bytes32" }, { "name": "_s", "type": "bytes32" }, { "name": "amount", "type": "uint256" }, { "name": "toAddress", "type": "address" }, { "name": "expires", "type": "uint256" } ], "name": "claim", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "toAddress", "type": "address" } ], "name": "fund", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "toAddress", "type": "address" } ], "name": "refund", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "", "type": "uint256" } ], "name": "ChannelFundingRecieved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "", "type": "uint256" }, { "indexed": false, "name": "", "type": "bool" } ], "name": "ChannelClaimed", "type": "event" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "channels", "outputs": [ { "name": "exist", "type": "bool" }, { "name": "onchainAmount", "type": "uint256" }, { "name": "refundBlockHeight", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "refundDelay", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
  
  // convert amount from eth to wei
  const amount = ethers.utils.parseEther(eth);

  // https://ethereum.stackexchange.com/questions/25431/metamask-how-to-access-call-deployed-contracts-functions-using-metamask
  const contractInstance = web3.eth.contract(abi).at(contractAddress);

  // call the fund() function and send eth to contract
  contractInstance["refund"](toAddress, (err, txHash) => {
    if (err) {console.log(err)}
    // display transaction hash
    document.getElementById("refundChannel").innerHTML = JSON.stringify(
        { txHash },
        null,
        4
      );
  });
}
