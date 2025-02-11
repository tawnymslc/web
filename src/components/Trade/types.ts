import { type Asset } from '@shapeshiftoss/asset-service'
import type { AssetId } from '@shapeshiftoss/caip'
import { type ChainId } from '@shapeshiftoss/caip'
import { type ChainAdapter } from '@shapeshiftoss/chain-adapters'
import { type HDWallet } from '@shapeshiftoss/hdwallet-core'
import {
  type BuildTradeInput,
  type CowTrade,
  type GetTradeQuoteInput,
  type QuoteFeeData,
  type Trade,
  type TradeQuote,
} from '@shapeshiftoss/swapper'
import type { BIP44Params, KnownChainIds, UtxoAccountType } from '@shapeshiftoss/types'
import type { selectAccountSpecifiers } from 'state/slices/accountSpecifiersSlice/selectors'
import { type AccountSpecifier } from 'state/slices/portfolioSlice/portfolioSliceCommon'

export enum TradeAmountInputField {
  BUY_CRYPTO = 'BUY_CRYPTO',
  BUY_FIAT = 'BUY_FIAT',
  SELL_CRYPTO = 'SELL_CRYPTO',
  SELL_FIAT = 'SELL_FIAT',
}

export type TradeAsset = {
  asset?: Asset
  amount?: string
  fiatAmount?: string
}

export type DisplayFeeData<C extends ChainId> = QuoteFeeData<C> & { tradeFeeSource: string }

export type TradeState<C extends ChainId> = {
  sellTradeAsset: TradeAsset | undefined
  sellAssetAccountId: AccountSpecifier | undefined
  buyAssetAccountId: AccountSpecifier | undefined
  selectedSellAssetAccountId?: AccountSpecifier
  selectedBuyAssetAccountId?: AccountSpecifier
  buyTradeAsset: TradeAsset | undefined
  fiatSellAmount: string
  fiatBuyAmount: string
  sellAssetFiatRate: string
  buyAssetFiatRate: string
  feeAssetFiatRate: string
  fees?: DisplayFeeData<C>
  action: TradeAmountInputField | undefined
  isExactAllowance?: boolean
  quote?: TradeQuote<C>
  trade?: Trade<C> | CowTrade<C>
  /** @deprecated use native react hook form errors instead */
  quoteError: string | null
  amount: string
  receiveAddress: string | null // TODO: Implement
  slippage: number
}

export type TS<T extends KnownChainIds = KnownChainIds> = TradeState<T>

export enum TradeRoutePaths {
  Input = '/trade/input',
  Confirm = '/trade/confirm',
  Approval = '/trade/approval',
  SellSelect = '/trade/select/sell',
  BuySelect = '/trade/select/buy',
  AccountSelect = '/trade/select/account',
}

export type SupportedSwappingChain =
  | KnownChainIds.EthereumMainnet
  | KnownChainIds.AvalancheMainnet
  | KnownChainIds.OsmosisMainnet
  | KnownChainIds.CosmosMainnet

type GetFirstReceiveAddressArgs = {
  accountSpecifiersList: ReturnType<typeof selectAccountSpecifiers>
  buyAsset: Asset
  chainAdapter: ChainAdapter<ChainId>
  wallet: HDWallet
  bip44Params: BIP44Params
  accountType: UtxoAccountType | undefined
}

type GetSelectedReceiveAddressArgs = {
  chainAdapter: ChainAdapter<ChainId>
  wallet: HDWallet
  bip44Params: BIP44Params
  accountType: UtxoAccountType | undefined
}

export type GetFirstReceiveAddress = (args: GetFirstReceiveAddressArgs) => Promise<string>
export type GetSelectedReceiveAddress = (args: GetSelectedReceiveAddressArgs) => Promise<string>

export type TradeQuoteInputCommonArgs = Pick<
  GetTradeQuoteInput,
  'sellAmount' | 'sellAsset' | 'buyAsset' | 'sendMax' | 'receiveAddress'
>

export type BuildTradeInputCommonArgs = Pick<
  BuildTradeInput,
  'sellAmount' | 'sellAsset' | 'buyAsset' | 'sendMax' | 'receiveAddress' | 'wallet'
>

export type GetFormFeesArgs = {
  trade: Trade<KnownChainIds> | TradeQuote<KnownChainIds>
  sellAsset: Asset
  tradeFeeSource: string
  feeAsset: Asset
}

export type AssetIdTradePair = { buyAssetId: AssetId; sellAssetId: AssetId }
