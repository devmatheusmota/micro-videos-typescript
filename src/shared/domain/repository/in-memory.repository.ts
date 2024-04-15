import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-objects/unique-entity-id";
import NotFoundError from "./../../errors/not-found.error";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  entities: E[] = [];

  async insert(entity: E): Promise<void> {
    this.entities.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<E[]> {
    return this.entities;
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    const index = this.entities.findIndex((item) => item.id === entity.id);
    this.entities[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const index = this.entities.findIndex((item) => item.id === _id);
    this.entities.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const entity = this.entities.find((item) => item.id === id);
    if (!entity) throw new NotFoundError();
    return entity;
  }
}
