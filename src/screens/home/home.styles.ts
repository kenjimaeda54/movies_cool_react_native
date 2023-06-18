import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled } from "styled-components/native";

const { width } = Dimensions.get('window')


export const container = styled(SafeAreaView)`
  flex: 1;
  width: ${width}px;
  background-color: ${({ theme }) => theme.color.black};

`

export const imgTop = styled.Image`
  height: 320px;
  border-radius: 20px;
 
`

export const body = styled.View`
  padding: 20px 25px;

`