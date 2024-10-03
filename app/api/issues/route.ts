import prisma from "@/mysql/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.description) {
    return NextResponse.json(
      { message: "Title and description are required" },
      { status: 400 }
    );
  }

  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}