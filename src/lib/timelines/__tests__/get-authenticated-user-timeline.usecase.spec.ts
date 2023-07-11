import {describe, it, expect, beforeEach} from "vitest";
import {getAuthenticatedUserTimeLine} from "@/lib/timelines/usecases/get-auth-user-timeline.usecase.ts";
import {initStore} from "@/lib/timelines/store.ts";
import {FakeTimeLineGateway} from "@/lib/timelines/infra/FakeTimeLineGateway.ts";
import {ToolkitStore} from "@reduxjs/toolkit/dist/configureStore";
import {TimelineState} from "@/lib/timelines/slices/timelines.ts";
import {AnyAction} from "@reduxjs/toolkit";
import {TimeLineGateway} from "@/lib/timelines/model/TimeLineGateway.ts";

describe('Retrieve authenticated user timeline', () => {
    let store: ToolkitStore<TimelineState, AnyAction>;
    let timeLineGateway: TimeLineGateway;

    beforeEach(() => {
        timeLineGateway = new FakeTimeLineGateway();
        store = initStore({
            timeLineGateway
        });
    });

    it('Alice is authenticated and can see her timeline', async () => {
        givenAuthenticatedUser('Alice');
        givenExistingTimeline({
            user: 'Alice',
            messages: [
                {
                    text: 'Hello it is Bob',
                    author: 'Bob',
                    publishedAt: new Date('2023-05-01T00:00:00Z')
                },
                {
                    text: 'Hello it is Alice',
                    author: 'Alice',
                    publishedAt: new Date('2023-05-03T05:00:00Z')
                },
            ]
        });

        await whenRetrievingTimeLine();

        thenReceivedTimeLineShouldBe({
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
    });

    function thenReceivedTimeLineShouldBe(expectedTimeLine: {
        user: string,
        messages: ({ publishedAt: string; author: string; text: string })[]
    }) {
        const authUserTimeLine = store.getState();
        expect(authUserTimeLine).toEqual(expectedTimeLine);
    }

    function givenAuthenticatedUser(author: string) {

    }

    function givenExistingTimeline(timeline: {
        user: string
        messages: ({ publishedAt: Date; author: string; text: string })[];
    }) {

    }

    async function whenRetrievingTimeLine() {
        await store.dispatch(getAuthenticatedUserTimeLine());
    }
})
