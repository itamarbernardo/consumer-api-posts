import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { mockPostCard } from './mockPostCard';

const mockPost = mockPostCard;

describe('<PostCard />', () => {
  it('should render PostCard correctly ', () => {
    // const { debug } = render(<PostCard post={mockPost}/>)
    // debug() //Mostra toda a tela construida -> Serve para testes snapshot -> tira uma foto de como ta construido a estrutura e se algo mudar, já sabe que tá errado
    render(<PostCard post={mockPost} />);

    expect(screen.getByRole('img', { name: /Title 1/i })) //a imagem existe
      .toHaveAttribute('src', mockPost.cover); //e contem esse atributo

    //Vamos usar heading do h1 até o h6
    expect(screen.getByRole('heading', { name: /Title 1/i })).toBeInTheDocument();
    //Testa o paragrafo -> Não conseguimos pegar paragrafo com o role
    expect(screen.getByText('Body 1')).toBeInTheDocument();
  });

  it('shoud match snapshot', () => {
    const { container } = render(<PostCard post={mockPost} />);
    expect(container.firstChild).toMatchSnapshot(); //Cria uma pasta com o snapshot pra comparar com o teste posteriormente
  });
});
