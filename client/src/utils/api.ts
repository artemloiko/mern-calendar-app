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

const axiosAPI = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: localStorage.getItem('jwt_token') || '',
  },
});

class API {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getAuthHeaders() {
    return {
      Authorization: localStorage.getItem('jwt_token') || '',
    };
  }

  async signIn(signInDTO: SignInDTO) {
    const response = await this.axiosInstance.post<User>('/auth/signin', signInDTO);
    return response.data;
  }

  async signUp(signUpDTO: SignUpDTO) {
    const response = await this.axiosInstance.post<string>('/auth/signup', signUpDTO, {
      headers: this.getAuthHeaders(),
    });
    return response.data;
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
