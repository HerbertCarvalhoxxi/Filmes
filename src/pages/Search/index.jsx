import { useState, useEffect } from "react"
import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import api from "../../api"

const SearchContainer = styled.div`

display: flex;
flex-direction: column;
margin: 80px 0 0 30px;
`;

const Infos = styled.div`
display: flex;
flex-direction: row;
align-itens: center;
margin-bottom: 10px;
`;

const Title = styled.span`
margin-right: 30px;
`;

const View = styled.span`
background-color: #fbae2c;
color: black;
padding: 3px 5px
`;

export default function Search(){

    const { query } = useParams()
    const [filmes, setFilmes] = useState([])

    

    useEffect(()=>{

        async function loadFilme(){
            await api.get(`search/movie?query=${encodeURI(query)}`, {
                params:{
                    api_key: "28fc232cc001c31e8a031f419d0a14ca",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilmes(response.data.results)
                
            })
            .catch((error)=>{
                console.log(error)
                
            })
        }
            loadFilme()

    }, [query])


console.log([filmes])
console.log(query)

    return(
    <>  
        <SearchContainer>
          {filmes.map((movie)=>{
                return(
                    <Infos>
                    <Title>{movie.title}</Title>
                    <Link to={`/filme/${movie.id}`}><View>Acessar</View></Link>
                    </Infos>
                )
            })}  
        </SearchContainer>
    </>  
    )
}