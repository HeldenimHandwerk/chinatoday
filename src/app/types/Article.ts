export type Article = {
  slice(arg0: number, arg1: number): unknown
  id: number
  attributes: {
    title: string
    text: string
    ImageSource: string
    updatedAt: string
    Headline: boolean
    slug: string
    view: number
    ck: string
    CategoryBreaking: boolean
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
