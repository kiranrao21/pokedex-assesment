import { NextRequest } from "next/server";
import config from "@/config";
import { HttpStatus } from "@/types/api";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const search = searchParams.get("search");

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
      return Response.json(
        {
          status: response.status,
          error: data.message || "Failed to fetch Pokemon",
        },
        { status: response.status }
      );
    }

    return Response.json({
      status: HttpStatus.OK,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching Pokemon:", error);
    return Response.json(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Internal Server Error",
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}
