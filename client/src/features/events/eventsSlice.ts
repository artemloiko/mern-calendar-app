import { createSlice } from '@reduxjs/toolkit';

interface EventsState {
  isLoading: boolean;
  list?: string[];
}

const initialState: EventsState = {
  isLoading: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    eventsRequest(state) {
      state.isLoading = true;
    },
  },
});

export const { eventsRequest } = eventsSlice.actions;

export default eventsSlice.reducer;
