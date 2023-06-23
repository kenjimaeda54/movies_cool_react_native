import styled from "styled-components/native";



export const viewItem = styled.View`
   margin-right: 20px;
   width: 200px;
 
`

export const image = styled.Image`
  height: 280px;
  border-radius: 10px;
`


export const textItem = styled.Text`
   margin-top: 15px;
   font-family: ${({ theme }) => theme.fonts.medium};
   color: ${({ theme }) => theme.color.grayLight};
   font-size: 21px;
`
export const wrapIcons = styled.View`
  flex-direction: row;

`