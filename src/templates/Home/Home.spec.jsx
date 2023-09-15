import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';

//Criando um mock pra API Rest
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/*', async (req, res, context) => {
    console.log('A CHAMADA FOI INTERCEPTADA');
    return res(
      context.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img/img1.png',
        },
        {
          userId: 1,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img/img2.png',
        },
        {
          userId: 1,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img/img3.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  //a cada teste
  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    expect.assertions(3); //Como temos uma chamada assincrona, queremos garantir que as funcões abaixo executem

    const search = screen.getByPlaceholderText(/digite sua busca/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(2);

    const button = screen.getByRole('button', { name: /carregar mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    //expect.assertions(3); //Como temos uma chamada assincrona, queremos garantir que as funcões abaixo executem

    const search = screen.getByPlaceholderText(/digite sua busca/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    //QUando digitar isso na tela, quero apenas que o primeiro esteja na tela e os outros nao
    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Search Value: title1' })).toBeInTheDocument();

    //Quando limpar a busca, quero que os 2 estejam na tela (lembre que são 2 posts carregados na tela)
    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    //Quando digitar algo que não existe, quero que apareca a mensagem que nao ha posts
    userEvent.type(search, 'lalalala');
    expect(screen.getByText('Não existem posts')).toBeInTheDocument();
  });

  it('should load more posts when button clicked', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    //expect.assertions(3); //Como temos uma chamada assincrona, queremos garantir que as funcões abaixo executem

    const button = screen.getByRole('button');
    act(() => {
      userEvent.click(button);
    });

    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
