import { render, screen } from "@testing-library/react"
import {TextInput} from '.'
import userEvent from "@testing-library/user-event"


describe('<TextInput />', () => {
    it('should have a value of seachValue', () => {
        const fn = jest.fn()
        render(<TextInput handleChange={fn} searchValue="Testando"/>)

        const input = screen.getByPlaceholderText(/Digite sua busca/i)
        expect(input).toBeInTheDocument()

        expect(input.value).toBe('Testando')
    })

    it('should call handleChange function on each key pressed', async () => {
        const fn = jest.fn()
        render(<TextInput handleChange={fn} />)
        
        const input = screen.getByPlaceholderText(/Digite sua busca/i)
        const value = 'o valor'

        await userEvent.type(input, value) //Digita esse valor no input
        expect(input.value).toBe(value)
        expect(fn).toHaveBeenCalledTimes(value.length) //chamou essa funcao 7 vezes pois value tem 7 caracteres
    })


    it('shoud match snapshot', () => {
        const fn = jest.fn()
        const {container} = render(<TextInput handleChange={fn} searchValue="Testando"/>)

        expect(container.firstChild).toMatchSnapshot() //Cria uma pasta com o snapshot pra comparar com o teste posteriormente
    })
})