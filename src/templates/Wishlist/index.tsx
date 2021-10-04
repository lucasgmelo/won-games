import { Container } from 'components/Container'
import { Divider } from 'components/Divider'
import { Grid } from 'components/Grid'
import GameCard, { GameCardProps } from 'components/GameCard'
import Heading from 'components/Heading'
import { HighlightProps } from 'components/Highlight'
import Showcase from 'components/Showcase'
import Base from 'templates/Base'
import Empty from 'components/Empty'

export type WishlistTemplateProps = {
  games?: GameCardProps[]
  recommendedTitle?: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const Wishlist = ({
  recommendedTitle,
  recommendedGames,
  recommendedHighlight,
  games = []
}: WishlistTemplateProps) => (
  <Base>
    <Container>
      <Heading lineLeft lineColor="secondary">
        Wishlist
      </Heading>
      {games.length ? (
        <Grid>
          {games?.map((game, index) => (
            <GameCard key={`wishlist-${index}`} {...game} />
          ))}
        </Grid>
      ) : (
        <Empty
          title="Your wishlist is empty"
          description="Games added to your wishlist will appear here"
          hasLink
        />
      )}
      <Divider />
    </Container>
    <Showcase
      title={recommendedTitle}
      games={recommendedGames}
      highlight={recommendedHighlight}
    />
  </Base>
)

export default Wishlist
