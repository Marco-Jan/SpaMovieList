import { redirect } from "react-router-dom";


export type Movie = {
    id: number;
    title: string;
    director: string;
    runtime: number;
    img: string;
    social: string;
};

let fakeCache: { [key: string]: boolean } = {};

function fakeDelay(key: string) {
    if (!key) {
        fakeCache = {};
    }
    if (fakeCache[key]) {
        return
    }
    fakeCache[key] = true;
    return new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })
}

export async function getMovie(id: string) {
    await fakeDelay(`getMovies:${id} `);
    let movie: Movie[] = await fetch(`http://localhost:5001/movies/${id}`).then(
        (res) => res.json()
    );
    return movie;
}

export async function createMovie() {
    await fakeDelay("");
    let movie = {
        id: Math.random().toString(36).substring(2, 9),
        createAt: Date.now(),
        title: "new Movie",
        director: "new Director",
        runtime: 0,
        img: "",
        social: "",
    };
    await fetch("http://localhost:5001/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    });
    return movie;

}

export async function updateMovie(id: string, movie: Movie) {
    await fakeDelay("");
    await fetch(`http://localhost:5001/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
    });
    return movie;
}

export async function deleteMovie(id: string){
    await fakeDelay("");
    await fetch(`http://localhost:5001/movies/${id}`, {
        method: "DELETE",
    });
    return;

}

export async function action({
    request,
    params,
}: {
    request: Request
    params: {id: string}
}) {
    const formData = await request.formData();
    const updatedMovie = Object.fromEntries(formData) as unknown;
    await updateMovie(params.id, updatedMovie as Movie);
    return redirect(`/movies/${params.id}`);
}
