import { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import api from "../../api"
import { Context } from "../../context"
import { LdsRing, LdsRingChild, FirstChild, SecondChild, ThirdChild } from "../Home"

const FilmeInfoContainer = styled.div`
  
  margin: 0px auto auto auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 0 8px;
`;

const FilmeTitle = styled.h1`
  margin: 14px 0;
`;

const FilmeImage = styled.img`
  border-radius: 8px;
  width: 800px;
  max-width: 100%;
  max-height: 340px;
  object-fit: contain;
`;

const SinopseTitle = styled.h3`
  margin-top: 14px;
`;

const SinopseText = styled.span`
  margin: 8px 0;
`;

const AreaButtons = styled.div`
  display: flex;
  margin-top: 14px;
`;

const Button = styled.button`
  margin-right: 12px;
  margin-left: 0;
  font-size: 20px;
  border: 0;
  outline: none;
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #fbae2c;

  &:hover {
    background-color: brown;
    color: #FFF;
  }
`;

const TrailerLink = styled.a`
  text-decoration: none;
  color: #000;
  transition: all 0.5s;

  &:hover {
    color: #FFF;
  }
`;

const SpinnerContainerFilm = styled.div`
margin-top: 50vh;
width: 100vw;
height: 100vh;
display: flex;
align-itens: center;
justify-content: center;
`;

export default function Filme(){

    const [filme, setFilme] = useState([])
    const { id } = useParams()
    const [load, setLoad] = useState(true)
    const navigate = useNavigate()
    const { setSaves, saves } = useContext(Context)    


    useEffect(()=>{

        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoad(false)
            })
            .catch(()=>{
                navigate("/", { replace: true })
                return
                
            })
        }
            loadFilme()
    }, [navigate, id])

    if(load){
        return(
          <SpinnerContainerFilm>
          <LdsRing>
            <FirstChild />
            <SecondChild />
            <ThirdChild />
            <LdsRingChild />
          </LdsRing>
        </SpinnerContainerFilm>
        )
    }


    function salvarFilme(){

        
        const minhaLista = localStorage.getItem("@primeflix")
        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id) 

        if(hasFilme){
            alert("Esse filme já está salvo")
            return
        }
    
        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix" , JSON.stringify(filmesSalvos))
        setSaves( saves + 1)
        alert("Filme salvo com sucesso")
             
    }


    return(
    <FilmeInfoContainer>
        <FilmeTitle><strong>{filme.title}</strong></FilmeTitle>
        <FilmeImage src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        <SinopseTitle>Sinopse</SinopseTitle>
        <SinopseText>{filme.overview}</SinopseText>
        <strong>Avaliação: {filme.vote_average}/10</strong>
      <AreaButtons>
        <Button onClick={salvarFilme}>Salvar</Button>
        <Button>
          <TrailerLink target="_blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </TrailerLink>
        </Button>
      </AreaButtons>
    </FilmeInfoContainer>
  );
};
    