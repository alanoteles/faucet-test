import contract from "@truffle/contract"

export const loadContract = async (contractName, provider) => {
    const res = await fetch(`/contracts/${contractName}.json`)
    const Artifact = await res.json()

    const _contract = contract(Artifact)
    _contract.setProvider(provider)

    const deployedContract = _contract.deployed()
    
    return deployedContract

}