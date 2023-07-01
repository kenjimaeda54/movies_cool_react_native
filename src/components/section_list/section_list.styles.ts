import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const { width } = Dimensions.get('window')

export const container = styled.View`
  width: ${width}px;

  flex: 1;
`

export const titleSection = styled.Text`
  font-size: 22px;
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: 27px;
  color: ${({ theme }) => theme.color.grayLight};
  margin-bottom: 20px;
`

export const wrappListIndicator = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`

export const viewItem = styled.View`
  margin-right: 20px;
  height: ${width * 0.6 - 60}px;
  width: ${width * 0.6 - 20}px;
`
