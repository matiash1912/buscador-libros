
import { useRef, useEffect, useState} from "react";
import Link from "next/link";

const Hero = () => {
    const [Libro, setLibro] = useState("")

    const inputRef = useRef("")
    const formRef = useRef("")
   
 const getLibro = Libro
    
   useEffect(() => {
    
        formRef.current.addEventListener("submit", (e) => {
            e.preventDefault()
        })

    }, [])

    const resultados = () => {
        try {
            const resultado = async () => {
                const busqueda = await inputRef.current.value
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${busqueda}&maxResults=30`)
                const data = await response.json()
        
                setLibro(data.items)

                console.log(data.items)
                
            }
            resultado()
        } catch (error) {
            return(
                <p>Ha habido un error en la conexion</p>
            )
        }
    }
    return(
        <div>
            <div className="hero-bg" >
                <div className="hero centrado">
                    <h2>Busca el libro...</h2>
                    <form ref={formRef} onSubmit={resultados}>
                        <input type="text" ref={inputRef} />
                        <button>Buscar</button>
                    </form>
                </div>
            </div>
            <div className=" listado centrado" >
                {getLibro ? getLibro.map((item) => {
                    const id = item.volumeInfo?.title
                    return(
                        <div className="lista">
                            <div className="">
                               {item.volumeInfo?.imageLinks?.thumbnail? <Link href={`libros/${id}`} ><img className="img-thumb" src={item.volumeInfo?.imageLinks?.thumbnail}/></Link> : <p>No hay imagen</p>}
                            </div>
                            <div>
                                <h4><Link href={`libros/${id}`} target="_blank" >{item.volumeInfo?.title}</Link></h4>
                                {item.searchInfo?.textSnippet ? <p>{item.searchInfo?.textSnippet}</p> : <p>Descripcion no disponible</p>}
                            </div>
                        </div>
                    )
                }) : null }
            </div>
        </div>

    )
}

export default Hero;
