import fetch from "node-fetch";
import fastifySession from "fastify-session";
import Fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCookie.default);

fastify.register(fastifySession.default, {
  secret:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8",
  cookie: { secure: false },
});
fastify.register(cors, {});

fastify.get("/api/guest_session/new", async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    options
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return data;
});

fastify.get("/api/fetch/*", async (request, reply) => {
  const apiPath = request.params["*"];
  const { queryTerm } = request.query;
  let url;
  if (!queryTerm) {
    url = `https://api.themoviedb.org/3/${apiPath}?api_key=698a6960f7fbe178c3882e394f1797fd&query=`;
  } else {
    url = `https://api.themoviedb.org/3/${apiPath}?api_key=698a6960f7fbe178c3882e394f1797fd&query=${queryTerm}`;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    reply.code(500).send({ error: url });
  }
});

fastify.post("/api/rateMovie", async (request) => {
  const { guestSessionId, id } = request.body;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8",
    },
    body: '{"value":8.5}',
  };

  try {
    console.log(id, guestSessionId, "Rate");
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`,
      options
    );
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while rating the movie:", error);
    throw new Error("An error occurred while rating the movie");
  }
});

fastify.delete("/api/unrateMovie", async (request) => {
  const { guestSessionId, id } = request.body;
  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "content-type": "application",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OThhNjk2MGY3ZmJlMTc4YzM4ODJlMzk0ZjE3OTdmZCIsInN1YiI6IjY2NGQ5YmRiMGJiZGU2MzUwMGZkMTE4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfARjcSVh-JmYCPv6sOSufIczQqhTK1fiUKdcGDZXU8",
    },
  };

  try {
    console.log(id, guestSessionId, "Unrate");
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/rating?guest_session_id=${guestSessionId}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred while unrating the movie:", error);
    throw new Error("An error occurred while unrating the movie");
  }
});

fastify.listen({ port: 5000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
