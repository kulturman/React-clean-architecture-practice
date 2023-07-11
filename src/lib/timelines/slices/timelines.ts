import {createSlice} from "@reduxjs/toolkit";
import {getAuthenticatedUserTimeLine} from "@/lib/timelines/usecases/get-auth-user-timeline.usecase.ts";

export type TimelineState = {
    user: string;
    messages: {
        text: string;
        author: string;
        publishedAt: string
    }
};
export const timeLinesSlice = createSlice({
    name: 'timelines',
    initialState: {} as TimelineState,
    reducers: {},
    extraReducers: (builder) => {
        // @ts-ignore
        builder.addCase(getAuthenticatedUserTimeLine.fulfilled, (_, action) => {
            return action.payload;
        })
    }
})
