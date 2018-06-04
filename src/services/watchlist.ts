class WatchList<T> {
  constructor(private name: string = 'watchlist') {}
  get store() {
    const store = localStorage.getItem(this.name);
    return store ? JSON.parse(store) : [];
  }
  public add(value: any) {
    const exists = this.store.some((item: any) => item.id === value.id);
    const updated = JSON.stringify([...this.store, value]);
    if (!exists) {
      localStorage.setItem(this.name, updated);
    }
  }
  public remove(key: string) {
    const updated = this.store.filter((i: any) => i.id !== key);
    localStorage.setItem(this.name, updated);
  }
  public clear() {
    localStorage.removeItem(this.name);
  }
}
export const watchList = new WatchList();
