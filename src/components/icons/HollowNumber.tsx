import Svg, {Text as SvgText} from 'react-native-svg';

const HollowNumber = ({num}: {num: number}) => (
  <Svg height="150" width="100">
    <SvgText
      fill="none"
      stroke="white"
      strokeWidth={2}
      fontSize="150"
      fontWeight="bold"
      x="0"
      y="120">
      {num}
    </SvgText>
  </Svg>
);

export default HollowNumber;
