/**
 * File containing calls to backend routes
 */

import { useUserStore } from "@/stores/user";
import type { PresentationMetadata, SimplePresentation } from "./interfaces";
import { BACK_URL } from "../utils/constants"

/** Get the common headers to the backend */
function getHeaders(): HeadersInit{
  const store = useUserStore();
  if(store.authMethod === undefined)
    throw new Error("Undefined authMethod !");
    
  return {
    'authorization': `Bearer ${store.authToken}`,
    'x-authmode': store.authMethod,
    'accept': 'application/json'
  }
}

/** Wrapper for the fetch function, just with a faster fail */
async function fetchFastFail(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>{
  const response = await fetch(input, init);
  if(!response.ok)
    throw new Error(`Unexpected return value: ${response.status} : ${await response.text()}`);

  return response;
}

/** Get the model metadata */
export async function getPresentationModelMetadata(): Promise<PresentationMetadata> {
  const response = await fetchFastFail(`${BACK_URL}/presentation-models-meta`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get user pres metadata */
export async function getPresentationMetadata(): Promise<PresentationMetadata> {
  const response = await fetchFastFail(`${BACK_URL}/presentations-meta`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get a list of user presentations */
export async function getPresentationList(offset: Number = 0, limit: Number = 10): Promise<SimplePresentation[]> {
  const response = await fetchFastFail(`${BACK_URL}/presentations?offset=${offset}&limit=${limit}`, {
    headers: getHeaders()
  });
  return await response.json();
}




