import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Context } from '../context';
import { Image } from '../pages/Home';

const HeaderContainer = styled.header`
  display: flex;
  color: #fbae2c;
`;

const Button = styled.button`
background: #fbae2c;
font-size: 16px;
margin-left: 4%;
padding: 5px 9px;
border: none;
`;

const Navbar = styled.nav`
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.3s;
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(-70px)')};
`;

const Ul = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;


  const Logo = styled.div`
  display: flex;
  flex-basis: 75%;
  `; 

  const P = styled.h2`
  font-weight: bold;
  color: #fbae2c;
  `;

  const SidebarContainer = styled.div`
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? '30%' : '0')};
  position: fixed;
  top: 0;
  right: 0;
  background-color: #f3f5f8;
  overflow-x: hidden;
  transition: 0.5s;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  a {
    font-size: 1.5rem;
    color: #333;
    text-decoration: none;
    margin-bottom: 1rem;
  }
`;

const SidebarToggle = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-end;
`;

const ButtonSearch = styled.button`
  border: none;
  text-decoration: none;
  background: none;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 65px 0 0 0;
  padding: 0;

`;

const Input = styled.input`
  width: 100%;
  display: flex;
  align-itens: center;
  jusitify-content: center;
  padding: 10px 40px;
  border: 1px solid #ccc;
  margin: 0;
  `;
const Title = styled.h1`
margin: 20px 0 20px 0;
color: black;
`;

const Movie = styled.div`
color: black;
display: flex;
flex-direction: row;
justify-content: center;
align-itens: center;
text-align: center;
margin: 10px 0 50px 0;
`;

const MovieCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-itens: center;
width: 50%;
margin: 0 10px 0 0;
`;


const LinkArea = styled.div`
display: flex;
align-itens: center;
justify-content: space-around;
flex-direction: row;

`;

export default function Header(){

    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [viewSearch, setViewSearch] = useState(false)
    const [search, setSearch] = useState('') 
    const [filmes, setFilmes] = useState([])
    const { saves } = useContext(Context)

    const navigate = useNavigate()

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix")
        setFilmes(JSON.parse(minhaLista) || [])

    }, [saves])

    function excluirFilme(id){

      let filtro = filmes.filter((item) =>{
          return (item.id !== id)
      })

      setFilmes(filtro)
      localStorage.setItem("@primeflix", JSON.stringify(filtro))

  }

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    const closeSidebar = () => {
      setIsOpen(false);
    };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isScrollingUp = prevScrollPos > currentScrollPos;
      
        setVisible(isScrollingUp);
        setPrevScrollPos(currentScrollPos);
      };
      
      function handleSearch(e){
        if (e.key === 'Enter'){
        navigate(`/resultado/${search}`)
        }
      }


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);


    return(
      
      <HeaderContainer>
          <Navbar visible={visible}>
            <Ul>
                <Logo>
                   <Link to={'/'}><P>DB Movies</P></Link> 
                </Logo>
            {viewSearch === false ? <ButtonSearch onClick={()=>{setViewSearch(true)}}><ion-icon name="search-outline" size="large"></ion-icon></ButtonSearch>
            :
            <ButtonSearch onClick={()=>{setViewSearch(false)}}><ion-icon name="close-outline" size="large"></ion-icon></ButtonSearch>
            }
        <Button onClick={()=>setIsOpen(true)}>Mostrar Salvos</Button>
            <SidebarContainer isOpen={isOpen}>
      <SidebarToggle onClick={toggleSidebar}>
      </SidebarToggle>
      <CloseButton onClick={closeSidebar}>X</CloseButton>
      <SidebarContent>
      <>
                <Title>Meus filmes</Title>
                {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span>}
                {filmes.map((item)=>{
                    return(
                          <>
                            
                            <Movie>
                                
                              <MovieCard>
                                <Image src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                                <Title>{item.title}</Title>
                                <LinkArea>
                                <Link to={`/filme/${item.id}`}><ion-icon name="eye-outline" size="large"></ion-icon></Link>
                                <button onClick={() => excluirFilme(item.id)}><ion-icon name="trash-bin-outline" size="large"></ion-icon></button>
                              </LinkArea>                               
                              </MovieCard>  
                            </Movie>
                          </>

                    )
                }
                )}   
            </>
        {}
      </SidebarContent>
    </SidebarContainer>
    </Ul>
    </Navbar>
    {viewSearch === true ? 
            <InputDiv>  
               <Input type='search' value={search} placeholder='digite aqui' onChange={(e)=>{setSearch(e.target.value)}} onKeyDown={(e)=>{handleSearch(e)}} />
            </InputDiv>         
               :
               <>
               </>
           }
      </HeaderContainer>
    )
}