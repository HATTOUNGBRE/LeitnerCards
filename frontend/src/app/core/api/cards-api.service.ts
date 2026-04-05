import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type CardViewModel = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  category: number;
  createdAt: string;
};

export type CreateCardPayload = {
  ownerId: string;
  question: string;
  answer: string;
};

export type UpdateCardPayload = {
  question: string;
  answer: string;
};

@Injectable({
  providedIn: 'root',
})
export class CardsApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/cards';

  listByOwner(ownerId: string) {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.httpClient.get<CardViewModel[]>(this.baseUrl, { params });
  }

  create(payload: CreateCardPayload) {
    return this.httpClient.post<CardViewModel>(this.baseUrl, payload);
  }

  findById(cardId: string) {
    return this.httpClient.get<CardViewModel>(`${this.baseUrl}/${cardId}`);
  }

  update(cardId: string, payload: UpdateCardPayload) {
    return this.httpClient.patch<CardViewModel>(`${this.baseUrl}/${cardId}`, payload);
  }

  delete(cardId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${cardId}`);
  }
}
