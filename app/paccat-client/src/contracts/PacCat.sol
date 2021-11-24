/*
 SPDX-License-Identifier: MIT
*/
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract PacCat is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // Used to store how many tokens were emited
    Counters.Counter private _tokenIdCounter;

    // Set the address of royalty wallet. Must to change o deploy
    address payable private constant _royaltyWallet =
        payable(0xfba78bDc3A8aa40a865Bf15F495c2A4Fe9F12504);

    /*0xdE2EDDbc05CeFd6ACB3db429C237a1a58688AFeC*/

    // set the royalty tax
    uint256 private _royaltyTax = 10; // in percent
    //uint256 private _betCost = 5000000000000000; // for eth
    uint256 private _betCost = 50000000000000000; // for bsc

    mapping(uint256 => uint64) private _numbers;

    constructor() ERC721("PacCat", "PacCat") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function _setNumbers(uint256 _tokenId, uint8[] memory _loterryNumbers)
        internal
    {
        uint64 numbersBitmap = 0;

        for (uint64 i = 0; i < _loterryNumbers.length; i++) {
            require(
                _loterryNumbers[i] > 0,
                "Number has to be equal or greater than 1"
            );
            require(
                _loterryNumbers[i] < 61,
                "Number has to be equal or less than 60"
            );

            bool numberAlreadyExists = ((numbersBitmap &
                (1 << uint64(_loterryNumbers[i]))) > 0);

            require(numberAlreadyExists == false, "Duplicated numbers");

            numbersBitmap = numbersBitmap | (uint64)(1 << _loterryNumbers[i]);
        }

        _numbers[_tokenId] = numbersBitmap;
    }

    function _getBetPrice(uint8[] memory _loterryNumbers)
        internal
        view
        returns (uint256)
    {
        uint256 factor = _loterryNumbers.length**9 / 10000000;

        return factor * _betCost;
    }

    function concatenate(string memory a, string memory b)
        internal
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(a, b));
    }

    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + (j % 10)));
            j /= 10;
        }
        str = string(bstr);
    }

    function getLuck(address to, uint8[] memory _loterryNumbers)
        public
        payable
    {
        require(_loterryNumbers.length >= 6, "It is allowed 6 numbers min");
        require(_loterryNumbers.length <= 15, "It is allowed 15 numbers max");

        uint256 betPrice = _getBetPrice(_loterryNumbers);

        //string memory te =  "Not enough ETH sent; " + "You need of more ethers";
        string memory te = concatenate(
            "Not enough ETH sent; ",
            uint2str(betPrice)
        );

        require(msg.value >= betPrice, te);

        uint256 tokenId = _tokenIdCounter.current();

        _setNumbers(tokenId, _loterryNumbers);

        _royaltyWallet.transfer(msg.value / _royaltyTax);

        _safeMint(to, tokenId);

        _tokenIdCounter.increment();
    }

    function numbers(uint256 tokenId) public view returns (uint8[] memory) {
        uint64 numberBitMap = _numbers[tokenId];
        uint8 counter = 0;
        uint8[] memory result = new uint8[](15); // max numbers that cam be chosen

        for (uint64 i = 0; i < 64; i++) {
            if ((numberBitMap & (1 << i)) > 0) {
                result[counter] = uint8(i);
                counter = counter + 1;
            }
        }

        return result;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // defines the base of resources
    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:8080/token/";
    }

    // withDraw when a winner be defined
    function withDrawAll(address payable to)
        public
        onlyOwner
        returns (uint256)
    {
        // 95% because of gas tax
        uint256 balance = (address(this).balance / 100) * 95;
        to.transfer(balance);

        return balance;
    }
}
