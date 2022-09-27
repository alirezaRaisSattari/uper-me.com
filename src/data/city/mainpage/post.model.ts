export interface PostModel {
    postId: number;
    status: number;
    level: number;
    pageId: number;
    caption: string;
    mainFileIsImage: boolean;
    mainFileUrl: string;
    coverImageUrl: string;
    numberOfLikes: number;
    numberOfMinedLikes: number;
    numberOfViews: number;
    numberOfMinedViews: number;
    createDate: string;
    postFiles: any[];
    postExtraFile: any[];
    like: boolean;
    view: boolean;
    bookMark: boolean;
    folderId?: any;
    turnOffCommenting: boolean;
    isLiked: boolean;
    isBookMark: boolean;
}

export interface GetMainPagePostModel {
    skip: number;
    take: number;
    pageId: number;
    requestTime: Date;
}

export interface GetMainPageCommentModel {
    skip: number;
    take: number;
    postId: number;
    parentId: number;
    myPageId: number;
    filterType: number;
    requestTime: Date;
}

export interface postMainPageCommentModel {
    pageId: number;
    postId: number;
    text: string;
    parentId: number;
    posterPageId: number;
}

export interface likeAndUnlikePosts {
    pageId: number;
    postId: number;
    likerPageId: number;
}

export interface createNewComment {
    pageId: number;
    postId: number;
    text: string;
    parentId: number;
    posterPageId: number;
}

export interface likeCommentOrReply {
    commentId: number;
    pageId: number;
    postId: number;
    isLike: boolean;
}

export interface deleteCommentOrReply {
    id: number;
    postId: number;
    myPageId: number;
}

export interface getOneComment {
    commentId: number;
    postId: number;
    myPageId: number;
}

export interface deletedPostsModel {
    skip: number;
    take: number;
    pageId: number;
    postStatus: number;
}

export interface deletePostModel {
    postId: number;
    pageId: number;
}

export interface updatePostCaptionModel {
    caption: string;
    postId: number;
    pageId: number;
}

export interface commentingStatusModel {
    turnOffCommenting: boolean;
    postId: number;
    pageId: number;
}

export class CreatePostUploadFiles {
    isImage: boolean;
    link: string;
    base64: string;
    progress: number;
}

export interface PostCommentMiningModel {
    commentId: number;
    text: string;
    numberOfLikes: number;
    numberOfMinedLikes: number;
    mineTime?: Date;
    postId: number;
    caption: string;
    coverImageUrl: string;
    createdAt: Date;
}

export interface getAllPostMiningModel {
    postId: number;
    pageId: number;
    coverImageUrl: string;
    numberOfLikes: number;
    numberOfViews: number;
    numberOfMinedLikes: number;
    numberOfMinedViews: number;
    caption: string;
    createDate: Date;
    mineTime?: any;
}

export interface GetActiveItemModel {
    pageId: number;
    postId: number;
    numberOfLikes: number;
    numberOfViews: number;
    mineTime: Date;
    caption?: any;
    coverImageUrl: string;
}


export interface favoriteForProductCommentModel {
    commentId: number;
    targetPageId: number;
    text: string;
    faceScore: number;
    averageScoreItems: number;
    numberOfLikes: number;
    numberOfMinedLikes: number;
    createdAt: Date;
    modifiedAt: Date;
    mineTime?: any;
    pageId: number;
    creditLevel: number;
    pageStatus: number;
    profileImageUrl: string;
    name: string;
    username: string;
}

export interface PostFile {
    isImage: boolean;
    partOfPost: number;
    fileUrl: string;
}

export interface PageDetail {
    pageId: number;
    name: string;
    username: string;
    profileImageUrl: string;
    creditLevel: number;
}

export interface posts {
    postId: number;
    status: number;
    level: number;
    pageId: number;
    caption: string;
    mainFileIsImage: boolean;
    coverImageUrl: string;
    turnOffCommenting: boolean;
    numberOfLikes: number;
    numberOfViews: number;
    createdAt: Date;
    canReport: boolean;
    postFiles: PostFile[];
    postExtraFile?: any;
    postHashtags?: any;
    like: boolean;
    view: boolean;
    bookMark: boolean;
    folderId: number;
    pageDetail: PageDetail;
    isLiked: boolean;
}

export interface MyProductMiningModel {
    pageId: number;
    productId: number;
    numberOfLikes: number;
    numberOfViews: number;
    mineTime: Date;
    name: string;
    mainImageUrl: string;
}

export interface PostCommentMining {
    pageId: number;
    commentId: number;
    numberOfLikes: number;
    mineTime: Date;
    text: string;
    postId: number;
}