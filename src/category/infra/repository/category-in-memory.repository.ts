import { Category } from "category/domain/entities/category";
import { CategoryRepository } from "category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "shared/domain/repository/in-memory.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
