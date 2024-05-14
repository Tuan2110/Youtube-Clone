export interface VideoDTO {
    id: string,
    userId : string,
    title: string,
    description: string,
    tags: Array<string>,
    videoUrl: string,
    videoStatus: string,
    thumbnailUrl: string,
    likedCount : number,
    dislikedCount : number,
    viewCount : number,
    createdAt : Date,
}