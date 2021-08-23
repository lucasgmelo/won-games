import * as S from './styles'

export type HeadingProps = {
  children: React.ReactNode
  color?: 'white' | 'black'
  lineLeft?: boolean
  lineBottom?: boolean
  lineColor?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
}

const Heading = ({
  children,
  color,
  lineLeft = false,
  lineBottom = false,
  size = 'medium',
  lineColor = 'primary'
}: HeadingProps) => (
  <S.Heading
    color={color}
    lineLeft={lineLeft}
    lineBottom={lineBottom}
    lineColor={lineColor}
    size={size}
  >
    {children}
  </S.Heading>
)

export default Heading
