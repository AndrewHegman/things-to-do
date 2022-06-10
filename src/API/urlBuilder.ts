import { Category } from "../Interface/Category";
import { ToDoItem } from "../Interface/ToDoItem";
import { Tag } from "../Interface/Tags";
import axios, { Method } from "axios";

export const baseUrl = "http://localhost:3001";

const unpackFetchData = async (request: Promise<Response>, errorHandler?: (error: unknown) => void) => {
  try {
    const response = await request;
    if (response.ok) {
      return await response.json();
    }
    throw response;
  } catch (error) {
    if (errorHandler) {
      return errorHandler(error);
    }
    console.error(error);
  }
};

export class URLBuilder {
  protected url: string;
  protected method: Method;
  protected body: string;
  protected category: string;
  protected query: string;

  constructor() {
    this.url = baseUrl;
    this.method = "GET";
    this.body = "";
    this.category = "";
    this.query = "";
  }

  get() {
    this.method = "GET";
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

  byCategory(categoryId: string) {
    this.buildQuery("category", categoryId);
    return this;
  }

  protected buildQuery(key: string, value: string) {
    this.query = this.query ? `${this.query}&${key}=${value}` : `?${key}=${value}`;
  }

  fetch(errorHandler?: (error: unknown) => void) {
    const { method, body } = this;
    let options = {};

    if (body) {
      options = {
        headers: { "Content-Type": "application/json" },
        data: body,
      };
    }
    console.log(options);
    return axios({
      method,
      url: `${this.url}${this.query}`,
      ...options,
    });

    // return unpackFetchData(
    //   fetch(`${this.url}${this.query}`, {
    //     method,
    //     ...options,
    //   }),
    //   errorHandler
    // );
  }
}

export class APIBuilder {
  private offline: boolean;
  constructor(offline = false) {
    this.offline = offline;
  }

  categories() {
    return new CategoriesAPIBuilder();
  }

  toDoItems() {
    return new ToDosAPIBuilder();
  }

  tags() {
    return new TagsAPIBuilder();
  }
}

class ToDosAPIBuilder extends URLBuilder {
  constructor() {
    super();
    this.url += "/things";
  }

  update(updated: Partial<Omit<ToDoItem, "_id" | "_categoryKey" | "tags"> & { tags: string[] }>) {
    this.body = JSON.stringify(updated);
    this.method = "PUT";
    return this;
  }

  create(newToDo: Omit<ToDoItem, "_id">) {
    this.body = JSON.stringify(newToDo);
    this.method = "POST";
    return this;
  }
}

class CategoriesAPIBuilder extends URLBuilder {
  constructor() {
    super();
    this.url += "/categories";
  }

  update(updated: Partial<Category>) {
    this.body = JSON.stringify(updated);
    this.method = "PUT";
    return this;
  }

  create(newCategory: Omit<Category, "_id">) {
    this.body = JSON.stringify(newCategory);
    this.method = "POST";
    return this;
  }
}

class TagsAPIBuilder extends URLBuilder {
  constructor() {
    super();
    this.url += "/tags";
  }

  update(updated: Partial<Tag>) {
    this.body = JSON.stringify(updated);
    this.method = "PUT";
    return this;
  }

  create(newTag: Omit<Tag, "_id">) {
    this.body = JSON.stringify(newTag);
    this.method = "POST";
    return this;
  }

  // byCategory(category: string) {
  //   this.query = category;
  //   return this;
  // }
}
