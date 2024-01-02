import api from "../../api";
import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import {styled, keyframes} from 'styled-components';

const Container = styled.div`
  max-width: 100vw;
  margin: 10px 0 0 0;
`;

const CarouselWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
color: #fbae2c;
margin-left: 40px;
`;

const Item = styled.div`  
margin: 10px 10px 0 10px;
padding: 10px 10px 0 10px;
width: 280px;
flex: none;
`;

const ImgDiv = styled.div`
display: flex;
flex-direction: column;
object-fit: cover;
color: ea463e;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Span = styled.span`
  display: block;
  text-align: center;
  padding: 5px;
  
`;

const Name = styled(Span)`
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #fbae2c;
  color: black;
`;

const Buttons = styled.div`
  margin-top: 15px;
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  margin: 0 10px;
`;

const HomeContainer = styled.div`
    height: calc(100vh - 10vh);
    margin: 70px 0 0 0;
`;

const ldsRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerContainer = styled.div`
width: 100vw;
display: flex;
align-itens: center;
justify-content: center;
`;

export const LdsRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

export const LdsRingChild = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: ${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
`;

export const FirstChild = styled(LdsRingChild)`
  animation-delay: -0.45s;
`;

export const SecondChild = styled(LdsRingChild)`
  animation-delay: -0.3s;
`;

export const ThirdChild = styled(LdsRingChild)`
  animation-delay: -0.15s;
`;

  export default function Home(){

    const [movies, setMovies] = useState([])
    const [popularMovies, setPopular] = useState([])
    const [upcoming, setUpComing] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingPopular, setLoadingPopular] = useState(true)
    const [loadingUpcoming, setLoadingUpcoming] = useState(true)
    const carousel = useRef(null);
    const carousel2 = useRef(null);
    const carousel3 = useRef(null);

    const handleLeftClick = (e) => {
        e.preventDefault();
        carousel.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick = (e) => {
        e.preventDefault();
    
        carousel.current.scrollLeft += carousel.current.offsetWidth;
    };  

    const handleLeftClick2 = (e) => {
        e.preventDefault();
        carousel2.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick2 = (e) => {
        e.preventDefault();
    
        carousel2.current.scrollLeft += carousel.current.offsetWidth;
    };  

    const handleLeftClick3 = (e) => {
        e.preventDefault();
        carousel3.current.scrollLeft -= carousel.current.offsetWidth;
    };

    const handleRightClick3 = (e) => {
        e.preventDefault();
    
        carousel3.current.scrollLeft += carousel.current.offsetWidth;
    };  


    useEffect(()=>{
        async function loadMovies(){
            await api.get("trending/movie/day", {
                params:{
                    api_key: "cc4bd098c2a17c7647877ec39ba7d312",
                    language: "pt-BR",
                    page: 1,
                }
            })
            .then((response)=>{
                setMovies(response.data.results.slice(0, 15))
                setLoading(false)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    }
    
    loadMovies()
    
    }, [])


    useEffect(()=>{
        async function loadMovies(){
            await api.get("movie/top_rated", {
                params:{
                    api_key: "cc4bd098c2a17c7647877ec39ba7d312",
                    language: "pt-BR",
                    page: 1,
                }
            })
            .then((response)=>{
                setPopular(response.data.results.slice(0, 15))
                setLoadingPopular(false)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    }
    
    loadMovies()
    
    }, [])


    useEffect(()=>{
        async function loadMovies(){
            await api.get("movie/upcoming", {
                params:{
                    api_key: "cc4bd098c2a17c7647877ec39ba7d312",
                    language: "pt-BR",
                    page: 1,
                }
            })
            .then((response)=>{
                setUpComing(response.data.results.slice(0, 15))
                setLoadingUpcoming(false)
            })
            .catch((error)=>{
                console.log(error)
            })
        
    }
    
    loadMovies()
    
    }, [])

    return(
        <HomeContainer>
            <Title>Tendencias</Title>
            {loading == true ?
            <SpinnerContainer>
            <LdsRing>
              <FirstChild />
              <SecondChild />
              <ThirdChild />
              <LdsRingChild />
            </LdsRing>
          </SpinnerContainer>  :
            <Container>
      <CarouselWrapper ref={carousel}>
        {movies.map((item) => {
          return (
            <Item key={item.id}>
                <Link to={`/filme/${item.id}`}>
              <ImgDiv>
                <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                <Name>{item.title}</Name>
              </ImgDiv>
                </Link> 
            </Item>
          );
        })}
      </CarouselWrapper>
      <Buttons>
        <Button onClick={handleLeftClick}>
            <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </Button>
        <Button onClick={handleRightClick}>
            <ion-icon name="arrow-forward-outline" size="large"></ion-icon>  
        </Button>
      </Buttons>
    </Container>
            
            }
            

        <Title>Populares</Title>
        {loadingPopular == true ? 
        <SpinnerContainer>
        <LdsRing>
          <FirstChild />
          <SecondChild />
          <ThirdChild />
          <LdsRingChild />
        </LdsRing>
      </SpinnerContainer> :
        <Container>
      <CarouselWrapper ref={carousel2}>
        {popularMovies.map((item) => {
          return (
            <Item key={item.id}>
                <Link to={`/filme/${item.id}`}>
                <ImgDiv>
                  <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                  <Name>{item.title}</Name>
                </ImgDiv>
              </Link> 
            </Item>
          );
        })}
      </CarouselWrapper>
      <Buttons>
        <Button onClick={handleLeftClick2}>
            <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </Button>
        <Button onClick={handleRightClick2}>
            <ion-icon name="arrow-forward-outline" size="large"></ion-icon>  
        </Button>
      </Buttons>
    </Container>
        }
        

        <Title>Novidades</Title>
        {loadingUpcoming == true ?
         <SpinnerContainer>
         <LdsRing>
           <FirstChild />
           <SecondChild />
           <ThirdChild />
           <LdsRingChild />
         </LdsRing>
       </SpinnerContainer> :
         <Container>
      <CarouselWrapper ref={carousel3}>
        {upcoming.map((item) => {
          return (
            <Item key={item.id}>
                <Link to={`/filme/${item.id}`}>
                <ImgDiv>
                  <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                  <Name>{item.title}</Name>
              </ImgDiv>
                </Link> 
            </Item>
          );
        })}
      </CarouselWrapper>
      <Buttons>
        <Button onClick={handleLeftClick3}>
            <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </Button>
        <Button onClick={handleRightClick3}>
            <ion-icon name="arrow-forward-outline" size="large"></ion-icon>  
        </Button>
      </Buttons>
    </Container>
         }
        </HomeContainer>
    )
}