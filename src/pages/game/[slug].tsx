import { useRouter } from 'next/router'
import { initializeApollo } from 'utils/apollo'

import Game, { GameTemplateProps } from 'templates/Game'

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames'
import { QUERY_GAMES, QUERY_GAME_BY_SLUG } from 'graphql/queries/games'
import {
  QueryGameBySlug,
  QueryGameBySlugVariables
} from 'graphql/generated/QueryGameBySlug'
import { GetStaticProps } from 'next'
import { QueryRecommended } from 'graphql/generated/QueryRecommended'
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended'

import { gamesMapper, highlightMapper } from 'utils/mappers'
import {
  QueryUpcomming,
  QueryUpcommingVariables
} from 'graphql/generated/QueryUpcomming'
import { QUERY_UPCOMMING } from 'graphql/queries/upcomming'

const apolloClient = initializeApollo()

export default function Index(props: GameTemplateProps) {
  const router = useRouter()

  // se a rota não tiver sido gerada ainda
  // você pode mostrar um loading
  // uma tela de esqueleto
  if (router.isFallback) return null

  return <Game {...props} />
}

// gerar em build time (/game/bla, /bame/foo ...)
export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 15 }
  })

  const paths = data.games.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAME_BY_SLUG,
    variables: { slug: `${params?.slug}` }
  })

  if (!data.games.length) {
    return { notFound: true }
  }

  const game = data.games[0]

  const { data: recommended } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED
  })

  const TODAY = new Date().toISOString().slice(0, 10)
  const { data: upcoming } = await apolloClient.query<
    QueryUpcomming,
    QueryUpcommingVariables
  >({ query: QUERY_UPCOMMING, variables: { date: TODAY } })

  return {
    props: {
      revalidate: 60,
      cover: `http://localhost:1337${game.cover?.src}`,
      gameInfo: {
        title: game.name,
        price: game.price,
        description: game.short_description
      },
      gallery: game.galery.map((image) => ({
        src: `http://localhost:1337${image.src}`,
        label: image.label
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        plataforms: game.plataforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name)
      },
      upcomingTitle: upcoming.showcase?.upcommingGames?.title,
      upcomingGames: gamesMapper(upcoming.upcommingGames),
      upcomingHighlight: highlightMapper(
        upcoming.showcase?.upcommingGames?.highlight
      ),
      recommendedTitle: recommended.recommended?.section?.title,
      recommendedGames: gamesMapper(recommended.recommended?.section?.games)
    }
  }
}
