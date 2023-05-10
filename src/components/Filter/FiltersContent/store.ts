
class MultipleFilters {
  filters: Record<string, any>

  type: string

  constructor() {
    this.filters = {}

    this.type = 'single'
  }

  updateFilters = (val: Record<string, any>): void => {
    this.filters = {
      ...this.filters,
      ...val,
    }
  };

  updateType = (type: string): void => {
    this.type = type
  };
}
export default new MultipleFilters()
