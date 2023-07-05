import { styled } from 'styled-components/native'

interface IButton {
  isSelected: boolean
}

export const button = styled.TouchableOpacity<IButton>`
  padding: 6px 23px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.grayDark};
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0.5)};
`

export const text = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 17px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.grayLight};
  letter-spacing: 1.1px;
`
