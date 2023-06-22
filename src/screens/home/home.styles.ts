import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const { width } = Dimensions.get('window')

interface IVieOffeset {
  height: number
}

export const viewInput = styled.View`
  position: relative;
  margin-bottom: 30px;
  justify-content: center ;
`

export const prefix = styled.View<IVieOffeset>`
 position: absolute;
 bottom: ${({ height }) => height / 2 - 5}px;
 top: ${({ height }) => height / 2 - 5}px;
 left: 20px;
`

export const viewOffsetHeight = styled.View<IVieOffeset>`
  height: ${({ height }) => height}px;
  position: relative;
  padding: 20px 0px;
  justify-content: center;
  padding-left: 55px;
  padding-right: 10px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.color.grayLight};
  border-radius: 20px;
 
`

export const input = styled.TextInput<IVieOffeset>`
   font-family: ${({ theme }) => theme.fonts.light};
   font-size: 17px;
   line-height: 21px;
   color: ${({ theme }) => theme.color.grayLight};
`




export const container = styled(SafeAreaView)`
  width: ${width}px;
  background-color: ${({ theme }) => theme.color.black};
  flex: 1; 
`


export const imgTop = styled.Image`
  height: 320px;
  border-radius: 20px;
 
`

export const body = styled.View`
  padding: 20px 25px;
  
`





