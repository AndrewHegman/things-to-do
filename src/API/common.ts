export const baseUrl = "http://localhost:3001";

export const resolveSlowPromiseWrapper = <T>(resData: T, slowMode: boolean, slowModeTime: number) => {
  return new Promise<T>((res) => setTimeout(() => res(resData), slowMode ? slowModeTime : 0));
};

export const rejectSlowPromiseWrapper = <T>(resData: T, slowMode: boolean, slowModeTime: number) => {
  return new Promise<T>((res, rej) => setTimeout(() => rej(resData), slowMode ? slowModeTime : 0));
};

export const unpackFetchData = async (response: Promise<Response>, errorHandler?: (error: unknown) => void) => {
  try {
    return await (await response).json();
  } catch (error) {
    errorHandler && errorHandler(error);
  }
};

export class URLBuilder {
  private url: string;
  private method: string;
  private body: string;

  constructor() {
    this.url = baseUrl;
    this.method = "";
    this.body = "";
  }

  categories() {
    this.url += "/categories";
    return this;
  }

  toDos() {
    this.url += "/todos";
    return this;
  }

  get() {
    this.method = "GET";
    return this;
  }

  update() {
    this.method = "PUT";
    return this;
  }

  create() {
    this.method = "POST";
    return this;
  }

  delete() {
    this.method = "DELETE";
    return this;
  }

  byId(id: string) {
    this.url += `/${id}`;
    return this;
  }

  withBody(body: string) {
    this.body = body;
    return this;
  }

  fetch(errorHandler?: (error: unknown) => void) {
    const { method, body } = this;
    let options = {};
    if (body) {
      options = {
        headers: { "Content-Type": "application/json" },
        body,
      };
    }

    return unpackFetchData(
      fetch(this.url, {
        method,
        ...options,
      }),
      errorHandler
    );
  }
}
