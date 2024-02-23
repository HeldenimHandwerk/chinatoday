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
    dateOfPublish: string | number | Date
    slug: string
    view: number
    image: {
      data: {
        attributes: {
          url: string
          alt: string
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
