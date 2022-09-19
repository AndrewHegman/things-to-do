export enum Collections {
  Things = "things",
  Categories = "categories",
  Tags = "tags",
}

export enum ThingFields {
  ID = "_id",
  Name = "name",
  Tags = "tags",
}

export enum CategoryFields {
  ID = "_id",
  Name = "name",
  Things = "things",
}

export enum TagFields {
  ID = "_id",
  Name = "name",
  Category = "category",
}
