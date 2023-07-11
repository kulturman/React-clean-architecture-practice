import {GetUserTimeLineResponse, TimeLineGateway} from "@/lib/timelines/model/TimeLineGateway.ts";

export class FakeTimeLineGateway implements TimeLineGateway {
    getUserTimeLine(userId: string): Promise<GetUserTimeLineResponse> {
        return Promise.resolve({
            user: 'Alice',
            messages: [
                {
                    text: 'Hello it is Bob',
                    author: 'Bob',
                    publishedAt: '2023-05-01T00:00:000Z'
                },
                {
                    text: 'Hello it is Alice',
                    author: 'Alice',
                    publishedAt: '2023-05-03T05:00:000Z'
                },
            ]
        });
    }

}
