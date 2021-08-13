import * as S from './styles'

export type HeadingProps = {
  children: React.ReactNode
  color?: 'white' | 'black'
  lineLeft?: boolean
  lineBottom?: boolean
}

const Heading = ({
  children,
  color,
  lineLeft = false,
  lineBottom = false
}: HeadingProps) => (
  <S.Heading color={color} lineLeft={lineLeft} lineBottom={lineBottom}>
    {children}
  </S.Heading>
)

export default Heading
