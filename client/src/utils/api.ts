import axios, { AxiosInstance, AxiosError } from 'axios';

export interface Event {
  _id: string;
  start: number;
  duration: number;
  title: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  accessToken: string;
}

export interface SignInDTO {
  login: string;
  password: string;
}

export interface SignUpDTO {
  username: string;
  email: string;
  password: string;
}

export interface EventDTO {
  start: number;
  duration: number;
  title: string;
}

const axiosAPI = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
  },
});

class API {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
    };
  }

  async signIn(signInDTO: SignInDTO) {
    const response = await this.axiosInstance.post<User>('/auth/signin', signInDTO);
    return response.data;
  }

  async signUp(signUpDTO: SignUpDTO) {
    const response = await this.axiosInstance.post<string>('/auth/signup', signUpDTO);
    return response.data;
  }

  async getEvents() {
    const response = await this.axiosInstance.get<Event[]>('/events', {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async addEvent(eventDTO: EventDTO) {
    const response = await this.axiosInstance.post<Event>('/events', eventDTO, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
  }

  async deleteEvent(eventId: string) {
    await this.axiosInstance.delete<void>(`/events/${eventId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

const ApiInstance = new API(axiosAPI);

type HttpError = {
  error: {
    message: string;
  };
};

export function isAxiosError(error: any): error is AxiosError<HttpError> {
  return error.isAxiosError;
}

export default ApiInstance;
