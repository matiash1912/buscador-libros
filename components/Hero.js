import { useRef, useEffect, useState} from "react";

const Hero = () => {
    const [libro, setLibro] = useState("")

    const inputRef = useRef("")
    const formRef = useRef("")
    
   useEffect(() => {
        formRef.current.addEventListener("submit", (e) => {
            e.preventDefault()
        })

    }, [])

    const resultados = async () => {
        const busqueda = await inputRef.current.value
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${busqueda}`)
        const data = await response.json()

        setLibro(data)
        
    }

    const getLibro = libro
    // console.log(getLibro)
    
    const libroTitulo = getLibro?.items?.[0].volumeInfo?.title
    const libroSnippet = getLibro?.items?.[0].searchInfo?.textSnippet
    const libroImagen = getLibro?.items?.[0].volumeInfo?.imageLinks?.thumbnail
    const libroAutor = getLibro?.items?.[0].volumeInfo?.authors?.[0]
    const libroDescripcion = getLibro?.items?.[0].volumeInfo?.description
    const libroCategoria = getLibro?.items?.[0].volumeInfo?.categories

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
            <div className="infoLibro centrado" >
                <div className="centradoIMG" >
                    <img className="libroIMG" src={libroImagen} />
                </div>
                <div className="seccionTitulo">
                    <h3>{libroTitulo}</h3>
                    <span>{libroSnippet}</span>
                </div>
                <div className="seccionMini" >
                    <h4>Autor:</h4>
                    <p>{libroAutor ? libroAutor : "Autor no disponible"}</p>
                </div>
                <div className="seccionMini" >
                    <h4>Categoria:</h4>
                    <p>{libroCategoria ? libroCategoria : "Categoria no disponible"}</p>
                </div>
                <div className="seccionDesc" >
                    <h4>Descripcion:</h4>
                    <p>{libroDescripcion ? libroDescripcion : "Descripcion no disponible"}</p>
                </div>
            </div>
        </div>

    )
}

export default Hero;