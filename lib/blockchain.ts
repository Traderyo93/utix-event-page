import { ethers } from 'ethers';

// Polygon Amoy Testnet Configuration
export const AMOY_RPC_URL = 'https://polygon-amoy-bor-rpc.publicnode.com';
export const CHAIN_ID = 80002;

// Simple NFT Contract ABI (only the functions we need)
const CONTRACT_ABI = [
  'function mint(address to, string memory metadata) public returns (uint256)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
  'function tokenMetadata(uint256 tokenId) public view returns (string memory)',
  'function totalSupply() public view returns (uint256)',
  'event TicketMinted(address indexed to, uint256 indexed tokenId, string metadata)'
];

// You'll need to deploy the contract and add the address here
// For now, using a placeholder - we'll update this after deployment
export const CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS || '';

export async function mintTicketNFT(
  recipientEmail: string,
  recipientName: string,
  ticketId: string
): Promise<{ tokenId: string; txHash: string; explorerUrl: string } | null> {
  try {
    // Check if we have the required environment variables
    if (!process.env.WALLET_PRIVATE_KEY || !CONTRACT_ADDRESS) {
      console.warn('Blockchain config not set. Skipping NFT mint.');
      return null;
    }

    // Create provider and wallet
    const provider = new ethers.JsonRpcProvider(AMOY_RPC_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

    // Create contract instance
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    // Create metadata
    const metadata = JSON.stringify({
      name: 'UTIX Investor Presentation Ticket',
      description: 'NFT ticket for UTIX: The Future of Ticketing - Investor Presentation',
      ticketId: ticketId,
      attendee: {
        name: recipientName,
        email: recipientEmail,
      },
      event: {
        name: 'UTIX: The Future of Ticketing',
        type: 'Investor Presentation',
        format: 'Online',
      },
      mintedAt: new Date().toISOString(),
    });

    // Mint the NFT (to a placeholder address since we don't have user wallets)
    // In production, you'd ask users for their wallet address
    const tx = await contract.mint(wallet.address, metadata);

    console.log('NFT mint transaction sent:', tx.hash);

    // Wait for transaction confirmation
    const receipt = await tx.wait();

    // Get the token ID from the event
    const event = receipt.logs.find((log: any) => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed?.name === 'TicketMinted';
      } catch {
        return false;
      }
    });

    let tokenId = '0';
    if (event) {
      const parsed = contract.interface.parseLog(event);
      tokenId = parsed?.args[1].toString();
    }

    return {
      tokenId,
      txHash: receipt.hash,
      explorerUrl: `https://amoy.polygonscan.com/tx/${receipt.hash}`
    };

  } catch (error) {
    console.error('Error minting NFT:', error);
    return null;
  }
}
