import { Form, redirect, useLoaderData } from "react-router-dom";
import { Movie, updateMovie } from "./handleMovies";

export async function action({
    request,
    params,
}: {
    request: Request;
    params: { id: string };
}) {
    const formData = await request.formData();
    const updatedMovie = Object.fromEntries(formData) as any;
    await updateMovie(params.id, updatedMovie as Movie);
    return redirect(`/movies/${params.id}`);
}

export default function EditMovie() {
    const { movie } = useLoaderData() as { movie: Movie };

    return (
        <>
            <h1 id="edit-heading">Edit Movie</h1>
            <Form method="POST" id="edit-movie">
                <div>
                    <label>
                        <span>Title</span>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            defaultValue={movie.title}
                        />
                    </label>
                    <label>
                        <span>Director</span>
                        <input
                            type="text"
                            name="director"
                            placeholder="Director"
                            defaultValue={movie.director} />
                    </label>
                    <label>
                        <span>Social</span>
                        <input
                            type="text"
                            name="social"
                            placeholder="@movie"
                            defaultValue={movie.social}
                        />
                    </label>
                    <label>
                        <span>Image Url</span>
                        <input
                            type="text"
                            name="img"
                            placeholder="htttp://example.com/img"
                            defaultValue={movie.img}
                        />
                    </label>
                    <label>
                        <span>Runtime</span>
                        <input
                            type="number"
                            name="runtime"
                            placeholder="Runtime"
                            defaultValue={movie.runtime}
                        />
                    </label>
                    <p>
                        <button type="submit">Save</button>
                        <button type="button">Cancel</button>
                    </p>
                </div>

            </Form>
        </>

    );
}