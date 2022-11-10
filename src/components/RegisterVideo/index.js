import React from "react";
import { StyledRegisterVideo } from "./styles";

export default function RegisterVideo(){
    const [formVisivel, setFormVisivel] = React.useState(false);
    const [values, setValues] = React.useState({titulo:"",url:""})
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)} >
                +
            </button>
            {formVisivel && (
            <form >
                <div>
                    <button className="close-model" onClick={() => setFormVisivel(false)}>
                        x
                    </button>
                    <input placeholder="Titulo do Vídeo" value={values.titulo} onChange={() => setValues()} />
                    <input placeholder="URL" value={values.url} />
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>

            )}
        </StyledRegisterVideo>
    );
}