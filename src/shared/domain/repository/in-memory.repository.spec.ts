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

    expect(entity.toJSON()).toStrictEqual(repository.entities[0].toJSON());
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
    const entity1 = new StubEntity({ name: "name value 1", price: 5 });
    await repository.insert(entity1);

    expect(await repository.findById(entity1.id)).toStrictEqual(entity1);
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

  it("should be able to update an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    const updateEntityParams = new StubEntity(
      { name: "changed value", price: 15 },
      entity.uniqueEntityId
    );

    await repository.update(updateEntityParams);

    const updatedEntity = await repository.findById(entity.id);

    expect(updatedEntity).toStrictEqual(updateEntityParams);
  });

  it("should be able to delete an entity", async () => {
    const entity = new StubEntity({ name: "name value", price: 5 });
    await repository.insert(entity);

    expect(await repository.findAll()).toHaveLength(1);

    await repository.delete(entity.id);

    expect(await repository.findAll()).toHaveLength(0);
  });
});
