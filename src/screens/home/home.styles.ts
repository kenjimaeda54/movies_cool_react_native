import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window')

export const container = styled(SafeAreaView)`
  width: ${width}px;
  background-color: ${({ theme }) => theme.color.black};
  flex: 1;
`

export const imgTop = styled.Image`
  height: 320px;
  border-radius: 20px;
`

export const containerButtonSearch = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`

export const body = styled.View`
  padding: 20px 25px;
  height: 100%;
`

export const viewItem = styled.View`
  margin-right: 20px;
  width: 200px;
`

export const image = styled.Image`
  height: 280px;
  border-radius: 10px;
`

export const wrapIcons = styled.View`
  flex-direction: row;
`

export const wrapperFooterComponent = styled.View`
  justify-content: center;
  align-items: center;
`

export const imageItem = styled(FastImage)`
  width: 100%;
  height: 100%;
  flex: 1;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.grayLight};
`

export const textItem = styled.Text`
  margin-top: 15px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.color.grayLight};
  font-size: 21px;
`
