import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CardsApiService } from './cards-api.service';

describe('CardsApiService', () => {
  let service: CardsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CardsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('requests cards for a specific owner', () => {
    service.listByOwner('user-1').subscribe();

    const request = httpTestingController.expectOne(
      'http://localhost:3000/cards?ownerId=user-1',
    );

    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('creates a card', () => {
    service
      .create({
        ownerId: 'user-1',
        question: 'Question',
        answer: 'Answer',
      })
      .subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/cards');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
    });
    request.flush({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
      category: 1,
      createdAt: '2026-04-05T10:00:00.000Z',
    });
  });

  it('requests a card by id', () => {
    service.findById('card-1').subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/cards/card-1');

    expect(request.request.method).toBe('GET');
    request.flush({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Question',
      answer: 'Answer',
      category: 1,
      createdAt: '2026-04-05T10:00:00.000Z',
    });
  });

  it('updates a card', () => {
    service
      .update('card-1', {
        question: 'Updated question',
        answer: 'Updated answer',
      })
      .subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/cards/card-1');

    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual({
      question: 'Updated question',
      answer: 'Updated answer',
    });
    request.flush({
      id: 'card-1',
      ownerId: 'user-1',
      question: 'Updated question',
      answer: 'Updated answer',
      category: 1,
      createdAt: '2026-04-05T10:00:00.000Z',
    });
  });

  it('deletes a card', () => {
    service.delete('card-1').subscribe();

    const request = httpTestingController.expectOne('http://localhost:3000/cards/card-1');

    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
