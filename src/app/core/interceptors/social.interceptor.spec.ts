import { TestBed } from '@angular/core/testing';

import { SocialInterceptor } from './social.interceptor';

describe('SocialInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SocialInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SocialInterceptor = TestBed.inject(SocialInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
