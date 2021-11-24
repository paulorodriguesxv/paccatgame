Write-Host "Compiling contract!"

$AppClientContractFolder = "./app/paccat-client/src/contracts"
if ((Test-Path $AppClientContractFolder) -eq $False) {
  
    #PowerShell Create directory if not exists
    New-Item $AppClientContractFolder -ItemType Directory
    Write-Host "Folder Created successfully"
}

$AppServerContractFolder = "./app/paccat-server/contracts"
if ((Test-Path $AppServerContractFolder) -eq $False) {
  
    #PowerShell Create directory if not exists
    New-Item $AppServerContractFolder -ItemType Directory
    Write-Host "Folder Created successfully"
}

#truffle compile


Copy-Item ./build/contracts/PacCat.json app/paccat-client/src/contracts/PacCat.json
Copy-Item ./build/contracts/PacCat.json app/paccat-server/contracts/PacCat.json