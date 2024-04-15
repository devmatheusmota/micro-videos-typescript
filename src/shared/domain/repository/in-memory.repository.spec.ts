import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-objects/unique-entity-id";
import NotFoundError from "./../../errors/not-found.error";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemorytRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubInMemorytRepository;

  beforeEach(() => {
    repository = new StubInMemorytRepository();
  });

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    expect(entity).toStrictEqual(repository.entities[0]);
  });

  it("should throw error when entity is not found", async () => {
    expect.assertions(2);
    try {
      await repository.findById("unexistent-id");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }

    try {
      await repository.findById(new UniqueEntityId());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it("should get one entity by id", async () => {
    const entity = new StubEntity({ name: "name value 1", price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);

    expect(entityFound).toStrictEqual(entity);

    entityFound = await repository.findById(entity.uniqueEntityId);

    expect(entityFound).toStrictEqual(entity);
  });

  it("should return an empty array if no entities were found", async () => {
    expect(await repository.findAll()).toHaveLength(0);
  });
  it("should be able to get all entities", async () => {
    const entity1 = new StubEntity({ name: "name value 1", price: 5 });
    const entity2 = new StubEntity({ name: "name value 2", price: 10 });
    await repository.insert(entity1);
    await repository.insert(entity2);

    const entities = await repository.findAll();

    expect(entities).toHaveLength(2);
    expect(entities).toStrictEqual([entity1, entity2]);
  });

  it("should throw an error on update if entity does not exists", async () => {
    try {
      await repository.update(
        new StubEntity({ name: "test", price: 5 }, new UniqueEntityId())
      );
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it("should be able to update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const updatedEntity = new StubEntity(
      { name: "changed value", price: 15 },
      entity.uniqueEntityId
    );

    await repository.update(updatedEntity);

    expect(updatedEntity.toJSON()).toStrictEqual(
      repository.entities[0].toJSON()
    );
  });

  it("should throw an error on delete if entity does not exists", async () => {
    try {
      await repository.delete(new UniqueEntityId());
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
    }
  });

  it("should be able to delete an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    expect(await repository.findAll()).toHaveLength(1);

    await repository.delete(entity.id);

    expect(repository.entities).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);

    expect(repository.entities).toHaveLength(0);
  });
});
