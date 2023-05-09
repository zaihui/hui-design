import { action, observable } from 'mobx'

class MultipleFilters {
  @observable filters = {};

  @observable type = 'single';

  @action.bound
  updateFilters = (val: Record<string, any>): void => {
    this.filters = {
      ...this.filters,
      ...val,
    }
  };

  @action.bound
  updateType = (type: string): void => {
    this.type = type
  };
}
export default new MultipleFilters()
