import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export type CardViewModel = {
  id: string;
  ownerId: string;
  question: string;
  answer: string;
  category: number;
  createdAt: string;
  nextReviewAt: string;
  learned: boolean;
  tag?: string;
};

export type CreateCardPayload = {
  ownerId: string;
  question: string;
  answer: string;
  tag?: string;
};

export type UpdateCardPayload = {
  question: string;
  answer: string;
  tag?: string;
};

@Injectable({
  providedIn: 'root',
})
export class CardsApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/cards';

  listByOwner(ownerId: string) {
    const params = new HttpParams().set('ownerId', ownerId);
    return this.httpClient.get<CardViewModel[]>(this.baseUrl, { params });
  }

  findByTags(tags: string | string[]) {
    const normalizedTags = Array.isArray(tags)
      ? tags
      : tags.split(',').map((tag) => tag.trim()).filter(Boolean);

    let params = new HttpParams();
    normalizedTags.forEach((tag) => {
      params = params.append('tags', tag);
    });

    return this.httpClient.get<CardViewModel[]>(`${this.baseUrl}/tags`, { params });
  }

  listDueByOwner(ownerId: string, referenceDate?: string) {
    let params = new HttpParams().set('ownerId', ownerId);

    if (referenceDate) {
      params = params.set('referenceDate', referenceDate);
    }

    return this.httpClient.get<CardViewModel[]>(`${this.baseUrl}/due`, { params });
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

  review(cardId: string, isValid: boolean, referenceDate?: string) {
    return this.httpClient.post<CardViewModel>(`${this.baseUrl}/${cardId}/review`, {
      isValid,
      referenceDate,
    });
  }

  delete(cardId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${cardId}`);
  }
}
