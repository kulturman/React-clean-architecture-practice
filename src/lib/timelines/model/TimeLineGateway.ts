export interface GetUserTimeLineResponse {
    user: string;
    messages: Array<{
        text: string;
        author: string;
        publishedAt: string
    }>
}

export interface TimeLineGateway {
    getUserTimeLine(userId: string): Promise<GetUserTimeLineResponse>
}
