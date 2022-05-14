import { atom } from "recoil";

interface userProps {
    _id: number,
    nickname:string,
    intra_id: string,
    image_url: string,
    campus: string,
    createdAt: Date,
    hashtags:string[],
    country:string,
    github_id:string,
    introduction:string,
    chatRooms:number[],
    liked_users:string[],
    saved_posts:string[],
    posts:string[],
    n_language:string[],
    l_language:string[],
    join_data:Date
}

export const userData = [{
    _id: 124352,
    nickname:'junseo',
    intra_id: "junseo",
    image_url: "goodday",
    campus: "42seoul",
    createdAt: new Date('2015-04-20T15:37:23'),
    hashtags:['react', 'food'],
    country :'korea',
    github_id: 'Seojunhwan',
    introduction:'Interested in optimizaion',
    chatRooms: [123, 456, 789],
    liked_users: ['jojoo', 'sjo'],
    saved_posts: [],
    posts:[],
    n_language:['korea'],
    l_language:['english', 'japanese'],
    join_data: new Date('2015-04-20T15:37:23')
    
}];

export const userState = atom<userProps[]>({
    key: 'userState', 
    default: [],
});
  