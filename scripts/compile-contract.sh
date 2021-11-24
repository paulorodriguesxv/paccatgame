#!/bin/bash

truffle compile

mkdir -p app/paccat-client/src/contracts
mkdir -p app/paccat-server/contracts

cp build/contracts/PacCat.json app/paccat-client/src/contracts/PacCat.json
cp build/contracts/PacCat.json app/paccat-server/contracts/PacCat.json