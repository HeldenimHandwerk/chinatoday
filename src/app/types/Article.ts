export type Article = {
  slice(arg0: number, arg1: number): unknown
  id: number
  attributes: {
    title: string
    text: string
    source: string
    updatedAt: string
    Headline: boolean
    CategoryBreaking: boolean
    HeroBreaking: boolean
    slug: string
    view: number
    image: {
      data: {
        attributes: {
          url: string
          width: number
          height: number
        }
      }
    }
    collection: {
      data: {
        attributes: {
          slug: string
          name: string
        }
      }
    }
  }
}
