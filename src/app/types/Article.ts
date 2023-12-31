export type Article = {
  id: number;
  attributes: {
    title: string;
    text: string;
    updatedAt: string;
    Headline: boolean;
    slug: string;
    CategoryBreaking: boolean;
    image: {
      data: {
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    collection: {
      data: {
        attributes: {
          slug: string;
          name: string;
        };
      };
    };
  };
};
