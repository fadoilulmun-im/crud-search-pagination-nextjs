import { prisma } from "@/lib/prisma";

const ITEM_PER_PAGE = 5;

export const getContacs = async (search: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEM_PER_PAGE;
  try {
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEM_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return contacts;
  } catch (error) {
    throw new Error("Failed to fetch contacts data");
  }
};

export const getContacById = async (id: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: id,
      },
    });
    return contact;
  } catch (error) {
    throw new Error("Failed to fetch contacts data");
  }
};

export const getContacPages = async (search: string) => {
  try {
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    
    const totalPages = Math.ceil(contacts / ITEM_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch contacts data");
  }
};