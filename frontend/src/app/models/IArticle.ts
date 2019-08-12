import { RenderType } from './RenderType.enum'

export interface IArticle {
    id: string;
    provider: string,
    title: string,
    content?: string,
    lastUpdated: Date,
    score: number,
    link: string,
    renderType: RenderType,
    renderValue: string,
    views: number,
    author: string,
    category?: string,  //TBD: enum or string?
    upvotes?: number,
    devotes?: number,
    tag?: Array<string>,
    isLinked?: boolean
}