import { createClient } from "@supabase/supabase-js";
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
const PROJECT_URL = "https://nqcmjfnyjvekzbkrkmav.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xY21qZm55anZla3pia3JrbWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODk5NjIsImV4cCI6MTk4Mzc2NTk2Mn0.wl3K3UU1N9cd3Ir6aBDCy6bz-62oLldfWI3p4EX4H7o";
const supabase = createClient(PROJECT_URL, PROJECT_KEY);

function getVideoId(url) {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1){
        return videoId.substring(0,ampersandPosition);
    }
    return videoId;
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {
            titulo: "Frostpunk",
            url: "https://www.youtube.com/watch?v=QsqatJxAUtk"
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
                const thumb = () => `https://img.youtube.com/vi/${getVideoId(formCadastro.values.url)}/hqdefault.jpg`;
                supabase.from("video").insert({
                    title:formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb:thumb(),
                    playlist:"jogos"
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
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