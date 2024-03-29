import { Form, useLoaderData } from "react-router-dom";
import { deleteMovie, getMovie } from "./handleMovies"

type MovieType = {
    id: string;
    title: string;
    runtime: number;
    img: string;
    social: string;
};

export async function loader({ params }: { params: { id: string } }) {
    const movie = await getMovie(params.id);
    return { movie };
}


export default function Movie() {
    const { movie } = useLoaderData() as {movie: MovieType};

    return (
        <div id="movie">
            <div>
                <img height={300} key={movie.img} src={movie.img} alt="Dune_Poster" />
            </div>
            <div>
                <h1>{movie.title ? movie.title : "no title"}</h1>
                <i>{movie.runtime && `Runtime: ${movie.runtime} Min.`}</i>
                {movie.social && (
                    <p>
                        <a href={`www.twitter.com/${movie.social}`}>{movie.social}</a>
                    </p>
                )}
                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        >
                        
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>

        </div>
    );

}