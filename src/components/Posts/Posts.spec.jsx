import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const mockProps = {
  posts: [
    {
      id: 1,
      title: 'Title 1',
      body: 'Body 1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'Title 2',
      body: 'Body 2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'Title 3',
      body: 'Body 3',
      cover: 'img/img3.png',
    },
  ],
};
describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...mockProps} />); //faz o destructuring da Props e ja atribui o posts a posts do mock

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3); //Testa se tem 3 heading (h1 até h6) na pagina com o texto title
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3); //Testa se tem 3 imagens na pagina com o texto alt title
    expect(screen.getAllByText(/body/i)).toHaveLength(3); //Testa se tem 3 imagens na pagina com o texto alt title

    expect(screen.getByRole('img', { name: /title 3/i })).toHaveAttribute('src', 'img/img3.png'); //Testa se uma imagem em especifico aparece
  });

  it('should not render posts', () => {
    render(<Posts />); //faz o destructuring da Props e ja atribui o posts a posts do mock

    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0); //Testa se não tem nenhum heading (h1 até h6) na pagina com o texto title
  });

  it('shoud match snapshot', () => {
    const { container } = render(<Posts {...mockProps} />);

    expect(container.firstChild).toMatchSnapshot(); //Cria uma pasta com o snapshot pra comparar com o teste posteriormente
  });
});
