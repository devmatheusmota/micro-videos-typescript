import { UniqueEntityId } from "../../../shared/domain/value-objects/unique-entity-id";
import { Entity } from "./../../../shared/domain/entity/entity";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.is_active = this.props.is_active ?? true;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  activate(): void {
    if (this.is_active === true) throw new Error("Category is already active!");
    this.props.is_active = true;
  }

  deactivate(): void {
    if (this.is_active === false)
      throw new Error("Category is already inactive.");
    this.props.is_active = false;
  }
}
