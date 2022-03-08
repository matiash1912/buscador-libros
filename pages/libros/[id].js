const Libro = ({data}) => {
    console.log(data)
    const info = data.items?.[0]
    return (
        <div className="hero-bg">
            <div className="infoLibro centrado" >
                <div className="centradoIMG" >
                    <img className="libroIMG" src={info.volumeInfo?.imageLinks?.thumbnail} />
                </div>
                <div className="seccionTitulo">
                    <h3>{info.volumeInfo?.title}</h3>
                    <span>{info.searchInfo?.textSnippet}</span>
                </div>
                <div className="seccionMini" >
                    <h4>Autor:</h4>
                    <p>{info.volumeInfo?.authors ? info.volumeInfo?.authors  : "Autor no disponible"}</p>
                </div>
                <div className="seccionMini" >
                    <h4>Categoria:</h4>
                    <p>{info.volumeInfo?.categories ? info.volumeInfo?.categories  : "Categoria no disponible"}</p>
                </div>
                <div className="seccionDesc" >
                    <h4>Descripcion:</h4>
                    <p>{info.volumeInfo?.description  ? info.volumeInfo?.description: "Descripcion no disponible"}</p>
                </div>
            </div>
        </div>
    )
}

export default Libro

export const getServerSideProps = async ({params}) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${params.id}&key=AIzaSyD8_MkjlQ3BARL95xOUY0QzgrAlEHbXU9w&country=CL`)
    const data = await response.json()

    return {
        props: {data}
    }
}