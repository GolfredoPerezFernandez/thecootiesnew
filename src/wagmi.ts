import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createPublicClient, http } from 'viem'
import { configureChains, mainnet, createConfig, } from 'wagmi'
import { songbird, flare } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
const {
  chains,
 publicClient,
 webSocketPublicClient
} = configureChains(
  [songbird,flare],
  [publicProvider()],
)
const projectId = 'ec718bde3fb5879a83c577cf446413f2';

const { wallets } = getDefaultWallets({
  appName: 'CootiesFinance',
  projectId,
  chains,
  
});

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rainbowWallet({ projectId, chains }),
      walletConnectWallet({ projectId, chains }),
    ],
  },
]);

export const client = createConfig({
  autoConnect: true,
  publicClient,

  connectors,
  webSocketPublicClient,
})