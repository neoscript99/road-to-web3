useWallet(){
    ethereum.selectedAddress
    let ethereum = window.ethereum
    if (ethereum){
        if(ethereum.selectedAddress)
      ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        updateAddress(accounts[0]);
        toggleConnect(true)
      });}
    else alert('no wallet')
}