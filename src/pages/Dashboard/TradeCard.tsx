import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import type { AssetId } from '@shapeshiftoss/caip'
import { useSelector } from 'react-redux'
import { Bridge } from 'components/Bridge/Bridge'
import type { CardProps } from 'components/Card/Card'
import { Card } from 'components/Card/Card'
import { Trade } from 'components/Trade/Trade'
import { selectFeatureFlags } from 'state/slices/preferencesSlice/selectors'

type TradeCardProps = {
  defaultBuyAssetId?: AssetId
} & CardProps

export const TradeCard = ({ defaultBuyAssetId, ...rest }: TradeCardProps) => {
  const { Axelar } = useSelector(selectFeatureFlags)
  return (
    <Card flex={1} variant='outline' {...rest}>
      <Tabs isFitted variant='enclosed'>
        {Axelar && (
          <TabList>
            <Tab>Trade</Tab>
            <Tab>Bridge</Tab>
          </TabList>
        )}

        <TabPanels>
          <TabPanel py={4} px={6}>
            <Trade defaultBuyAssetId={defaultBuyAssetId} />
          </TabPanel>
          {Axelar && (
            <TabPanel py={4} px={6}>
              <Bridge />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Card>
  )
}
