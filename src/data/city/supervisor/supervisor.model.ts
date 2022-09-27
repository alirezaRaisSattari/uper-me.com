export interface Category {
    categoryId: number;
    categoryTitle: string;
}

export interface Page {
    pageId: number;
    name: string;
    userName: string;
    profileImageUrl: string;
    creditLevel: number;
    pageType: number;
    categories: Category[];
}

export interface Factor {
    pageId: number;
    createDate: any;
    number: number;
    isSell: boolean;
}

export interface Post {
    pageId: number;
    createDate: any;
    number: number;
}

export interface supervisorMember {
    pages: Page[];
    factors: Factor[];
    posts: Post[];
    products: any[];
}

