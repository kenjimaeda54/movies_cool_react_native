import styled from "styled-components/native"
import { IIndicatorSeriesPopular } from "./IndicatorSeriesPopular"




export const indicator = styled.TouchableOpacity<IIndicatorSeriesPopular>`
width: 16px;
height: 16px;
border-radius: 8px;
background-color: ${({ theme }) => theme.color.grayLight};
opacity: ${({ activeIndex, index }) => activeIndex === index ? 1 : 0.5};
margin: 0px 10px;
`