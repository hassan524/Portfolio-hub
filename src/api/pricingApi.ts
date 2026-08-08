// src/api/pricingApi.ts

import { api } from "./axios";

export const PricingApi = {


  createCheckout: (payload: {
  }) => {

    return api.post("/payment/create");

  },



};

export default PricingApi;