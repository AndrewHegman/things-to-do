import { Category } from "../Interface/Category";
import { ToDoItem } from "../Interface/ToDoItem";
import { Tag } from "../Interface/Tags";

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
  protected method: string;
  protected body: string;
  protected categoryKey: string;
  protected query: string;

  constructor() {
    this.url = baseUrl;
    this.method = "";
    this.body = "";
    this.categoryKey = "";
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

  byCategory(category: string) {
    this.buildQuery("category", category);
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
        body,
      };
    }
    return unpackFetchData(
      fetch(`${this.url}${this.query}`, {
        method,
        ...options,
      }),
      errorHandler
    );
  }
}

export class APIBuilder {
  private offline: boolean;
  constructor(offline = false) {
    this.offline = offline;
  }

  categories() {
    // if (this.offline) {
    //   return new CategoriesAPIBuilderOffline();
    // }
    return new CategoriesAPIBuilder();
  }

  toDoItems() {
    // if (this.offline) {
    //   return new ToDosAPIBuilderOffline();
    // }
    return new ToDosAPIBuilder();
  }

  tags() {
    // if (this.offline) {
    //   return new TagsAPIBuilderOffline();
    // }
    return new TagsAPIBuilder();
  }
}

class ToDosAPIBuilder extends URLBuilder {
  constructor() {
    super();
    this.url += "/todos";
  }

  update(updated: Partial<Omit<ToDoItem, "id" | "categoryKey">>) {
    this.body = JSON.stringify(updated);
    this.method = "PUT";
    return this;
  }

  create(newToDo: Omit<ToDoItem, "id">) {
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

  create(newCategory: Omit<Category, "key">) {
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

  create(newTag: Omit<Tag, "id">) {
    this.body = JSON.stringify(newTag);
    this.method = "POST";
    return this;
  }

  // byCategory(category: string) {
  //   this.query = category;
  //   return this;
  // }
}
// class ToDosAPIBuilderOffline extends URLBuilder {
//   private isByCategory: boolean;
//   private id: string;
//   private newToDo: Omit<ToDoItem, "id">;
//   private updated: Partial<ToDoItem>;
//   private categoryId: string;

//   constructor(method?: string) {
//     super();

//     this.method = method || "";
//     this.isByCategory = false;
//     this.id = "";
//     this.newToDo = {
//       name: "",
//       categoryKey: "",
//       tags: [],
//     };
//     this.updated = {};
//     this.categoryId = "";
//   }

//   update(updated: Partial<Omit<ToDoItem, "id" | "categoryKey">>) {
//     this.updated = updated;
//     this.method = "PUT";
//     return this;
//   }

//   create(newToDo: Omit<ToDoItem, "id">) {
//     this.newToDo = newToDo;
//     this.method = "POST";
//     return this;
//   }

//   byId(id: string) {
//     this.id = id;
//     return this;
//   }

//   byCategoryKey(categoryId: string) {
//     this.isByCategory = true;
//     this.categoryId = categoryId;
//     return this;
//   }

//   fetch(errorHandler?: (error: unknown) => void) {
//     let func;
//     switch (this.method) {
//       case "GET":
//         if (this.isByCategory || this.byCategoryKey) {
//           func = ToDosAPI.getToDosByCategoryKey(this.categoryId, 0);
//         } else {
//           func = ToDosAPI.getAllToDos(0);
//         }
//         break;
//       case "PUT":
//         func = ToDosAPI.updateToDo(this.id, this.updated, 0);
//         break;
//       case "POST":
//         func = ToDosAPI.createItem(this.newToDo, 0);
//         break;
//       case "DELETE":
//         func = ToDosAPI.deleteItem(this.id, 0);
//         break;
//       default:
//         func = {};
//         break;
//     }

//     return unpackFetchData(func as Promise<Response>, errorHandler);
//   }
// }
//
// class CategoriesAPIBuilderOffline extends URLBuilder {
//   private id: string;
//   private newCategory: Omit<Category, "key">;
//   private updated: Partial<Category>;

//   constructor(method?: string) {
//     super();
//     this.method = method || "";
//     this.id = "";
//     this.newCategory = {
//       displayName: "",
//     };
//     this.updated = {};
//   }

//   get() {
//     this.method = "GET";
//     return this;
//   }

//   update(updated: Partial<Category>) {
//     this.updated = updated;
//     this.method = "PUT";
//     return this;
//   }

//   create(newCategory: Omit<Category, "key">) {
//     this.newCategory = newCategory;
//     this.method = "POST";
//     return this;
//   }

//   delete() {
//     this.method = "DELETE";
//     return this;
//   }

//   byId(id: string) {
//     this.id = id;
//     return this;
//   }

//   fetch(errorHandler?: (error: unknown) => void) {
//     let func;
//     switch (this.method) {
//       case "GET":
//         func = this.id ? CategoriesAPI.getCategoryById(this.id, 0) : CategoriesAPI.getCategories(0);
//         break;
//       case "PUT":
//         func = CategoriesAPI.updateCategory(this.id, this.updated, 0);
//         break;
//       case "POST":
//         func = CategoriesAPI.createCategory(this.newCategory, 0);
//         break;
//       case "DELETE":
//         func = CategoriesAPI.deleteCategory(this.id, 0);
//         break;
//     }

//     return unpackFetchData(func as Promise<Response>, errorHandler);
//   }
// }

// class TagsAPIBuilderOffline extends URLBuilder {
//   private isByCategory: boolean;
//   private id: string;
//   private newTag: Omit<Tag, "id">;
//   private updated: Partial<Tag>;
//   // private categoryKey: string;

//   constructor(method?: string) {
//     super();
//     this.method = method || "";
//     this.isByCategory = false;
//     this.id = "";
//     this.newTag = {
//       name: "",
//       category: "",
//     };
//     this.updated = {};
//     this.categoryKey = "";
//   }

//   get() {
//     this.method = "GET";
//     return this;
//   }

//   update(updated: Partial<Tag>) {
//     this.updated = updated;
//     this.method = "PUT";
//     return this;
//   }

//   create(newTag: Omit<Tag, "id">) {
//     this.newTag = newTag;
//     this.method = "POST";
//     return this;
//   }

//   delete() {
//     this.method = "DELETE";
//     return this;
//   }

//   byCategory(categoryKey: string) {
//     this.isByCategory = true;
//     this.categoryKey = categoryKey;
//     return this;
//   }

//   fetch(errorHandler?: (error: unknown) => void) {
//     let func;
//     switch (this.method) {
//       case "GET":
//         func = this.isByCategory ? TagsAPI.getTagsByCategory(this.categoryKey, 0) : TagsAPI.getTags(0);
//         break;
//       case "PUT":
//         func = TagsAPI.updateTag(this.id, this.updated, 0);
//         break;
//       case "POST":
//         func = TagsAPI.createTag(this.newTag, 0);
//         break;
//       case "DELETE":
//         func = TagsAPI.deleteTag(this.id, 0);
//         break;
//     }

//     return unpackFetchData(func as Promise<Response>, errorHandler);
//   }
// }
