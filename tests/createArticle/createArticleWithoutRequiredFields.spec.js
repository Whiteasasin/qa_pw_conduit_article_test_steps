import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();

  await homePage.clickNewArticleLink();
});

test('Creat an article without required fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    'Article title cannot be empty',
  );
});

test('Create an article with all fields', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitle(faker.lorem.sentence());
  await createArticlePage.fillDescription(faker.lorem.words());
  await createArticlePage.fillBody(faker.lorem.text());
  await createArticlePage.fillTag(faker.lorem.word());

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.clickPublishArticleButton();
  await createArticlePage.assertArticleCreated();
});


test('Create article without description', async () => {
  await createArticlePage.fillTitle('Test title');
  await createArticlePage.fillBody('Test body');
  await createArticlePage.fillTag('test');

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty'
  );
});


test('Create article without body', async () => {
  await createArticlePage.fillTitle('Test title');
  await createArticlePage.fillDescription('Test description');
  await createArticlePage.fillTag('test');

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty'
  );
});


test('Create article without tag', async () => {
  await createArticlePage.fillTitle('Test title');
  await createArticlePage.fillDescription('Test description');
  await createArticlePage.fillBody('Test body');

  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertArticleCreated();
});


