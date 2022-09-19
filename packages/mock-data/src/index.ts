import { Category, Tag, Thing } from "@ttd/interfaces";

import { allCategories } from "./categories";
import { allTags } from "./tags";
import { allThings } from "./things";

// class DatabaseTable<T extends Category | Thing | Tag> {
//   private data: T[];
//   constructor(data: T[]) {
//     this.data = data;
//   }

//   public create(newData: Omit<T, "id">) {
//     this.data.push([...this.data, { id: `${this.data.length + 1}x`, ...newData }]);
//   }
// }

class MockDatabase {
  private _categories: Category[];
  public get categories() {
    return this._categories;
  }

  private set categories(categories: Category[]) {
    this._categories = categories;
  }

  private _things: Thing[];
  public get things(): Thing[] {
    return this._things;
  }

  private set things(things: Thing[]) {
    this._things = things;
  }

  private _tags: Tag[];
  public get tags(): Tag[] {
    return this._tags;
  }

  private set tags(tags: Tag[]) {
    this._tags = tags;
  }

  private static instance: MockDatabase;

  private constructor() {
    this._categories = allCategories;
    this._things = allThings;
    this._tags = allTags;
  }

  public static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  public createTag(newTagData: Omit<Tag, "id">) {
    const newTag = { id: `${this._tags.length + 1}c`, ...newTagData };
    this._tags = [...this._tags, newTag];
    return newTag;
  }

  public createThing(newThingData: Omit<Thing, "id">) {
    const newThing = { id: `${this._things.length + 1}c`, ...newThingData };
    this._things = [...this._things, newThing];
    return newThing;
  }

  public createCategory(newCategoryData: Omit<Category, "id">) {
    const newCategory = { id: `${this._categories.length + 1}c`, ...newCategoryData };
    this._categories = [...this._categories, newCategory];
    return newCategory;
  }
}

export const mockDatabase = MockDatabase.getInstance();
