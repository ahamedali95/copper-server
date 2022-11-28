export interface CrudRepository<T> {
    save(t: Omit<T, "id"> | Omit<T, "id">[]): Promise<T | T[]>,
    findOne(id: string | number): Promise<T | undefined>,
    findAll(): Promise<T[]>,
    count(): Promise<number>,
    delete(t: T): Promise<boolean>,
    exists(id: string | number): Promise<boolean>,
    update(t: T | T[]): Promise<T | T[]>
}