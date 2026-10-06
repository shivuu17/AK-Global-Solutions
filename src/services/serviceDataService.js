import { SERVICES_DATA } from '../data/services';

export const serviceDataService = {
  async getServices() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SERVICES_DATA);
      }, 50);
    });
  },

  async getServiceById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const service = SERVICES_DATA.find((s) => s.id === id);
        resolve(service || null);
      }, 50);
    });
  }
};
