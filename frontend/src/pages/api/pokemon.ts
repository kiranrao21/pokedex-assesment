import type { NextApiRequest, NextApiResponse } from "next";
import config from "@/config";
import { HttpStatus, HttpMethod, ErrorMessage, APIResponse } from "@/types/api";
import { Pokemon } from "@/types/pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<Pokemon[]>>
) {
  if (req.method !== HttpMethod.GET) {
    return res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
      status: HttpStatus.METHOD_NOT_ALLOWED,
      error: ErrorMessage.METHOD_NOT_ALLOWED,
    });
  }

  try {
    const { limit, offset, search } = req.query;
    const queryParams = new URLSearchParams({
      ...(limit ? { limit: limit.toString() } : {}),
      ...(offset ? { offset: offset.toString() } : {}),
      ...(search ? { search: search.toString() } : {}),
    });

    const response = await fetch(
      `${config.apiBaseUrl}/api/pokemon?${queryParams}`
    );
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: response.status as HttpStatus,
        error: data.error || ErrorMessage.FAILED_TO_FETCH,
      });
    }

    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data,
    });
  } catch (error) {
    console.error("Error in Pokemon API route:", error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: ErrorMessage.SERVER_ERROR,
    });
  }
}
