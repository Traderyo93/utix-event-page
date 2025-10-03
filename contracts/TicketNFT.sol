// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TicketNFT {
    string public name = "UTIX Event Ticket";
    string public symbol = "UTIX";

    uint256 private _tokenIdCounter;

    mapping(uint256 => address) private _owners;
    mapping(uint256 => string) private _tokenMetadata;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event TicketMinted(address indexed to, uint256 indexed tokenId, string metadata);

    function mint(address to, string memory metadata) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _owners[tokenId] = to;
        _tokenMetadata[tokenId] = metadata;

        emit Transfer(address(0), to, tokenId);
        emit TicketMinted(to, tokenId, metadata);

        return tokenId;
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    function tokenMetadata(uint256 tokenId) public view returns (string memory) {
        return _tokenMetadata[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
