import { styled } from "styled-components/native";

export const container = styled.View`
  
`

export const image = styled.Image`
  height: 280px;
  width: 200px;
  border-radius: 10px;
`
export const viewItem = styled.View`
   margin: 0px 20px;
`

export const textItem = styled.Text`
   margin-top: 15px;
   font-family: ${({ theme }) => theme.fonts.medium};
   color: ${({ theme }) => theme.color.grayLight};
   font-size: 21px;
`