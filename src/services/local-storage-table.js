export default class LocalStorageMatriceService {
  create(table) {
    const newProducts = [
      ...this.getAll(),
      table
    ];
    localStorage.setItem('matrice', JSON.stringify(newProducts));
    console.log(this.getAll());
  }

  getAll() {
    return JSON.parse(localStorage.getItem('matrice'));
  }

  deleteAll() {
    localStorage.setItem('matrice', JSON.stringify([]));
  }

  search(searchQuery) {
    return this.getAll().filter(table => table.name.match(searchQuery));
  }
}
