import { createSlice, PayloadAction, ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit';
import api, { Event, isAxiosError, EventDTO } from 'utils/api';
import { RootState } from 'app/store';
import { authExpired } from 'features/auth/authSlice';

interface EventsState {
  isLoading: boolean;
  list: Event[];
  isSyncing: boolean;
}

const initialState: EventsState = {
  isLoading: true,
  list: [],
  isSyncing: false,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    eventsRequest(state) {
      state.isLoading = true;
    },
    eventsSuccess(state, action: PayloadAction<Event[]>) {
      state.list = action.payload;
      state.isLoading = false;
    },
    syncEventRequest(state) {
      state.isSyncing = true;
    },
    syncEventFail(state) {
      state.isSyncing = false;
    },
    addEvent(state, action: PayloadAction<Event>) {
      const event = action.payload;
      state.list.push(event);
      state.list.sort((eventA, eventB) => eventA.start - eventB.start);
      state.isSyncing = false;
    },
    deleteEvent(state, action: PayloadAction<Event>) {
      const eventToDelete = action.payload;
      state.list = state.list.filter((event) => event._id !== eventToDelete._id);
      state.isSyncing = false;
    },
  },
});

export default eventsSlice.reducer;

export const {
  eventsRequest,
  eventsSuccess,
  syncEventRequest,
  syncEventFail,
  addEvent,
  deleteEvent,
} = eventsSlice.actions;

async function handleEventError(
  cb: () => Promise<void>,
  dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
) {
  try {
    await cb();
  } catch (error) {
    let errorMessage = error.message;
    if (isAxiosError(error)) {
      errorMessage = error.response?.data.error?.message || error.message;
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Session has expired, please login again.');
        dispatch(authExpired());
      } else {
        alert(errorMessage);
      }
      dispatch(syncEventFail());
    }
  }
}

export function loadEvents(): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch(eventsRequest());
    handleEventError(async () => {
      const data = await api.getEvents();
      dispatch(eventsSuccess(data));
    }, dispatch);
  };
}

export function saveEvent(
  eventDTO: EventDTO,
  successCb: () => void,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch(syncEventRequest());
    handleEventError(async () => {
      const data = await api.addEvent(eventDTO);
      dispatch(addEvent(data));
      successCb();
    }, dispatch);
  };
}

export function removeEvent(
  event: Event,
  successCb: () => void,
): ThunkAction<void, RootState, unknown, Action<string>> {
  return async (dispatch) => {
    dispatch(syncEventRequest());
    handleEventError(async () => {
      await api.deleteEvent(event._id);
      dispatch(deleteEvent(event));
      successCb();
    }, dispatch);
  };
}
