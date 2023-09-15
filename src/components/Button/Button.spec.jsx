import { render, screen } from '@testing-library/react';
import { Button } from '.';
import userEvent from '@testing-library/user-event';

describe('<Button />', () => {
  it('should render the button with the text "Load more" ', () => {
    //deveria renderizar o botão com o texto
    const fn = jest.fn(); //Crio um mock pra funcao
    render(<Button text="Load more" handleClick={fn} />);

    expect.assertions(1); //Garanto que pelo menos um expect foi executado (mais comum em testes assincronos, pra garantir que ele seja executado)

    const button = screen.getByRole('button', { name: /load more/i });
    // /load more/i -> é uma expressao regular, pra conseguir identificar dentro da string, pode pegar só um trecho, identifica também com letra maiuscula ou minuscula
    expect(button).toBeInTheDocument(); //Espero que esse botao esteja no documento
  });

  it('should call function on button click ', () => {
    //deve chamar a função ao clicar no botão

    const fn = jest.fn(); //Crio um mock pra funcao
    render(<Button text="Load more" handleClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });
    userEvent.click(button); //Cliquei no botao, espero que a funcao fn seja chamada

    expect(fn).toHaveBeenCalledTimes(1); //Espera que essa funcao foi chamada 1 vez
  });

  it('should be disabled when disabled is true ', () => {
    const fn = jest.fn(); //Crio um mock pra funcao
    render(<Button text="Load more" handleClick={fn} disabled={true} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeDisabled(); //Espera que o botao esteja desativado
  });

  it('should be enabled when disabled is false ', () => {
    const fn = jest.fn(); //Crio um mock pra funcao
    render(<Button text="Load more" handleClick={fn} disabled={false} />);

    const button = screen.getByRole('button', { name: /load more/i });

    expect(button).toBeEnabled(); //Espera que o botao esteja desativado
  });

  it('shoud match snapshot', () => {
    const fn = jest.fn(); //Crio um mock pra funcao

    const { container } = render(<Button text="Load more" disabled={false} handleClick={fn} />);
    expect(container.firstChild).toMatchSnapshot(); //Cria uma pasta com o snapshot pra comparar com o teste posteriormente
  });
});
