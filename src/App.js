import React from "react";
import { useEffect, useState, useCallback } from "react";
import './App.css';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from "./utils/load-contract";
import contract from "@truffle/contract";

const App = () => {
  const [web3Api, setWeb3Api] = useState({
      provider: null,
      isProviderLoaded: false,
      web3: null,
      contract: null
    })

  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [shouldReload, setShouldReload] = useState(false)

  const reloadEffect = useCallback(() => {
    setShouldReload(!shouldReload)
  }, [shouldReload])

  const setAccountListener = provider => {
    provider.on("accountsChanged", accounts => setAccount(accounts[0]))

    // provider._jsonRpcConnection.events.on("notification", (payload) => {
    //   const { method } = payload

    //   if(method === "metamask_unlockStateChanged") {
    //     setAccount(null)
    //   }
    // })
  }
  
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      
      if (provider) {
        const contract = await loadContract("Faucet", provider)
        // provider.request({method: "eth_requestAccounts"})
        setAccountListener(provider)
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true
        })
      } else {
        // setWeb3Api({...web3Api, isProviderLoaded: true})
        setWeb3Api(api => ({...api, isProviderLoaded: true}))
        console.error("Please, install Metamask.")
      }
    }

    loadProvider();
  }, [])

  useEffect(() => {
    
    const loadBalance = async () => {
      const { contract, web3 } = web3Api 
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"))
    }
    web3Api.contract && loadBalance()
  }, [web3Api, shouldReload])

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    web3Api.web3 && getAccount()
  }, [web3Api.web3])


  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether")
    })

    reloadEffect()
  }, [web3Api, account, reloadEffect])


  const withdraw = async () => {
    const { contract, web3 } = web3Api
    const withdrawAmount = web3.utils.toWei("0.1", "ether")
    await contract.withdraw(withdrawAmount, {from: account})

    reloadEffect()
  }


  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          { web3Api.isProviderLoaded ?
            <div className="is-flex is-align-items-center">
              <span>
                <strong className="mr-2">Account: </strong>
              </span>
                { account ? 
                    <div>{account}</div> :
                    !web3Api.provider ?
                    <>
                      <div className="notification is-warning is-size-6 is-rounded">
                        Wallet not detected { ` - `}
                        <a rel="noreferrer" target="_blank" href="https://metamask.io/download/">
                          Install Metamask
                        </a>
                      </div>
                    </> :
                    <button className="button is-small"
                      onClick={() => 
                        web3Api.provider.request({method: "eth_requestAccounts"})
                      }>
                      Connect Wallet
                    </button>
                }
            </div> :
            <span> Looking for web3...</span>
          }
          <div className="balance-view is-size-2 my-4">
            Current balance: <strong>{ balance } ETH</strong>
          </div>
          <button 
            className="button is-link mr-2" 
            onClick={ addFunds }
            disabled={!account}
          >
            Donate 1ETH
          </button>
          
          <button 
            className="button is-primary" 
            onClick={ withdraw }
            disabled={!account}
          >
            Withdraw
          </button>
        </div>
      </div>
    </>
  )
}

export default App;