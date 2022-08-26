import { HttpHandler, HttpRequest, HttpResponse } from './http.types';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { stringify } from 'qs';

export class AxiosHttpBackend implements HttpHandler {
  private readonly axios: AxiosInstance;
  constructor(serverUrl: string) {
    this.axios = axios.create({
      baseURL: serverUrl,
      withCredentials: false,
      paramsSerializer: (params) =>
        stringify(params, { indices: false, skipNulls: true }),
    });
  }

  handle(req: HttpRequest): Promise<HttpResponse> {
    return this.axios
      .request({
        url: req.url,
        method: req.method,
        baseURL: req.baseURL,
        headers: req.headers,
        params: req.params,
        data: req.data,
        withCredentials: req.withCredentials,
        responseType: req.responseType,
        xsrfCookieName: req.xsrfCookieName,
        xsrfHeaderName: req.xsrfHeaderName,
        onUploadProgress: req.onUploadProgress,
        onDownloadProgress: req.onDownloadProgress,
      })
      .then((res) => this.toHttpResponse(req, res))
      .catch((e: AxiosError) =>
        Promise.reject(this.toHttpResponse(req, e.response))
      );
  }

  private toHttpResponse(
    req: HttpRequest,
    response?: AxiosResponse
  ): HttpResponse {
    return {
      data: response?.data,
      headers: response?.headers,
      status: response?.status,
      statusText: response?.statusText,
      config: req,
    } as HttpResponse;
  }
}
