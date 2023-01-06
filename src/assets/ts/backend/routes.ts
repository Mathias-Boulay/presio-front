/**
 * File containing calls to backend routes
 */

import { useUserStore } from "@/stores/user";
import type { ID, Presentation, PresentationMetadata, SimplePresentation, User, UserMetaData, UserPresentation } from "./interfaces";
import { BACK_API_URL, FORM_FILE, FORM_UUID } from "../utils/constants"

//TODO using an interceptor might not be such a bad idea after all
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
  const response = await fetchFastFail(`${BACK_API_URL}/presentation-models-meta`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get user pres metadata */
export async function getPresentationMetadata(): Promise<PresentationMetadata> {
  const response = await fetchFastFail(`${BACK_API_URL}/presentations-meta`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get a list of user presentations */
export async function getPresentationList(offset: Number=0, limit: Number=10): Promise<SimplePresentation[]> {
  const response = await fetchFastFail(`${BACK_API_URL}/presentations?offset=${offset}&limit=${limit}`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get a user presentation */
export async function getPresentation(id: string): Promise<UserPresentation>{
  const response = await fetchFastFail(`${BACK_API_URL}/presentation/${id}`, {
    headers: getHeaders()
  });
  return await response.json();
}

/** Get a list of model presentations */
export async function getPresentationModelList(offset: Number=0, limit: Number=10): Promise<SimplePresentation[]>{
  const response = await fetchFastFail(`${BACK_API_URL}/presentations-models?offset=${offset}&limit=${limit}`, {
    headers: getHeaders()
  });

  return await response.json()
}

/** Create the presentation from model */
export async function createUserPresentation(modelId: string): Promise<ID> {
  console.log(modelId)
  const response = await fetchFastFail(`${BACK_API_URL}/presentation`, {
    method: 'POST',
    headers: {...getHeaders(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      id: modelId
    })
  });

  return await response.json();
}





/** upload an image to the backend server */
export async function uploadDeviceImage(imageData: string, deviceId: string){
  const response = await fetchFastFail(`${BACK_API_URL}/presentation/device/${deviceId}/image`, {
    method: 'POST',
    headers: {...getHeaders(),
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      imageData: imageData
    })
  });

  return await response.json(); 
}



/** Get an image from the backend server */
export async function getDeviceImage(deviceId: string): Promise<string>{
  const response = await fetchFastFail(`${BACK_API_URL}/presentation/device/${deviceId}/image`, {
    headers: getHeaders()
  });

  if(!response.body)
    throw new Error("Image Body is empty !");

  return await response.text();
}


/** Get your own user info */
export async function getUser(): Promise<User> {
  const response = await fetchFastFail(`${BACK_API_URL}/user`, {
    headers: getHeaders()
  });

  return response.json();
}

/** Create the user, the email is fetched from the IdP */
export async function createUser(): Promise<ID | null>{
  const response = await fetchFastFail(`${BACK_API_URL}/users`, {
    method: 'PUT',
    headers: getHeaders()
  });

  return await response.json();
}



/** Admin stuff, get the users */
export async function getUsers(offset: number, limit: number): Promise<User[]> {
  const response = await fetchFastFail(`${BACK_API_URL}/users?offset=${offset}&limit=${limit}`, {
    headers: getHeaders()
  });

  return await response.json();
}

/** Admin stuff, get user metadata */
export async function getUserMetadata(): Promise<UserMetaData> {
  const response = await fetchFastFail(`${BACK_API_URL}/users-meta`, {
    headers: getHeaders()
  });

  return await response.json();
}

/** Admin stuff, delete a user */
export async function deleteUser(userId: string) {
  const response = await fetchFastFail(`${BACK_API_URL}/user/${userId}`, {
    method: 'DELETE',
    headers: getHeaders()
  });

  // TODO return something ?
}
