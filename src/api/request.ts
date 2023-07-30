class Request {
  async request<R>(url: string, method: string, params?: URLSearchParams | FormData): Promise<R> {
    const response = await fetch(url, {
      method,
      body: params,
    });

    return response.json();
  }

  async get<R>(url: string, params?: Record<string, any>): Promise<R> {
    const urlInstance = new URL(url);

    if (params) {
      Object.keys(params)
        .filter(key => typeof params[key] !== 'undefined')
        .forEach(key => {
          urlInstance.searchParams.append(key, params[key]);
        });
    }

    return this.request<R>(urlInstance.toString(), 'GET');
  }
}

export default new Request();
