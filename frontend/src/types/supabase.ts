export type product = {
    id: number,
    name: string,
    cost: number,
    photo_paths: string[],
    url: string,
    category_id: string,
    initial_quantity: string
export type productCategory = {
    id: number,
    name: string
}