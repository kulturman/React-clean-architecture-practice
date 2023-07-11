import {createAppAsyncThunk} from "@/lib/timelines/store.ts";

export const getAuthenticatedUserTimeLine= createAppAsyncThunk(
    'timelines/getAuthenticatedUserTimeLine',
    async (_, { extra: {timeLineGateway}}) => {
        return await timeLineGateway.getUserTimeLine('');
    }
);
