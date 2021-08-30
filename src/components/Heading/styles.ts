/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled, { css, DefaultTheme } from 'styled-components'
import media from 'styled-media-query'
import { HeadingProps } from '.'

type LineColors = 'primary' | 'secondary'

const headingModifiers = {
  small: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.medium};

    &::after {
      width: 3rem;
    }
  `,
  medium: (theme: DefaultTheme) => css`
    font-size: ${theme.font.sizes.xlarge};
  `,
  lineLeft: (theme: DefaultTheme, lineColor: LineColors) => css`
    padding-left: ${theme.spacings.xxsmall};
    border-left: 0.7rem solid ${theme.colors[lineColor]};
  `,

  lineBottom: (theme: DefaultTheme, lineColor: LineColors) => css`
    position: relative;
    margin-bottom: ${theme.spacings.medium};

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -1rem;
      width: 50px;
      border-bottom: 0.5rem solid ${theme.colors[lineColor]};
    }
  `
}

export const Heading = styled.h2<HeadingProps>`
  ${({
    theme,
    color,
    lineLeft,
    lineBottom,
    lineColor = 'primary',
    size
  }) => css`
    color: ${theme.colors[color!]};
    font-size: ${theme.font.sizes.xlarge};

    ${media.greaterThan('medium')`
      font-size: ${theme.font.sizes.xxlarge};
    `}

    ${lineLeft && headingModifiers.lineLeft(theme, lineColor)}
    ${lineBottom && headingModifiers.lineBottom(theme, lineColor)}
    ${!!size && headingModifiers[size](theme)}
  `}
`
