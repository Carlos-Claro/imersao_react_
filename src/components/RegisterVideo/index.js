import React from "react";
import { StyledRegisterVideo } from "./styles";


function useForm(props){
    const [values, setValues] = React.useState(props.initialValues);
    return {
        values,
        handleChange: (e) => setValues({
            ...values,
            [e.target.name]: e.target.value
        }),
        clearForm: () => setValues({})
    };
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {
            titulo: "Frostpunk",
            url: "http://youtube.com"
        }
    });
    const [formVisivel, setFormVisivel] = React.useState(true);
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)} >
                +
            </button>
            {formVisivel && (
            <form onSubmit={(e) => {
                e.preventDefault();
                setFormVisivel(false);
                formCadastro.clearForm();
            }} >
                <div>
                    <button className="close-model" onClick={() => setFormVisivel(false)} type="button">
                        x
                    </button>
                    <input 
                        placeholder="Titulo do Vídeo" 
                        name="titulo"
                        value={formCadastro.values.titulo} 
                        onChange={formCadastro.handleChange} 
                        />
                    <input 
                        placeholder="URL" 
                        name="url"
                        value={formCadastro.values.url} 
                        onChange={formCadastro.handleChange} 
                        />
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>

            )}
        </StyledRegisterVideo>
    );
}