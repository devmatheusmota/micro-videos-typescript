import { Entity } from "../entity/entity";
import { UniqueEntityId } from "../value-objects/unique-entity-id";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number = 1;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = parseInt(value as any);
    if (isNaN(_page) || _page <= 0) {
      _page = 1;
    }
    this._page = _page;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = parseInt(value as any);
    if (isNaN(_per_page) || _per_page <= 0) {
      _per_page = this._per_page;
    }
    this._per_page = _per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }

  get sort_dir(): string | null {
    return this._sort_dir;
  }

  private set sort_dir(value: string) {
    if (!this._sort) {
      this._sort_dir = null;
      return;
    }

    const dir = `${value}`.toLowerCase();
    this._sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(value: string) {
    this._filter =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }
}

type SearchResultProps<E extends Entity, Filter> = {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: Filter;
};

export class SearchResult<E extends Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_dir: string | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: Math.ceil(this.total / this.per_page),
      sort: this.sort,
      sort_dir: this.sort_dir,
      filter: this.filter,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
