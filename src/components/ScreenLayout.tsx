import styled from 'styled-components/native'
import { SafeAreaView, StatusBar, Platform } from 'react-native'
import Spinner from 'src/components/Spinner'
import useCacheAssets from 'src/hooks/useCacheAssets'

interface Props {
  children: React.ReactNode
  testID?: string
}

export default function ScreenLayout({ children, testID }: Props) {
  const areAssetsCached = useCacheAssets()

  return (
    <S.SafeContainer testID={testID}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="#1e1e1e"
        translucent={Platform.OS === 'android'}
      />
      <S.Wrapper>
        {areAssetsCached ? children : <Spinner />}
      </S.Wrapper>
    </S.SafeContainer>
  )
}

const S = {
  SafeContainer: styled(SafeAreaView)`
    flex: 1;
    background-color: #1e1e1e;
    ${Platform.select({
      android: `padding-top: ${StatusBar.currentHeight}px;`,
      ios: 'padding-top: 0;'
    })}
  `,
  Wrapper: styled.View`
    flex: 1;
  `
}