import { AngularBLPage } from './app.po';

describe('angular-bl App', () => {
  let page: AngularBLPage;

  beforeEach(() => {
    page = new AngularBLPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
