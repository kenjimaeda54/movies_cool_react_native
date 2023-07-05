import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styled } from 'styled-components/native'
import { SharedElement } from 'react-navigation-shared-element'

const { height, width } = Dimensions.get('screen')

export const container = styled.ScrollView`
  height: ${height}px;
  width: ${width}px;
  background-color: ${({ theme }) => theme.color.black};
  position: relative;
`

export const sharedImg = styled(SharedElement)`
  width: ${width}px;
  height: 300px;
`

export const image = styled(FastImage)`
  width: ${width}px;
  height: 300px;
`
export const buttonBack = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  background-color: transparent;
  position: absolute;
  top: 50px;
  left: 20px;
`

export const body = styled.View`
  padding: 20px 25px;
  flex: 3;
  justify-content: space-between;
`

export const overView = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 20px;
  line-height: 25px;
  color: ${({ theme }) => theme.color.grayLight};
  letter-spacing: 1.1px;
  text-align: left;
`

export const title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 23px;
  line-height: 28px;
  color: ${({ theme }) => theme.color.grayLight};
  margin-bottom: 30px;
  text-align: left;
`

export const viewQuantityLike = styled.View`
  padding: 20px 0px;
  flex-direction: row;
  align-self: flex-start;
`

export const quantityLike = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 20px;
  line-height: 25px;
  color: ${({ theme }) => theme.color.grayLight};
  letter-spacing: 1.1px;
`
