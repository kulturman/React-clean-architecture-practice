import {Action, configureStore, createAsyncThunk, ThunkDispatch} from "@reduxjs/toolkit";
import {timeLinesSlice} from "@/lib/timelines/slices/timelines.ts";
import {TimeLineGateway} from "@/lib/timelines/model/TimeLineGateway.ts";

export interface Dependencies {
    timeLineGateway: TimeLineGateway
}

export const initStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: timeLinesSlice.reducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies
                }
            })
        },
        devTools: true
    });
}

const rootReducer = timeLinesSlice.reducer;
export type Appstore = ReturnType<typeof initStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, Dependencies, Action>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState,
    dispatch: AppDispatch,
    extra: Dependencies
}>();
